const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    try {
        let openid = ctx.query.openid ;
        let randomstr = ctx.query.randomstr ;

        console.log(openid);
        console.log(randomstr);
        if(!openid || !randomstr){
            return ctx.body = {
                code:"STUDENT_DETAIL_OPENID_INVALID",
                success:false,
                msg:"参数传递错误，请重新操作",
                data:null
            }
        }
    
        let res = await mysql('applysstudentrejection')
        .first()
        .where({ openid, randomstr });
        
        if(res){
            res.auditstate = 1
            delete res.id
            let insert = await mysql('user_students')
            .insert(res)
            let del = await mysql('applysstudentrejection')
            .where({ openid, randomstr })
            .first()
            .del()
            
            return ctx.body = {
                code:"STUDENT_RECOVERY_SUCCESS",
                success:true,
                msg:"学员恢复成功",
                data:{}
            }
        }else{
            return ctx.body = {
                code:"STUDENT_NOT_EXIST",
                success:false,
                msg:"不存在该已驳回学生，请重新选择",
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
