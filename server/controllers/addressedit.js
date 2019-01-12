const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud
module.exports = async (ctx, next) => {
    let open_id = ctx.state.$wxInfo.userinfo.openId ;
    let params = ctx.request.body.address;
    console.log(params);
    
    try {
        await mysql('cSessionInfo').update({receipt: params }).where({open_id})
        return ctx.body = {
            code:'USER_ADDRESS_EDIT_SUCCESS',
            data:{},
            msg:"地址修改成功"
        }
    } catch (error) {
        return ctx.body = {
            code:'USER_ADDRESS_EDIT_FAILED',
            data:{},
            msg:"地址修改失败"
        }
    }

    
}