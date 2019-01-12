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
    // STEP2 openid提取
    let openid = ctx.state.$wxInfo.userinfo.openId;
    
    // STEP3 查询+返回
    try {
        var res = await mysql('roundshop').first().where({ openid });
        if(!res){
            return ctx.body = {
                code:"ROUNDSHOP_USER_ISNOT_SHOP",
                data:false,
                success:false,
                msg:"当前用户不是商铺"
            }
        }
        let status = res.status
        if(status == 1){
           return ctx.body = {
                code:"ROUNDSHOP_SHOP_IN_AUDIT",
                data:false,
                success:false,
                msg:"商铺审核尚未通过"
            }                     
        }
        if(status == 2){
           return ctx.body = {
                code:"ROUNDSHOP_USER_IS_SHOP",
                data:true,
                success:true,
                msg:"可以发布商品"
            }         
        }
        if(status == 3){
           return ctx.body = {
                code:"ROUNDSHOP_SHOP_AUDIT_DENY",
                data:false,
                success:false,
                msg:"商铺审核已被拒绝"
            }         
        }
        if(status == 4){
           return ctx.body = {
                code:"ROUNDSHOP_SHOP_CLOSED",
                data:false,
                success:false,
                msg:"商铺已删除，无法发布"
            }         
        }
        
    } catch (error) {
        return ctx.body = {
            code:"SYSTEM_ERROR",
            data:false,
            success:false,
            msg:"系统错误"
        }
    }
    
}
