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
        
        let res = await mysql('smsphones').where(params).limit(1).del()
        
        return ctx.body = {
            code:"WXSMSUSER_DELETE_SUCCESS",
            success: true,
            msg: "短信通知成员删除成功",
            data: res
        }
    } catch (error) {
        return ctx.body = {
            code:0,
            success:false,
            msg:"系统错误，短信通知成员删除失败",
            data:null
        }
    }
}
