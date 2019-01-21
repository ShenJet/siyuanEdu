const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud
module.exports = async (ctx, next) => {

    try {
        let orderid = ctx.query.orderid
        let openid = ctx.state.$wxInfo.userinfo.openId ;
        let order = await mysql('orders').first().where({ orderid })
        if(!order || order==undefined || order=='undefined' || order=={} ){
            return ctx.body = {
                code:"ORDER_CONFIRM_NO_SUCH_ORDER",
                data:{},
                msg:"无此订单",
                success:false
            }
        }else{
            if(order.openid != openid){
                return ctx.body = {
                    code:"ORDER_CONFIRM_NO_SUCH_ORDER",
                    data:{},
                    msg:"无此订单",
                    success:false
                }
            }else{
                if(order.status == 5){
                    await mysql('orders').update({ status: 6 }).where({ orderid, openid }).limit(1)
                    return ctx.body = {
                        code:"ORDER_DELETE_SUCCESS",
                        data:{},
                        msg:"确认收货成功",
                        success:true
                    }
                }else{
                    return ctx.body = {
                        code:"ORDER_DELETE_OUT_OF_FLOW",
                        data:{},
                        msg:"此订单当前状态不可确认收货",
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