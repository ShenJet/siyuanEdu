const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    var params = ctx.query
    console.log('params:');
    console.log(params);

    let pageindex = params.pageindex || 1

    var res = await mysql('user_students').select().limit(10).offset(10* (pageindex - 1))

    var count = await mysql('user_students').count('id as count')

    res.map(function(v,i){
        v.teachday = JSON.parse( v.teachday )
        v.teachtype = JSON.parse( v.teachtype )
        
    })

    return ctx.body = {
        code: 1,
        success: true,
        msg: "学员列表刷新成功",
        data: res,
        count: count
    }
}
