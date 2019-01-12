const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud
module.exports = async (ctx, next) => {
    let params = ctx.request.body;
    let openid = ctx.state.$wxInfo.userinfo.openId ;
    console.log('@bgysapply  params:',params);
    try{
        let searchs = await mysql('applysforgys').select().where({openid})
        if(searchs.length===0){
            // 直接插入
            await mysql('applysforgys').insert({...params,openid})
            return ctx.body = {
                code:"GYS_APPLY_SUCCESS",
                data:{},
                success:true,
                msg:"申请成功"
            }
        }else if(searchs.length===1){
            // 
            let search = searchs[0]
            if(search.status == 1){
                return ctx.body = {
                    code:"GYS_APPLY_CHECKING",
                    data:{},
                    success:true,
                    msg:"审核中，请勿重复申请"
                }
            }else if(search.status == 2){
                return ctx.body = {
                    code:"GYS_APPLY_NONEED_REPEAT",
                    data:{},
                    success:true,
                    msg:"您已申请过，请勿重复申请"
                }
            }else if(search.status == 3){
                return ctx.body = {
                    code:"GYS_APPLY_REJECTED",
                    data:{},
                    success:true,
                    msg:"有被拒绝的申请，请联系管理员"
                }
            }else{
                console.log('GYS_APPLY_SYSTEM_ERROR1');
                
                return ctx.body = {
                    code:"GYS_APPLY_SYSTEM_ERROR",
                    data:{},
                    success:false,
                    msg:"系统错误，请联系管理员"
                }
            }
        }else{
            console.log('GYS_APPLY_SYSTEM_ERROR2');

            return ctx.body = {
                code:"GYS_APPLY_SYSTEM_ERROR",
                data:{},
                success:false,
                msg:"系统错误，请联系管理员"
            }
        }
    }catch(err){
        console.log('GYS_APPLY_SYSTEM_ERROR3');

        console.log('err:',err);
        return ctx.body = {
            code:"GYS_APPLY_SYSTEM_ERROR",
            data:{},
            success:false,
            msg:"系统错误，请联系管理员"
        }
    }
}