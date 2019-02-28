const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    var params = ctx.query
    console.log('params:');
    console.log(params);
    
    var res = await mysql('applysstudentrejection').select()
    
    res.map(function(v, i){
        v.teachtype = JSON.parse(v.teachtype)
        v.teachday = JSON.parse(v.teachday)
    })
    return ctx.body = {
        code:1,
        success:true,
        msg:"已删除学员列表获取成功",
        data:res
    }
}
