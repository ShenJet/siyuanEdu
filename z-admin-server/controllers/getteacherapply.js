const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    var res = await mysql('applysforteacher').select().orderBy('id', 'desc');// .where({ recieveorder: 1 })
    // console.log(res);
    
    res.map(function(v, i){
        v.teachtype = JSON.parse(v.teachtype)
        v.teacharea = JSON.parse(v.teacharea)
        v.teachday = JSON.parse(v.teachday)
        v.comment = JSON.parse(v.comment)
    })
    return ctx.body = {
        code:1,
        success:true,
        msg:"92名师获取成功",
        data:res
    }
}
