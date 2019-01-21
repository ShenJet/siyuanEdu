const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    let openid = ctx.state.$wxInfo.userinfo.openId ;
    let goodsid = ctx.query.goodsid
    console.log(openid, goodsid);
    
    let now = new Date()
    let timestamp = now.getTime()
    let _time = now.toLocaleString()
    try {
        if(goodsid && goodsid!='undefined'){
            // 判断商品来源 ： 平台发布 帮主发布 用户发布
            let str = goodsid.slice(0,2)
            if(str === 'bz'){
                console.log('该商品来自帮主')
                var origin = 'bangzhu'
                var productTable = 't_product_zutuan'
            }else if(str === 'us'){
                console.log('该商品来自普通用户')
                var origin = 'user'
                var productTable = 't_product_zutuan'
            }else{
                console.log('该商品来自platform')
                var origin = 'platform'
                var productTable = 't_product'
            }

            // 根据goodsid查询商品信息 过期否 存在否
            let searchgoods = await mysql(productTable).select('_id','name','currentPrice','briefDesc','remaining','thumbnail','sxtype','targetArea_name','deliveryMethods','uploadUser').limit(1).where({_id:goodsid})
            if(searchgoods && searchgoods.length == 1){
                var goodsinfo = searchgoods[0] ;
                goodsinfo.goodsid = goodsid
                goodsinfo.count = 1
                if(str === 'bz'){
                    goodsinfo.origin = 'bangzhu'
                }else if(str === 'us'){
                    goodsinfo.origin = 'user'
                }else{
                    goodsinfo.origin = 'platform'
                }
                console.log('goodsinfo:', goodsinfo);
                
                if(!goodsinfo || goodsinfo.expired == 1 || parseInt(goodsinfo.stock) <= 0){
                    console.log('expired为1 或 remaining小于1');
                    // 无此商品
                    return ctx.body = {
                        code: 0,
                        success: false,
                        data: {},
                        msg: "该商品已过期或库存不足"
                    }
                }
            }else{
                return ctx.body = {
                    code: 0,
                    success: false,
                    data: {},
                    msg: "该商品已下架"
                }
            }//商品信息查询结束

            // 商品信息正常，接着查询购物车信息：
            let cartinfo = await mysql('cart').first().where({openid})
            console.log('cartinfo:',cartinfo);
            if(cartinfo){
                // 如果已存在相关信息，进行更新
                // var cartgoods = JSON.parse(cartinfo.cartgoods) //格式化json串
                var platformgoods = JSON.parse(cartinfo.platformgoods) || [] //格式化json串
                var bangzhugoods = JSON.parse(cartinfo.bangzhugoods) || [] //格式化json串
                var usergoods = JSON.parse(cartinfo.usergoods) || [] //格式化json串
                if(origin === 'platform'){
                    for(let i=0,l=platformgoods.length; i<l; i++){
                        if(platformgoods[i].goodsid == goodsid){
                            return ctx.body = {
                                code:0,
                                success:false,
                                data:{},
                                msg:"添加成功" // 其实该商品已经在购物车
                            }
                        }
                    }
                    // 如果没有：
                    platformgoods.unshift( goodsinfo )
                }else if(origin === 'bangzhu'){
                    for(let i=0,l=bangzhugoods.length;i<l;i++){
                        if(bangzhugoods[i].goodsid == goodsid){
                            return ctx.body = {
                                code:0,
                                success:false,
                                data:{},
                                msg:"添加成功" // 其实该商品已经在购物车
                            }
                        }
                    }
                    // 如果没有：
                    bangzhugoods.unshift(goodsinfo)
                }else if(origin === 'user'){
                    for(let i=0,l=usergoods.length;i<l;i++){
                        if(usergoods[i].goodsid == goodsid){
                            return ctx.body = {
                                code:0,
                                success:false,
                                data:{},
                                msg:"添加成功" // 其实该商品已经在购物车
                            }
                        }
                    }
                    // 如果没有：
                    usergoods.unshift(goodsinfo)
                }else{
                    return ctx.body = {
                        code:"CART_GOODS_ORIGIN_ERROR",
                        success:false,
                        data:{},
                        msg:"商品信息错误" // 其实该商品已经在购物车
                    }
                }
                let platformgoods_str = JSON.stringify(platformgoods)
                let bangzhugoods_str = JSON.stringify(bangzhugoods)
                let usergoods_str = JSON.stringify(usergoods)
                await mysql('cart').update({
                    timestamp, 
                    _time, 
                    platformgoods: platformgoods_str, 
                    bangzhugoods: bangzhugoods_str, 
                    usergoods: usergoods_str, 
                }).limit(1).where({openid})
                return ctx.body = {
                    code: 1,
                    success: true,
                    data: {},
                    msg: "加入购物车成功"
                }
            }else{
                // 没有购物车信息  直接插入
                console.log('没有购物车信息  直接插入:');
                console.log('goodsid:',goodsid);
                console.log('goodsinfo:',goodsinfo);
                var cartgoods = {
                    platform: [],
                    bangzhu:{},
                    user:{}
                }
                if(origin === 'platform'){
                    cartgoods.platform = [ goodsinfo ]
                }else if(origin === 'bangzhu'){
                    cartgoods.bangzhu[goodsinfo.uploadUser] = [goodsinfo]
                }else{
                    cartgoods.user[goodsinfo.uploadUser] = [goodsinfo]
                }
                let string = JSON.stringify(cartgoods)
                await mysql('cart').insert({openid, timestamp, _time, cartgoods: string})
                return ctx.body = {
                    code: 1,
                    success: true,
                    data: {},
                    msg: "加入购物车成功"
                }
            }
            
        }else{
            return ctx.body = {
                code:0,
                success:false,
                data:{},
                msg:"该商品不存在"
            }
        }
    } catch (err) {
        console.log(err);
        return ctx.body = {
            code:0,
            success:false,
            data:{},
            msg:"商品查询出错"
        }
    }
}