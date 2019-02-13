const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    let params = ctx.query
    console.log('params:');
    console.log(params);
    
    
    let res = await mysql('user_teachers').select(
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
    ).where({recieveorder: 1}).limit(8).orderBy('refreshtime', 'desc');
    // console.log('teacher list:');
    // console.log(res);
    res.map(function(v, i){
        v.name = v.name.substring(0,1)+'老师'
        v.teachtype = JSON.parse(v.teachtype)
        v.teacharea = JSON.parse(v.teacharea)
        v.comment = JSON.parse(v.comment)
    })
    // console.log(res);
    ctx.body = {
        code:1,
        success:true,
        msg:"思元名师获取成功",
        data:res
    }
}
