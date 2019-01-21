const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    let communityid = ctx.query.communityid
    try {
        let res = await mysql('t_product_zutuan').select().where({communityid, hasdelete: 0});
        console.log(res);
        res.map(function(v, i){
            v.urls = v.urls ? JSON.parse(v.urls):[]
        })
        console.log(res);
        return ctx.body = {
            code:"ZUTUAN_GET_GOODS_SUCCESS",
            success:true,
            msg:"小区组团商品获取成功",
            data:res
        }
    } catch (error) {
        return ctx.body = {
            code:"ZUTUAN_GET_GOODS_FAIL",
            success:true,
            msg:"小区组团商品获取失败",
            data:[]
        }
    }
}
