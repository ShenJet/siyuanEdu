const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    try {
        let openid = ctx.state.$wxInfo.userinfo.openId ;
        let _id = ctx.query.goodsid ;
        let bangzhuinfo = await mysql('bangzhu').first().where({openid})
        if(!bangzhuinfo || bangzhuinfo == {} || bangzhuinfo == undefined || bangzhuinfo == 'undefined'){
            // 说明是普通用户
            // 直接查表
            let goods = await mysql('t_product_zutuan').first().where({openid, hasdelete: 0})
            if(!goods || goods == {} || goods == undefined || goods == 'undefined'){
                return ctx.body = {
                    code:"RELEASED_GOODS_DELETE_FAILED",
                    success:false,
                    msg:"该商品信息有误",
                    data:null
                }
            }
            await mysql('t_product_zutuan').update({hasdelete: 1}).where({openid, hasdelete: 0}).limit(1)
            return ctx.body = {
                code:"RELEASED_GOODS_DELETE_SUCCESS",
                success:true,
                msg:"商品删除成功",
                data:null
            }
        }else{
            let goodslist = JSON.parse(bangzhuinfo.goodslist) || []
            
            await mysql('t_product_zutuan').update({hasdelete: 1}).where({openid, _id, hasdelete: 0}).limit(1)

            goodslist.map(function(v,i){
                if(v == _id){
                    goodslist.splice(i,1)
                }
            })
            goodslist = JSON.stringify(goodslist)
            await mysql('bangzhu').update({goodslist}).where({openid}).limit(1)
            return ctx.body = {
                code: "RELEASED_GOODS_DELETE_SUCCESS",
                success: true,
                msg: "商品删除成功",
                data: null
            }
        }
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
