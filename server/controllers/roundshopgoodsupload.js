const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud
module.exports = async (ctx, next) => {
    let params = ctx.request.body;

    let { name, currentPrice, oldPrice} = params

    let openid = ctx.state.$wxInfo.userinfo.openId ;
    let userinfo = JSON.stringify(ctx.state.$wxInfo.userinfo)
    console.log('@roundshop goods upload  params:', params);
    let thumbnail = params.urls[0]
    // params.deliveryArea = params.deliveryArea + ' ' + params.deliveryArea1
    params.urls = JSON.stringify(params.urls)
    delete params.urls0
    delete params.urls1
    delete params.urls2

    let now = new Date()
    let y = now.getFullYear()
    let m = now.getMonth()<9?'0'+(now.getMonth()+1):now.getMonth() + 1
    let d = now.getDate()<10?'0'+now.getDate():now.getDate()
    let ms = now.getMilliseconds()
    let ranstr = `shop${y}${m}${d}${ms}`+ Math.floor(Math.random()*(899999999999)+100000000000)
    console.log('ranstr:',ranstr);
    try {
        // 1.去商铺表查询是否是商铺
        let role = await mysql('roundshop').first().where({openid}) //对象或undefined
        console.log('role:',role); 
        let status = role.status
        if(role){//是商铺
            if(status == 1){
                return ctx.body = {
                    code:"ROUNDSHOP_IN_AUDIT",
                    data:null,
                    success:false,
                    msg:"商铺审核中，无法发布商品"
                }
            }
            if(status == 2){
                let _id = ranstr
                let goodslist = JSON.parse(role.goodslist) || []
                if(goodslist.length>=3){
                    return ctx.body = {
                        code:"ROUNDSHOP_GOODSCOUNT_LIMITED",
                        data:null,
                        success:false,
                        msg:"商品数量超限，请适当删除旧商品"
                    }
                }
                // <=3的话：更新goodslist字段，并向商铺商品表插入新商品
                console.log('旧数组：',goodslist);
                console.log('插入的新id：', _id);
                goodslist.unshift({
                    _id,
                    name,
                    currentPrice,
                    oldPrice,
                    thumbnail
                })
                console.log('新数组：',goodslist);
                
                goodslist = JSON.stringify(goodslist)
                await mysql('roundshop').update({goodslist}).limit(1).where({openid}) 
                await mysql('t_product_roundshop').insert({
                    _id,
                    ...params,
                    uploadUser:openid,
                    origin:'roundshop',
                    uploaderRole:'roundshop',
                    thumbnail,
                    userinfo
                })
                return ctx.body = {
                    code:"ROUNDSHOP_GOODS_UPLOAD_SUCCESS",
                    data:null,
                    success:true,
                    msg:"商品上传成功"
                }
            }
            if(status == 3){
                return ctx.body = {
                    code:"ROUNDSHOP_AUDIT_DENY",
                    data:null,
                    success:false,
                    msg:"店铺入驻审核被拒绝"
                }
            }
            if(status == 4){
                return ctx.body = {
                    code:"ROUNDSHOP_SHOP_CLOSED",
                    data:null,
                    success:false,
                    msg:"店铺已删除"
                }
            }
            
        }else{
            return ctx.body = {
                code:"ROUNDSHOP_USER_ISNOT_SHOP",
                data:null,
                success:false,
                msg:"当前用户不是商铺，无法上传"
            }
        }
    } catch (error) {
        console.log(error);
        
        return ctx.body = {
            code:"SYSTEM_ERROR",
            data:null,
            success:false,
            msg:"系统错误"
        }
    }
}