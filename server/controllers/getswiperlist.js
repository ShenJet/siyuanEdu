const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    // let goodsid = 
    try {
        let res = await mysql('t_sysinfo').first()
        let list = JSON.parse( res.urls )
        console.log(res);
        return ctx.body = {
            code: 1,
            success: true,
            msg: "轮播图列表获取成功",
            data: list
        }
    } catch (error) {
        return ctx.body = {
            code:0,
            success:false,
            msg:"轮播图列表获取失败",
            data:[]
        }
    }
}
