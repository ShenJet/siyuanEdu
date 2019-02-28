const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    try {
        let openid = ctx.state.$wxInfo.userinfo.openId ;
        console.log('ctx.request.body:');
        console.log(ctx.request.body);
        let params = ctx.request.body

        for (const key in params) {
            const el = params[key];
            if(!el){
                return ctx.body = {
                    code:"RELEASED_GOODS_EDIT_FAILD",
                    success:false,
                    msg:"表单信息不完整，信息编辑失败",
                    data:null
                }
            }
            if( key == 'teachtype' || key == 'teachday' ){
                params[key] = JSON.stringify(el)
            }
        }

        let usertype = params.usertype
        if(usertype == 'teacher'){
            // 校验用户
            let userinfo = await mysql("cSessionInfo").first('usertype').where({ open_id:openid })
            if( !userinfo || !userinfo.usertype || userinfo.usertype != usertype ){
                return ctx.body = {
                    code:"RELEASED_GOODS_EDIT_FAILD",
                    success:false,
                    msg:"用户身份信息有误，请联系客服",
                    data:null
                }
            }
        }

        if(usertype == 'teacher'){
            params.teacharea = JSON.stringify(params.teacharea)
            params.comment = JSON.stringify(params.comment)
            await mysql('user_teachers').update({
                ...params
            }).where({ openid }).limit(1)
        }
        if(usertype == 'student'){
            let randomstr = params.randomstr
            await mysql('user_students').update({
                ...params
            }).where({ openid, randomstr }).limit(1)
        }
        return ctx.body = {
            code:"RELEASED_GOODS_EDIT_SUCCESS",
            success:false,
            msg:"信息编辑成功",
            data:{}
        }
        
    } catch (error) {
        console.log(error);
        
        return ctx.body = {
            code:"RELEASED_GOODS_EDIT_FAILED",
            success:false,
            msg:"系统错误，已发布信息编辑失败",
            data:null
        }
    }
}
