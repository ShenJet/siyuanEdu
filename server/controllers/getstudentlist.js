const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    var params = ctx.query
    console.log('params:');
    console.log(params);

    delete params.pageindex
    for (const key in params) {
        // if (params.hasOwnProperty(key)) {
            const el = params[key];
            if(!el){
                delete params[key]
            }
            if(el == '都可以'){
                delete params[key]
            }
        // }
    }
    if(params.sex){
        params.sex = params.sex.substring(0,1)
    }
    if(params.teachtype){
        var teachtype = `%${params.teachtype}%`
        delete params.teachtype
    }else{
        var teachtype = false
    }
    console.log('params final:');
    console.log(params);
    if(teachtype){
        var res = await mysql('user_students').select(
            'openid',
            'recieveorder',
            'avatar',
            'name',
            'sex',
            'coursetype',
            'coursename',
            'longitude',
            'latitude',
            'teachersex',
            'teachday',
            'teachyear',
            'city',
            'country',
            'grade',
            'randomstr',
            'usertype'
        ).where({
            recieveorder: 1,
            ...params
        }).andWhere('teachtype', 'like', teachtype).orderBy('refreshtime', 'desc');
    }else{
        var res = await mysql('user_students').select(
            'openid',
            'recieveorder',
            'avatar',
            'name',
            'sex',
            'coursetype',
            'coursename',
            'longitude',
            'latitude',
            'teachersex',
            'teachday',
            'teachyear',
            'city',
            'country',
            'grade',
            'randomstr',
            'usertype'
        ).where({
            recieveorder: 1,
            ...params
        }).orderBy('refreshtime', 'desc');
    }
    
    // console.log('teacher list:');
    // console.log(res);
    res.map(function(v, i){
        v.name = v.name.substring(0,1)+'同学'
        v.teachday = JSON.parse(v.teachday)
    })
    ctx.body = {
        code:1,
        success:true,
        msg:"学员列表刷新成功",
        data:res
    }
}
