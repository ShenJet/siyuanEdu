const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud
module.exports = async (ctx, next) => {
    let params = ctx.request.body;
    let timestamp = new Date().getTime();

    console.log('@管理员添加老师  params:',params);
    try{
        let coursetype = []
        let coursename = []
        params.course.map(function(v, i){
            let a = v.split("-")[0]
            let b = v.split("-")[1]
            if(!coursetype.includes(a)){
                coursetype.push(a)
            }
            if(!coursename.includes(b)){
                coursename.push(b)
            }
        })
        let teacharea = [params.province, params.city, params.country]

        params.teachtype =  JSON.stringify( params.teachtype )
        params.teacharea =  JSON.stringify( teacharea )
        params.teachday =   JSON.stringify( params.teachday )
        params.comment =    JSON.stringify( params.comment )
        params.course =     JSON.stringify( params.course )
        params.coursetype = JSON.stringify( coursetype )
        params.coursename = JSON.stringify( coursename )
        
        // 直接插入
        await mysql('user_teachers').insert({...params, refreshtime: timestamp})
        return ctx.body = {
            code:"TEACHER_ADMIN_ADD_SUCCESS",
            data:{},
            success:true,
            msg:"添加成功"
        }
        
    }catch(err){
        console.log('err:',err);
        return ctx.body = {
            code:"TEACHER_ADMIN_ADD_SYSTEM_ERROR",
            data:{},
            success:false,
            msg:"系统错误，请联系管理员"
        }
    }
}