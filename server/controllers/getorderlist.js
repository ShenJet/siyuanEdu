const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    
    // STEP1 用户校验
console.log(ctx.state.$wxInfo);


    if(!ctx.state.$wxInfo || ctx.state.$wxInfo.loginState !== 1 ){
        return ctx.body = {
            code:0,
            data:[],
            success:false,
            msg:"用户尚未登录"
        }
        
    }
    // STEP2 订单类别提取
    let param = ctx.query.state ;
    let openid = ctx.state.$wxInfo.userinfo.openId ;
    var status = 'all'
    switch (param) {
        case 'all':
            status = 'all'
            break;
        default:
            break;
    }
    // STEP3 查询+返回
    try {
        if(status=='all'){
            var res = await mysql('orders').select().where({ openid }).orderBy('id', 'desc') ;
            
        }else{
            var res = await mysql('orders').select().where({ status, openid }).orderBy('id', 'desc');
        }
        ctx.body = {
            code:1,
            success:true,
            msg:"订单列表获取成功",
            data:res
        }
    } catch (error) {
        return ctx.body = {
            code:0,
            data:[],
            success:false,
            msg:"订单列表获取失败"
        }
    }
    
}
