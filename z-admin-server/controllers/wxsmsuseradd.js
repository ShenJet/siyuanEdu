const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    // let goodsid = 
    // console.log('ctx.session.userinfo:');
    // console.log(ctx.session.userinfo);
    
    try {
        let params = ctx.request.body;
        console.log('params:');
        console.log(params);
        let res = await mysql('smsphones').insert( params )
        // console.log('res:');
        // console.log(res);
        
        return ctx.body = {
            code:"WXSMSUSER_ADD_SUCCESS",
            success: true,
            msg: "短信通知成员添加成功",
            data: res
        }
    } catch (error) {
        return ctx.body = {
            code:0,
            success:false,
            msg:"系统错误，短信通知成员添加失败",
            data:null
        }
    }
}
