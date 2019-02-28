const Koa = require('koa')
const session = require('koa-session');
const app = new Koa()
const debug = require('debug')('piwubang:app')
const xmlParser = require('koa-xml-body')
const response = require('./middlewares/response')
const bodyParser = require('./middlewares/bodyparser')
const config = require('./config')
const path = require('path')

// cookie & session config
app.keys = ['92edu@123'];
const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    // maxAge: 86400000,
    maxAge: 3600000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));

// 静态web服务的中间件
const static = require('koa-static');
// 配置静态web服务的中间件
console.log(path.join(__dirname, 'web'));

app.use(static(  path.join(__dirname, 'web')  ));

app.use(xmlParser())
app.use(function(ctx, next) {
    // the parsed body will store in this.request.body
    // if nothing was parsed, body will be undefined
    if(ctx.method == 'POST' && ctx.request.type == 'text/xml'){
        ctx.req.setEncoding('utf8')
        ctx.xmlbody = ctx.request.body
        // console.log(ctx.xmlbody);
    }
    return next()
})

// 使用响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyParser())

// 引入路由分发
const router = require('./routes')

app.use(async (ctx, next) => {
    // 允许来自所有域名请求
    ctx.set("Access-Control-Allow-Origin", "*"); // 212.64.64.99
    
    // 这样就能只允许 http://localhost:8080 这个域名的请求了
    // ctx.set("Access-Control-Allow-Origin", "http://localhost:8080"); 

    // 设置所允许的HTTP请求方法
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

    // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
    ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type, x-token");

    // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

    // Content-Type表示具体请求中的媒体类型信息
    ctx.set("Content-Type", "application/json;charset=utf-8");

    // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
    // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
    ctx.set("Access-Control-Allow-Credentials", true);

    // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
    // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
    // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
    ctx.set("Access-Control-Max-Age", 300);

    /*
    CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：
        Cache-Control、
        Content-Language、
        Content-Type、
        Expires、
        Last-Modified、
        Pragma。
    */
    // 需要获取其他字段时，使用Access-Control-Expose-Headers，
    // getResponseHeader('myData')可以返回我们所需的值
    ctx.set("Access-Control-Expose-Headers", "myData");



    ctx.cookies.set('test', 'admin shenjie', {httpOnly: false});


    await next();
})

app.use(router.routes())
// 启动程序，监听端口
app.listen(config.port, () => {
    debug(`sever started, and is listening on port ${config.port}`);
    console.log(`listen @${config.port} `);
})
