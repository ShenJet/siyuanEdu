const debug = require('debug')('qcloud-sdk[auth]')
const http = require('axios')
const moment = require('moment')
const config = require('../../config')
const qcloudProxyLogin = require('../helper/qcloudProxyLogin')
const AuthDbService = require('../mysql/AuthDbService')
const sha1 = require('../helper/sha1')
const aesDecrypt = require('../helper/aesDecrypt')
const { ERRORS, LOGIN_STATE } = require('../constants')

/**
 * 授权模块
 * @param {express request} req
 * @return {Promise}
 * @example 基于 Express
 * authorization(this.req).then(userinfo => { // ...some code })
 */
function authorization (req) {
    const {
        'x-wx-code': code,
        'x-wx-encrypted-data': encryptedData,
        'x-wx-iv': iv
    } = req.headers

    // 检查 headers
    if ([code, encryptedData, iv].every(v => !v)) {
        debug(ERRORS.ERR_HEADER_MISSED)
        throw new Error(ERRORS.ERR_HEADER_MISSED)
    }
    
    debug('@authorization 参数是：encryptedData: %s, iv: %s, code: %s', encryptedData, iv, code)
    // 如果只有 code 视为仅使用 code 登录
    if (code && !encryptedData && !iv) {
        return getSessionKey(code).then(pkg => {
            const { openid, session_key } = pkg
            // 生成 3rd_session
            const skey = sha1(session_key)

            return AuthDbService.getUserInfoByOpenId(openid).then(userinfo => {
                
                // if(userinfo){
                    console.log('[@index.authorization] userinfo:',userinfo);
                    // console.log('[@index.authorization] usertype:',userinfo.usertype);
                    var usertype = userinfo.usertype
                    const wxUserInfo = JSON.parse(userinfo.user_info)
                    return AuthDbService.saveUserInfo(wxUserInfo, skey, session_key)
                    .then(userinfo => ({
                        loginState: LOGIN_STATE.SUCCESS,
                        userinfo: {
                            userinfo: wxUserInfo,
                            skey: userinfo.skey,
                            text:'123',
                            usertype: usertype
                        }
                    }))
                // }else{
                //     throw new Error(ERRORS.ERR_SKEY_INVALID)
                // }
                
            })
        })
    }

    // 获取 session key
    return getSessionKey(code)
        .then(pkg => {
            const { session_key } = pkg
            // 生成 3rd_session
            const skey = sha1(session_key)

            // 解密数据
            let decryptedData
            try {
                decryptedData = aesDecrypt(session_key, iv, encryptedData)
                decryptedData = JSON.parse(decryptedData)
            } catch (e) {
                debug('Auth: %s: %o', ERRORS.ERR_IN_DECRYPT_DATA, e)
                throw new Error(`${ERRORS.ERR_IN_DECRYPT_DATA}\n${e}`)
            }

            // 存储到数据库中
            return AuthDbService.saveUserInfo(decryptedData, skey, session_key).then(userinfo => ({
                loginState: LOGIN_STATE.SUCCESS,
                userinfo
            }))
        })
}

/**
 * 鉴权模块
 * @param {express request} req
 * @return {Promise}
 * @example 基于 Express
 * validation(this.req).then(loginState => { // ...some code })
 */
function validation (req) {
    const { 'x-wx-skey': skey } = req.headers
    if (!skey) throw new Error(ERRORS.ERR_SKEY_INVALID)

    debug('正在校验如下 skey: %s', skey)

    return AuthDbService.getUserInfoBySKey(skey)
        .then(result => {
            if (result.length === 0) throw new Error(ERRORS.ERR_SKEY_INVALID)
            else result = result[0]
            // 效验登录态是否过期
            const { last_visit_time: lastVisitTime, user_info: userInfo } = result
            const expires = config.wxLoginExpires && !isNaN(parseInt(config.wxLoginExpires)) ? parseInt(config.wxLoginExpires) * 1000 : 7200 * 1000

            if (moment(lastVisitTime, 'YYYY-MM-DD HH:mm:ss').valueOf() + expires < Date.now()) {
                debug('skey校验结果:  已过期, 登录失败.')
                return {
                    loginState: LOGIN_STATE.FAILED,
                    userinfo: {}
                }
            } else {
                debug('skey校验结果: 校验通过，已登录。')
                return {
                    loginState: LOGIN_STATE.SUCCESS,
                    userinfo: JSON.parse(userInfo)
                }
            }
        })
}

/**
 * Koa 授权中间件
 * 基于 authorization 重新封装
 * @param {koa context} ctx koa 请求上下文
 * @return {Promise}
 */
function authorizationMiddleware (ctx, next) {
    return authorization(ctx.req).then(result => {
        ctx.state.$wxInfo = result
        return next()
    })
}

/**
 * Koa 鉴权中间件
 * 基于 validation 重新封装
 * @param {koa context} ctx koa 请求上下文
 * @return {Promise}
 */
function validationMiddleware (ctx, next) {
    return validation(ctx.req).then(result => {
        ctx.state.$wxInfo = result
        console.log('@validationMiddleware result:',result)
        if(result.loginState === 0){
            console.log('loginState 是 0')
            return ctx.body = {
                // code:"USER_SKEY_EXPIRED",
                code: -1,
                success: false,
                data:null,
                msg:'用户会话已过期'
            }
        }
        return next()
    })
}

/**
 * session key 交换
 * @param {string} appid
 * @param {string} appsecret
 * @param {string} code
 * @return {Promise}
 */
function getSessionKey (code) {
    const useQcloudLogin = config.useQcloudLogin

    // 使用腾讯云代小程序登录
    if (useQcloudLogin) {
        const { qcloudSecretId, qcloudSecretKey } = config
        return qcloudProxyLogin(qcloudSecretId, qcloudSecretKey, code).then(res => {
            res = res.data
            if (res.code !== 0 || !res.data.openid || !res.data.session_key) {
                debug('%s: %O', ERRORS.ERR_GET_SESSION_KEY, res)
                throw new Error(`${ERRORS.ERR_GET_SESSION_KEY}\n${JSON.stringify(res)}`)
            } else {
                debug('openid: %s, session_key: %s', res.data.openid, res.data.session_key)
                return res.data
            }
        })
    } else {
        const appid = config.appId
        const appsecret = config.appSecret

        return http({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            method: 'GET',
            params: {
                appid: appid,
                secret: appsecret,
                js_code: code,
                grant_type: 'authorization_code'
            }
        }).then(res => {
            res = res.data
            
            if (res.errcode || !res.openid || !res.session_key) {
                debug('%s: %O', ERRORS.ERR_GET_SESSION_KEY, res.errmsg)
                throw new Error(`${ERRORS.ERR_GET_SESSION_KEY}\n${JSON.stringify(res)}`)
            } else {
                debug('openid: %s, session_key: %s', res.openid, res.session_key)
                return res
            }
        })
    }
}

module.exports = {
    authorization,
    validation,
    authorizationMiddleware,
    validationMiddleware
}
