const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    let openid = ctx.query.openid ;
    let randomstr = ctx.query.randomstr ;
    console.log(openid);
    if(!openid){
        return ctx.body = {
            code:"STUDENT_DETAIL_OPENID_INVALID",
            success:false,
            msg:"学员信息有误，请重新选择",
            data:null
        }
    }
    try {
        let res = await mysql('applysforstudent')
        .first(
            'openid',
            'recieveorder',
            'avatar',
            'name',
            'sex',
            'coursetype',
            'coursename',
            'teachtype',
            'teachyear',
            'teachersex',
            'citylabel',
            'teachday',
            'teachstarttime',
            'teachendtime',
            'gaikuang',
            'applydesc',
            'longitude',
            'latitude',
            'viewcount',
            'grade',
            'randomstr',
            'usertype'
        )
        .where({ openid, randomstr });
        
        if(res){
            res.name = res.name.substring(0,1)+'同学'
            res.teachtype = JSON.parse(res.teachtype)
            res.teachday = JSON.parse(res.teachday)
            ctx.body = {
                code:"STUDENT_DETAIL_GET_SUCCESS",
                success:true,
                msg:"学员信息获取成功",
                data:res
            }
            await mysql('applysforstudent').first().where({ openid, randomstr })
            .increment('viewcount', 1) ;
        }else{
            return ctx.body = {
                code:"STUDENT_DETAIL_NOT_EXIST",
                success:false,
                msg:"该学员不存在，请重新选择",
                data:null
            }
        }
    } catch (error) {
        console.log(error);
        return ctx.body = {
            code:"STUDENT_DETAIL_SYSTEM_ERROR",
            success:false,
            msg:"该学员不存在，请重新选择",
            data:null
        }
    }
}
