const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud
module.exports = async (ctx, next) => {
    let params = ctx.request.body;
    let openid = ctx.state.$wxInfo.userinfo.openId ;
    let avatarUrl = ctx.state.$wxInfo.userinfo.avatarUrl ;
    let timestamp = new Date().getTime();
    console.log(avatarUrl);
    
    console.log('@学生提交资料  params:',params);
    let randomstr = 'S' + Math.floor(Math.random()*(89999)+10000)
    try{
        params.teachtype = JSON.stringify(params.teachtype)
        params.teachday = JSON.stringify(params.teachday)
        let search = await mysql('applysforstudent').select().where({openid})
        for (let i = 0, l=search.length; i < l; i++) {
            const element = search[i];
            if(element.course == params.course){
                return ctx.body = {
                    code:"STUDENT_COURSE_REPEAT",
                    data:{},
                    success:false,
                    msg:"您已发布过该科目，不可重复发布"
                }
            }
        }
        // 直接插入
        await mysql('applysforstudent').insert({...params, openid, avatar:avatarUrl, randomstr, refreshtime: timestamp})
        return ctx.body = {
            code:"STUDENT_APPLY_SUCCESS",
            data:{},
            success:true,
            msg:"发布成功"
        }
    }catch(err){
        console.log('STUDENT_APPLY_SYSTEM_ERROR3');

        console.log('err:',err);
        return ctx.body = {
            code:"STUDENT_APPLY_SYSTEM_ERROR",
            data:{},
            success:false,
            msg:"系统错误，请联系管理员"
        }
    }
}