const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    let type = ctx.query.type
    let res = await mysql('applysforstudent').select(
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
        'randomstr'
    ).where({recieveorder: 1}).limit(8).orderBy('id', 'desc');
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
