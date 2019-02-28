
const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    try {
        let openid = ctx.state.$wxInfo.userinfo.openId ;
        let obj = await mysql('cSessionInfo').first('usertype').where({open_id: openid})
        let usertype = obj.usertype;
        console.log('usertype:', usertype);
        
        if(usertype === 'teacher'){
            var query = await mysql('user_teachers').select().where({openid}).limit(1)
        }else if(usertype === 'student'){
            var query = await mysql('user_students').select().where({openid})
        }else{
            return ctx.body = {
                code:"RELEASED_GOODS_QUERY_SUCCESS",
                success:true,
                msg:"您尚未发布过任何信息",
                data: []
            }
        }
        return ctx.body = {
            code:"RELEASED_GOODS_QUERY_SUCCESS",
            success:true,
            msg:"已发布列表获取成功",
            data: query
        }

    } catch (error) {
        console.log('error:');
        console.log(error);
        
        return ctx.body = {
            code:"RELEASED_GOODS_QUERY_FAILED",
            success:false,
            msg:"已发布商品列表获取失败",
            data:null
        }
    }
}
