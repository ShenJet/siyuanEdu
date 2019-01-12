const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud
        
const clientpaid = async function (ctx, next) {
    // STEP1 用户校验
    if(!ctx.state.$wxInfo || ctx.state.$wxInfo.loginState !== 1 ){
        ctx.body = {
            code:0,
            data:{},
            success:false,
            msg:"用户尚未登录"
        }
        return
    }
    let openid = ctx.state.$wxInfo.userinfo.openId
    let data = ctx.query //ctx.request.body
    let stamp = new Date().getTime()
    console.log('-------data----------');
    console.log(data);
    console.log('-------data end-------');

    if( data && data.timeStamp ){
        // 1. 通知信息的提取
        let {timeStamp,nonceStr,paySign,prepay_id,signType} = data
       
        // 2.根据信息查找订单
        let order = await mysql("orders").select().where({prepay_id, openid, paySign})
        console.log('------------order------------');
        console.log(order);
        console.log('------------order end ------------ ');
        if(order.length == 1){
            let { status , endtime } = order[0]
            console.log('------prepay_id, openid, paySign------');
            console.log(prepay_id, openid, paySign);
            console.log('------prepay_id, openid, paySign------');
            
            
            if(status == 1 && stamp < parseInt(endtime)){
                // 已收到过通知已确认过
                await mysql("orders").update({status:2}).where({prepay_id, openid, paySign})
                return ctx.body = {
                    code:1,
                    success:true,
                    data:{},
                    msg:'下单成功，等待商户确认'
                }
            }else{
                return ctx.body = {
                    code:0,
                    success:false,
                    data:{},
                    msg:'订单处于其他流程中'
                }
            }
        }else{
            return ctx.body = {
                code:0,
                success:false,
                data:{},
                msg:'警告：无此订单'
            }
        }
        
    }else{
        return ctx.body = {
            code:0,
            success:false,
            data:{},
            msg:'订单出错'
        }
    }
}


// savenotification()
module.exports = clientpaid