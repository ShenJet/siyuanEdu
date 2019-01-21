const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud
module.exports = async (ctx, next) => {

    try {
        let orderid = ctx.query.orderid
        let openid = ctx.state.$wxInfo.userinfo.openId ;
        let order = await mysql('orders').first().where({ orderid, openid })
        if(!order || order==undefined || order=='undefined' || order=={} ){
            return ctx.body = {
                code:"ORDER_DELETE_NO_SUCH_ORDER",
                data:{},
                msg:"无此订单",
                success:false
            }
        }else{
            if(order.openid != openid){
                return ctx.body = {
                    code:"ORDER_DELETE_NO_SUCH_ORDER",
                    data:{},
                    msg:"无此订单",
                    success:false
                }
            }else{
                if(order.status == 10 ){
                    await mysql('orders').update({ status: 11 }).where({ orderid, openid }).limit(1)
                    return ctx.body = {
                        code:"ORDER_DELETE_SUCCESS",
                        data:{},
                        msg:"提现申请成功，请等待平台审核",
                        success:true
                    }
                }else{
                    return ctx.body = {
                        code:"ORDER_TIXIAN_OUT_OF_FLOW",
                        data:{},
                        msg:"该笔金额不在提现流程中",
                        success:false
                    }
                }
                
            }
        }
    } catch (error) {
        console.log(error);
        return ctx.body = {
            code:"ORDER_DELETE_FAILED",
            data:{},
            msg:"系统内部错误",
            success:false
        }
    }
}