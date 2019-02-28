const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    try {
        let openid = ctx.query.openid ;
        let type = ctx.query.type ;
        console.log(openid);
        console.log(type);
        if(!openid){
            return ctx.body = {
                code:"TEACHER_DETAIL_OPENID_INVALID",
                success:false,
                msg:"参数传递错误，请重新操作",
                data:null
            }
        }
        if(!type){
            return ctx.body = {
                code:"TEACHER_DETAIL_OPENID_INVALID",
                success:false,
                msg:"参数传递错误，请重新操作",
                data:null
            }
        }
    
        let res = await mysql('applysforteacher')
        .first()
        .where({ openid });
        
        if(res){

            if(type === 'rejection'){
                var table = 'applysteacherrejection'
            }else if(type === 'pass'){
                var table = 'user_teachers'
            }
            res.auditstate = 1
            delete res.id

            let insert = await mysql(table)
            .insert(res)
            let del = await mysql('applysforteacher')
            .where({ openid })
            .first()
            .del()
            
            return ctx.body = {
                code:"TEACHER_DETAIL_GET_SUCCESS",
                success:true,
                msg:"审核通过成功",
                data:{}
            }
        }else{
            return ctx.body = {
                code:"TEACHER_DETAIL_NOT_EXIST",
                success:false,
                msg:"老师信息错误，请重新选择",
                data:null
            }
        }
    } catch (error) {
        console.log(error);
        return ctx.body = {
            code:"TEACHER_DETAIL_SYSTEM_ERROR",
            success:false,
            msg:"系统错误，请重新选择或联系客服",
            data:null
        }
    }

    
    
}
