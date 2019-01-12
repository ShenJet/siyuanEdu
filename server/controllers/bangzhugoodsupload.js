const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud
module.exports = async (ctx, next) => {
    let params = ctx.request.body;
    let openid = ctx.state.$wxInfo.userinfo.openId ;
    let userinfo = JSON.stringify(ctx.state.$wxInfo.userinfo)
    console.log('@bangzhuapply  params:',params);
    let thumbnail = params.urls[0]
    params.deliveryArea = params.deliveryArea + ' ' + params.deliveryArea1
    params.urls = JSON.stringify(params.urls)
    delete params.deliveryArea1
    delete params.urls0
    delete params.urls1
    delete params.urls2

    let now = new Date()
    let y = now.getFullYear()
    let m = now.getMonth()<9?'0'+(now.getMonth()+1):now.getMonth() + 1
    let d = now.getDate()<10?'0'+now.getDate():now.getDate()
    let ms = now.getMilliseconds()
    let ranstr = `${y}${m}${d}${ms}`+ Math.floor(Math.random()*(899999999999)+100000000000)
    console.log('ranstr:',ranstr);
    
    try {
        // 1.去帮主表查询是否是帮主
        let role = await mysql('bangzhu').first().where({openid}) //对象或undefined
        console.log('role:',role); 
        if(role){//是帮主
            let _id = 'bz'+ranstr
            let goodslist = JSON.parse(role.goodslist) || []
            if(goodslist.length>=10){
                return ctx.body = {
                    code:"ZUTUAN_GOODSCOUNT_LIMITED",
                    data:null,
                    success:false,
                    msg:"商品数量超限，请适当删除旧商品"
                }
            }
            // <=10的话：更新goodslist字段，并向帮主商品表插入新商品
            console.log('旧数组：',goodslist);
            console.log('插入的新id：', _id);
            goodslist.unshift(_id)
            console.log('新数组：',goodslist);
            
            goodslist = JSON.stringify(goodslist)
            await mysql('bangzhu').update({goodslist}).limit(1).where({openid}) 
            await mysql('t_product_zutuan').insert({
                _id,
                ...params,
                uploadUser:openid,
                origin:'bangzhu',
                uploaderRole:'bangzhu',
                thumbnail,
                userinfo
            })
            return ctx.body = {
                code:"ZUTUAN_UPLOAD_SUCCESS",
                data:null,
                success:true,
                msg:"商品上传成功"
            }
        }else{
            let _id = 'user'+ranstr
            // bu是帮主 是普通用户 只允许发一个
            // 查是否发过
            let query = await mysql('t_product_zutuan').first().where({openid})
            if(query){
                await mysql('t_product_zutuan').update({
                    uploadUser: openid,
                    _id,
                    ...params
                }).limit(1).where({openid})
                return ctx.body = {
                    code:"ZUTUAN_UPDATE_SUCCESS",
                    data:null,
                    success:true,
                    msg:"商品上传成功，旧商品已被删除"
                }
            }else{
                await mysql('t_product_zutuan').insert({
                    _id,
                    ...params,
                    uploadUser: openid,
                    origin:'user',
                    uploaderRole:'user',
                    thumbnail,
                    userinfo
                })
                return ctx.body = {
                    code:"ZUTUAN_UPLOAD_SUCCESS",
                    data:null,
                    success:true,
                    msg:"商品上传成功"
                }
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