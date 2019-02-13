const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud
module.exports = async (ctx, next) => {
    let params = ctx.request.body;
    let openid = ctx.state.$wxInfo.userinfo.openId ;
    let avatarUrl = ctx.state.$wxInfo.userinfo.avatarUrl ;
    let timestamp = new Date().getTime();

    console.log('@老师申请  params:',params);
    try{
        params.teachtype = JSON.stringify(params.teachtype)
        params.teacharea = JSON.stringify(params.teacharea)
        params.teachday = JSON.stringify(params.teachday)
        params.comment = JSON.stringify(params.comment)
        
        let search = await mysql('applysforteacher').first().where({openid})
        if(!search){
            // 直接插入
            await mysql('applysforteacher').insert({...params, openid, avatar:avatarUrl, refreshtime: timestamp})
            return ctx.body = {
                code:"TEACHER_APPLY_SUCCESS",
                data:{},
                success:true,
                msg:"申请成功,请等待审核"
            }
        }else{
            if(search.status == 1){
                return ctx.body = {
                    code:"TEACHER_APPLY_CHECKING",
                    data:null,
                    success:false,
                    msg:"审核中，请勿重复申请"
                }
            }else if(search.status == 2){
                return ctx.body = {
                    code:"TEACHER_APPLY_NONEED_REPEAT",
                    data:null,
                    success:false,
                    msg:"您已成功申请为老师，请勿重复申请"
                }
            }else if(search.status == 3){
                return ctx.body = {
                    code:"TEACHER_APPLY_REJECTED",
                    data:null,
                    success:false,
                    msg:"有被拒绝的申请，请联系管理员"
                }
            }else{
                return ctx.body = {
                    code:"TEACHER_APPLY_SYSTEM_ERROR",
                    data:null,
                    success:false,
                    msg:"系统错误，请联系管理员"
                }
            }
        }
    }catch(err){
        console.log('err:',err);
        return ctx.body = {
            code:"TEACHER_APPLY_SYSTEM_ERROR",
            data:{},
            success:false,
            msg:"系统错误，请联系管理员"
        }
    }
}