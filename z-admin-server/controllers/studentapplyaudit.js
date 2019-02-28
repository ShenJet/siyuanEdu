const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    try {
        let openid = ctx.query.openid ;
        let randomstr = ctx.query.randomstr ;
        let type = ctx.query.type ;
        console.log(openid);
        console.log(type);
        if(!openid || !type || !randomstr){
            return ctx.body = {
                code:"STUDENT_DETAIL_OPENID_INVALID",
                success:false,
                msg:"参数传递错误，请重新操作",
                data:null
            }
        }
    
        let res = await mysql('applysforstudent')
        .first()
        .where({ openid, randomstr });
        
        if(res){
            if(type === 'pass'){
                var table = 'user_students'
            }
            res.auditstate = 1
            delete res.id

            let insert = await mysql(table)
            .insert(res)
            let del = await mysql('applysforstudent')
            .where({ openid, randomstr })
            .first()
            .del()
            
            return ctx.body = {
                code:"STUDENT_AUDIT_SUCCESS",
                success:true,
                msg:"审核通过成功",
                data:{}
            }
        }else{
            return ctx.body = {
                code:"STUDENT_DETAIL_NOT_EXIST",
                success:false,
                msg:"学员信息错误，请重新选择",
                data:null
            }
        }
    } catch (error) {
        console.log(error);
        return ctx.body = {
            code:"STUDENT_DETAIL_SYSTEM_ERROR",
            success:false,
            msg:"系统错误，请重新选择或联系客服",
            data:null
        }
    }

    
    
}
