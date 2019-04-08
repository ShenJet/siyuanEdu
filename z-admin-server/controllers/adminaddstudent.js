const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud
module.exports = async (ctx, next) => {
    let params = ctx.request.body;
    let timestamp = new Date().getTime();
    
    let course = params.course
    let arr = params.course.split('-')
    params.coursetype = arr[0]
    params.coursename = arr[1]
    params.course = arr[0]+arr[1]

    params.avatarUrl = params.avatar

    console.log('@管理员添加学员  params:',params);
    let randomstr = 'S' + Math.floor(Math.random()*(89999)+10000)
    try{
        params.teachtype = JSON.stringify(params.teachtype)
        params.teachday = JSON.stringify(params.teachday)
        // 直接插入
        await mysql('user_students').insert({...params, randomstr, refreshtime: timestamp})

        return ctx.body = {
            code:"STUDENT_ADMIN_ADD_SUCCESS",
            data:{},
            success:true,
            msg:"添加成功"
        }
    }catch(err){
        console.log('STUDENT_ADMIN_ADD_SYSTEM_ERROR!');
        console.log('err:',err);
        return ctx.body = {
            code:"STUDENT_ADMIN_ADD_SYSTEM_ERROR",
            data:{},
            success:false,
            msg:"系统错误，请联系管理员"
        }
    }
}