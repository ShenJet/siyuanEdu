
const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {

    try {
        let openid = ctx.state.$wxInfo.userinfo.openId ;
        let bangzhuinfo = await mysql('bangzhu').first().where({openid})
        if(!bangzhuinfo || bangzhuinfo == {} || bangzhuinfo == undefined || bangzhuinfo == 'undefined'){
            // 说明是普通用户
            // 直接查表
            let goods = await mysql('t_product_zutuan').first().where({openid, hasdelete: 0, origin: 'user'})
            if(!goods || goods == {} || goods == undefined || goods == 'undefined'){
                console.log('普通用户, 无此商品');
                
                return ctx.body = {
                    code:"RELEASED_GOODS_QUERY_SUCCESS",
                    success:true,
                    msg:"已发布商品列表获取成功",
                    data:[]
                }
            }
            console.log('普通用户, 有查到商品');
            return ctx.body = {
                code:"RELEASED_GOODS_QUERY_SUCCESS",
                success:true,
                msg:"已发布商品列表获取成功",
                data:[goods]
            }
        }else{
            console.log('是帮主, 查询发布商品');
            let goodslist = JSON.parse(bangzhuinfo.goodslist) || []
            let length = goodslist.length
            console.log('length：',length);

            let goods = await mysql('t_product_zutuan').select().where({openid, hasdelete: 0, origin: 'bangzhu'}).limit(length)
            return ctx.body = {
                code: "RELEASED_GOODS_QUERY_SUCCESS",
                success: true,
                msg: "已发布商品列表获取成功",
                data: goods
            }
        }


    } catch (error) {
        return ctx.body = {
            code:"RELEASED_GOODS_QUERY_FAILED",
            success:false,
            msg:"已发布商品列表获取失败",
            data:null
        }
    }
}
