const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud
module.exports = async (ctx, next) => {
    

    try{
        let id = ctx.query.id;
        let detail = await mysql('news').first().where({ id })

        return ctx.body = {
            code:"NEWS_GET_DETAIL_SUCCESS",
            data:detail,
            success:true,
            msg:"添加成功"
        }
    }catch(err){
        console.log('NEWS_ADMIN_ADD_SYSTEM_ERROR!');
        console.log('err:',err);
        return ctx.body = {
            code:"NEWS_GET_DETAIL_SYSTEM_ERROR",
            data:{},
            success:false,
            msg:"系统错误，请联系管理员"
        }
    }
}