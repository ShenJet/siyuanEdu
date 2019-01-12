const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    let openid = ctx.query.shopid
    try {
        let res = await mysql('t_product_roundshop').select().limit(3).where({uploadUser: openid});
        console.log(res);
        res.map(function(v, i){
            v.urls = v.urls ? JSON.parse(v.urls):[]
        })
        console.log(res);
        return ctx.body = {
            code:"ROUNDSHOP_GOODS_GET_SUCCESS",
            success:true,
            msg:"店铺商品获取成功",
            data:res
        }
    } catch (error) {
        return ctx.body = {
            code:"ROUNDSHOP_GOODS_GET_FAILED",
            success:false,
            msg:"店铺商品获取失败",
            data:[]
        }
    }
}
