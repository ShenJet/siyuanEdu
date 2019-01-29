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
        
        let res = await mysql('user_teachers')
        .first(
            'openid',
            'recieveorder',
            'avatar',
            'name',
            'sex',
            'role',
            'xueli',
            'school',
            'major',
            'graduateyear',
            'coursetype',
            'coursename',
            'price',
            'teachtype',
            'teachyear',
            'teacharea',
            'citylabel',
            'teachday',
            'teachstarttime',
            'teachendtime',
            'applydesc',
            'longitude',
            'latitude',
            'ordercount',
            'viewcount'
        )
        .where({ openid });

        console.log(res);
        if(res){
            res.name = res.name.substring(0,1)+'老师'
            res.teachtype = JSON.parse(res.teachtype)
            res.teacharea = JSON.parse(res.teacharea)
            res.teachday = JSON.parse(res.teachday)
            ctx.body = {
                code:"TEACHER_DETAIL_GET_SUCCESS",
                success:true,
                msg:"老师信息获取成功",
                data:res
            }
            await mysql('user_teachers').limit(1).where({ openid })
            .increment('viewcount', 1) ;
        }else{
            return ctx.body = {
                code:"TEACHER_DETAIL_NOT_EXIST",
                success:false,
                msg:"该老师不存在，请重新选择",
                data:null
            }
        }
    } catch (error) {
        console.log(error);
        return ctx.body = {
            code:"TEACHER_DETAIL_SYSTEM_ERROR",
            success:false,
            msg:"该老师不存在，请重新选择",
            data:null
        }
    }

    
    
}
