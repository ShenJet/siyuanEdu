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
    console.log('params final:');
    console.log(params);
    
    if(params.type && params.type == 'index'){
        var res = await mysql('user_teachers').select(
            'openid',
            'recieveorder',
            'avatar',
            'name',
            'sex',
            'role',
            // 'xueli',
            'coursetype',
            'coursename',
            'teachtype',
            'teachyear',
            'teacharea',
            // 'citylabel',
            'comment',
            'usertype'
            // 'longitude',
            // 'latitude',
            // 'ordercount',
            // 'viewcount'
        ).where({
            recieveorder: 1
        }).limit(8).orderBy('refreshtime', 'desc');
    }else{
        var res = await mysql('user_teachers').select(
            'openid',
            'recieveorder',
            'avatar',
            'name',
            'sex',
            'role',
            // 'xueli',
            'coursetype',
            'coursename',
            'teachtype',
            'teachyear',
            'teacharea',
            // 'citylabel',
            'comment',
            'usertype'
            // 'longitude',
            // 'latitude',
            // 'ordercount',
            // 'viewcount'
        ).where({
            recieveorder: 1,
            ...params
        }).orderBy('refreshtime', 'desc');
    }

    // console.log('teacher list:');
    // console.log(res);
    res.map(function(v, i){
        v.name = v.name.substring(0,1)+'老师'
        v.teachtype = JSON.parse(v.teachtype)
        v.teacharea = JSON.parse(v.teacharea)
        v.comment = JSON.parse(v.comment)
    })
    // console.log(res);
    return ctx.body = {
        code:1,
        success:true,
        msg:"92名师获取成功",
        data:res
    }
}
