const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    // let goodsid = 
    let res = await mysql('t_product').select();
    console.log(res);
    res.map(function(v, i){
        v.urls = v.urls ? JSON.parse(v.urls):[]
        v.detailImg = v.detailImg ? JSON.parse(v.detailImg):[]
        v.marketPrice = v.marketPrice ? JSON.parse(v.marketPrice):[]
    })
    console.log(res);
    ctx.body = {
        code:1,
        success:true,
        msg:"商品列表获取成功",
        data:res
    }
}
