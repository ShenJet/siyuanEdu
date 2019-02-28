// 登录授权接口
module.exports = async (ctx, next) => {
    // ctx.set('Access-Control-Allow-Origin', '*')

    // ctx.cookies.set('test', 'admin shenjie', {httpOnly: false});
    // console.log('ctx.cookies:');
    // console.log(ctx.cookies);
    
    let params = ctx.request.body;
    console.log(params);
    ctx.session.userinfo = 66666

    return ctx.body = {
        code:20000,
        // code:"LOGIN_SUCCESS",
        success: true,
        data: {token: "admin"}
    }
}
