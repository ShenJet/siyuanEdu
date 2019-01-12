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
    // STEP2 地区确定
    let code = ctx.query.code ;
    // let openid = ctx.state.$wxInfo.userinfo.openId;
    if(!code){
        console.log("code不正确，附近商铺获取失败，code:",code);
        
        return ctx.body = {
            code:"ROUNDSHOP_CODE_ERROR",
            data:[],
            success:false,
            msg:"附近商铺获取失败"
        }
    }
    // STEP3 查询+返回
    try {
        var res = await mysql('roundshop').select().where({ code });
        res.map(function(v,i){
            let string = v.goodslist 
            if( !string || string == null  ||  string == '[]'){
                res.splice(i ,1)
            }else{
                v.goodslist = JSON.parse(string)
                v.userinfo = JSON.parse(v.userinfo)
            }
        })
        return ctx.body = {
            code:"ROUNDSHOP_GET_SUCCESS",
            success:true,
            msg:"附近商铺获取成功",
            data:res
        }
    } catch (error) {
        return ctx.body = {
            code:"ROUNDSHOP_GET_FAILED",
            data:[],
            success:false,
            msg:"附近商铺获取失败"
        }
    }
    
}
