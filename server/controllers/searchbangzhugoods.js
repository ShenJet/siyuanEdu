const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    let openid = ctx.query.openid
    try {
        let res = await mysql('t_product_zutuan').select().where({uploadUser: openid, hasdelete: 0});
        console.log(res);
        res.map(function(v, i){
            v.urls = v.urls ? JSON.parse(v.urls):[]
        })
        console.log(res);
        return ctx.body = {
            code:1,
            success:true,
            msg:"帮主商品列表获取成功",
            data:res
        }
    } catch (error) {
        return ctx.body = {
            code:0,
            success:true,
            msg:"帮主商品列表获取失败",
            data:[]
        }
    }
}
