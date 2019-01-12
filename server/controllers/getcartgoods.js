const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud
module.exports = async (ctx, next) => {
    let openid = ctx.state.$wxInfo.userinfo.openId ;
    
    try {
        let cartinfo = await mysql('cart').select().where({openid})
        if(cartinfo.length == 1){
            let list = JSON.parse(cartinfo[0].cartgoods)
            return ctx.body = {
                code:1,
                success:true,
                data:list,
                msg:'查询购物车信息成功'
            }
        }else{
            return ctx.body = {
                code:1,
                success:false,
                data:{
                    platform:[],
                    bangzhu:{},
                    user:{}
                },
                msg:'购物车暂无商品'
            }
        }
        console.log('cartinfo:',cartinfo);
    } catch (error) {
        return ctx.body = {
            code: 0,
            success: false,
            data: {},
            msg:'查询购物车信息出错'
        }
    }

}