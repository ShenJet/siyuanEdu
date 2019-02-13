const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    try {
        let openid = ctx.state.$wxInfo.userinfo.openId ;
        console.log('ctx.query:');
        console.log(ctx.query);
        
        
    } catch (error) {
        console.log(error);
        
        return ctx.body = {
            code:"RELEASED_GOODS_DELETE_FAILED",
            success:false,
            msg:"系统错误，已发布商品删除失败",
            data:null
        }
    }
}
