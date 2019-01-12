const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    let goodsid = ctx.query.goodsid ;
    let origin = ctx.query.origin ;
    console.log(goodsid, origin);
    
    if(goodsid && origin){
        switch (origin) {
            case 'platform':
                var table = 't_product'
                break;
            case 'bangzhu':
                var table = 't_product_zutuan'
                break;
            case 'user':
                var table = 't_product_zutuan'
                break;
            default:
                break;
        }
        try {
            
            let res = await mysql(table).first().where({ _id: goodsid });
            console.log(res);
            if(res){
                res.urls = res.urls ? JSON.parse(res.urls):[]
                res.detailImg = res.detailImg ? JSON.parse(res.detailImg):[]
                res.marketPrice = res.marketPrice ? JSON.parse(res.marketPrice):[]
                ctx.body = {
                    code:1,
                    success:true,
                    msg:"商品详情成功",
                    data:res
                }
                let viewcount = res.viewcount||0;
                console.log( viewcount );
                let update = await mysql(table).update({ viewcount: viewcount+1 }).limit(1).where({ _id: goodsid });
            }else{
                return ctx.body = {
                    code:1,
                    success:true,
                    msg:"该商品不存在",
                    data:{}
                }
            }
        } catch (error) {
            console.log(error);
            
            return ctx.body = {
                code:1,
                success:true,
                msg:"该商品不存在",
                data:{}
            }
        }

    }else{
        return ctx.body = {
            code:1,
            success:true,
            msg:"该商品不存在",
            data:{}
        }
    }
    
}
