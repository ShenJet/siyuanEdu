const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    let type = ctx.query.type
    let res = await mysql('user_teachers').select().where({recieveorder: 1}).orderBy('id', 'desc');
    res.map(function(v, i){
        v.name = v.name.substring(0,1)+'老师'
        v.teachtype = JSON.parse(v.teachtype)
        v.teacharea = JSON.parse(v.teacharea)
        v.teachday = JSON.parse(v.teachday)
    })
    console.log(res);
    ctx.body = {
        code:1,
        success:true,
        msg:"思元名师获取成功",
        data:res
    }
}
