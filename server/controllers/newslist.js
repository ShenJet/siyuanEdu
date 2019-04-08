const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud
module.exports = async (ctx, next) => {
    
    try{
        let list = await mysql('news').select('id','title','time','author').orderBy('id', 'desc')

        return ctx.body = {
            code:"NEWS_LIST_GET_SUCCESS",
            data:list,
            success:true,
            msg:"新闻获取成功"
        }
    }catch(err){
        console.log('NEWS_LIST_GET_SUCCESS_SYSTEM_ERROR!');
        console.log('err:',err);
        return ctx.body = {
            code:"NEWS_LIST_GET_SUCCESS_SYSTEM_ERROR",
            data:{},
            success:false,
            msg:"系统错误，请联系管理员"
        }
    }
}