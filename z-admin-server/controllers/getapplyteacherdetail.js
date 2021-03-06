const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    let openid = ctx.query.openid ;
    console.log(openid);
    if(!openid){
        return ctx.body = {
            code:"TEACHER_DETAIL_OPENID_INVALID",
            success:false,
            msg:"获取老师信息失败，请重新选择",
            data:null
        }
    }
    try {
        let openid = ctx.state.$wxInfo.userinfo.openId ;
        let res = await mysql('applysforteacher')
        .first()
        .where({ openid });
        
        if(res){
            let formatted = JSON.parse(res.goodsinfo)
            let query = await mysql('user_teachers')
            .first()
            .where({ openid: formatted.openid });
            console.log('query');
            console.log(query);
            
            query.teachtype = JSON.parse(query.teachtype)
            query.teacharea = JSON.parse(query.teacharea)
            query.teachday = JSON.parse(query.teachday)
            query.comment = JSON.parse(query.comment)
            ctx.body = {
                code:"TEACHER_DETAIL_GET_SUCCESS",
                success:true,
                msg:"老师信息获取成功",
                data:query
            }
        }else{
            return ctx.body = {
                code:"TEACHER_DETAIL_NOT_EXIST",
                success:false,
                msg:"订单信息错误，请重新选择",
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
