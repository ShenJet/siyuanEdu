const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    let code = ctx.query.code
    if(!code){
        return ctx.body = {
            code:"ZUTUAN_CITYCODE_UNVALID",
            success:false,
            msg:"地区码错误",
            data:[]
        }
    }
    let res = await mysql('community').select().where({code});
    console.log('该地区已开放小区列表：',res);
    return ctx.body = {
        code: "ZUTUAN_GET_COMMUNITY_SUCCESS",
        success:true,
        msg:"小区列表获取成功",
        data:res
    }
}
