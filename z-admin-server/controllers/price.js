const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    // let goodsid = 
    console.log('ctx.session.userinfo:');
    console.log(ctx.session.userinfo);
    
    try {
        let res = await mysql('price').first()
        console.log('res:');
        console.log(res);
        
        return ctx.body = {
            code:"PRICE_GET_SUCCESS",
            success: true,
            msg: "价格获取成功",
            data: res
        }
    } catch (error) {
        return ctx.body = {
            code:0,
            success:false,
            msg:"价格获取失败",
            data:[]
        }
    }
}
