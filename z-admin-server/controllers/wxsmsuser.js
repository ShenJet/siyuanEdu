const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    // let goodsid = 
    // console.log('ctx.session.userinfo:');
    // console.log(ctx.session.userinfo);
    
    try {
        let res = await mysql('smsphones').select(
            'name',
            'phone',
            'rolename',
            'beizhu',
            'inuse'
        )
        // console.log('res:');
        // console.log(res);
        
        return ctx.body = {
            code:"WXSMSUSER_GET_SUCCESS",
            success: true,
            msg: "短信通知成员获取成功",
            data: res
        }
    } catch (error) {
        return ctx.body = {
            code:0,
            success:false,
            msg:"系统错误，短信通知成员获取失败",
            data:null
        }
    }
}
