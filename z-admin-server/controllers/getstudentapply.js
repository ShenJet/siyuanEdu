const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    var res = await mysql('applysforstudent').select().orderBy('id', 'desc');
    
    res.map(function(v, i){
        v.teachtype = JSON.parse(v.teachtype)
        v.teachday = JSON.parse(v.teachday)
    })
    return ctx.body = {
        code:1,
        success:true,
        msg:"学员申请列表获取成功",
        data:res
    }
}
