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
    let code = ctx.query.code ;
    // let openid = ctx.state.$wxInfo.userinfo.openId;
    
    // STEP3 查询+返回
    try {
        var res = await mysql('bangzhu').select().where({ code });

        res.map(function(v,i){
            let string = v.goodslist 
            if( !string || string == null ){
                res.splice(i ,1)
            }else{
                v.goodslist = JSON.parse(string)
                v.userinfo = JSON.parse(v.userinfo)
            }
        })
        ctx.body = {
            code:1,
            success:true,
            msg:"帮主列表获取成功",
            data:res
        }
    } catch (error) {
        return ctx.body = {
            code:0,
            data:[],
            success:false,
            msg:"帮主列表获取失败"
        }
    }
    
}
