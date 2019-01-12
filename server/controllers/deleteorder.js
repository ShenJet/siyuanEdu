const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud
module.exports = async (ctx, next) => {
    ctx.body = {
        code:1,
        data:{},
        msg:"删除订单待开发"
    }
}