const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    
    // STEP1 用户校验
    console.log(ctx.state.$wxInfo);
    if(!ctx.state.$wxInfo || ctx.state.$wxInfo.loginState !== 1 ){
        return ctx.body = {
            code:0,
            data:[],
            success:false,
            msg:"用户尚未登录"
        }
    }
    // STEP2 订单类别提取
    let code = ctx.query.code ;
    if(!code){
        return ctx.body = {
            code:"ZUTUAN_USER_CITYCODE_ERROR",
            data:null,
            success:false,
            msg:"附近用户获取失败"
        }
    }
    // let openid = ctx.state.$wxInfo.userinfo.openId;
    // STEP3 查询+返回
    try {
        var res = await mysql('t_product_zutuan').where({ code, origin:'user' }) ;
        return ctx.body = {
            code:"ZUTUAN_USER_GET_SUCCESS",
            success:true,
            msg:"附近用户获取成功",
            data:res
        }
    } catch (error) {
        return ctx.body = {
            code:0,
            data:null,
            success:false,
            msg:"附近用户获取失败"
        }
    }
    
}
