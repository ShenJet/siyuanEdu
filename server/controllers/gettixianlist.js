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
    
    let openid = ctx.state.$wxInfo.userinfo.openId ;
    
    // STEP2 查询+返回
    try {
        var res = await mysql('orders').select('orderid','total_fee').where({ openid, status: 10 }).orderBy('id', 'desc') ;
        return ctx.body = {
            code:"TIXIAN_LIST_QUERY_SUCCESS",
            success:true,
            msg:"提现列表获取成功",
            data:res
        }
    } catch (error) {
        return ctx.body = {
            code:"TIXIAN_LIST_QUERY_FAILED",
            data:[],
            success:false,
            msg:"提现列表获取失败"
        }
    }
    
}
