const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud
module.exports = async (ctx, next) => {
    let params = ctx.request.body;

    try{
        await mysql('news').insert({...params ,author: '92家教'})

        return ctx.body = {
            code:"NEWS_ADMIN_ADD_SUCCESS",
            data:{},
            success:true,
            msg:"添加成功"
        }
    }catch(err){
        console.log('NEWS_ADMIN_ADD_SYSTEM_ERROR!');
        console.log('err:',err);
        return ctx.body = {
            code:"NEWS_ADMIN_ADD_SYSTEM_ERROR",
            data:{},
            success:false,
            msg:"系统错误，请联系管理员"
        }
    }
}