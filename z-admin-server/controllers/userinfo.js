// 登录授权接口
module.exports = async (ctx, next) => {
    // ctx.set('Access-Control-Allow-Origin', '*')
    let params = ctx.request.body;
    console.log(params);
    
    return ctx.body = {
        code:20000,
        // code:"LOGIN_SUCCESS",
        success: true,
        data: {roles: ["admin"]}
    }
}
