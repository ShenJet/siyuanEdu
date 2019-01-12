const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud
module.exports = async (ctx, next) => {
    let open_id = ctx.state.$wxInfo.userinfo.openId ;
    try {
        let searchs = await mysql('cSessionInfo').first('receipt').where({open_id})
        console.log(searchs);
        console.log(searchs[0].receipt);
        if(searchs.length>0 && searchs[0].receipt){
            var search = JSON.parse(searchs[0].receipt)
        }else{
            var search = []
        }
        return ctx.body = {
            code:'USER_ADDRESS_QUERY_SUCCESS',
            data:search,
            msg:"地址查询成功"
        }
    } catch (err) {
        console.log(err);
        
        return ctx.body = {
            code:'USER_ADDRESS_QUERY_FAILED',
            data:[],
            msg:"地址查询失败"
        }
    }
}