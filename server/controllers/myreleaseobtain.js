const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    try {
        let realopenid = ctx.state.$wxInfo.userinfo.openId;
        let {openid, usertype, randomstr} = ctx.query;
        console.log(openid, usertype, randomstr);
        if(realopenid != openid){
            return ctx.body = {
                code:"RELEASED_GOODS_OBTAIN_FAILED",
                success:false,
                msg:"用户信息不匹配，请重新操作",
                data:null
            }
        }
        var refreshtime = new Date().getTime();
        if(usertype == 'teacher'){
            await mysql('user_teachers').update({ refreshtime, recieveorder:0 }).where({openid})
        }
        if(usertype == 'student'){
            await mysql('user_students').update({ refreshtime, recieveorder:0 }).where({openid, randomstr})
        }
        return ctx.body = {
            code:"RELEASED_GOODS_OBTAIN_SUCCESS",
            success: true,
            msg:"信息暂时下架成功！",
            data:{}
        }
    } catch (error) {
        console.log(error);
        return ctx.body = {
            code:"RELEASED_GOODS_DELETE_FAILED",
            success:false,
            msg:"系统错误，信息暂时下架失败",
            data:null
        }
    }
}
