const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('piwubang:app')
const xmlParser = require('koa-xml-body')
const response = require('./middlewares/response')
const bodyParser = require('./middlewares/bodyparser')
const config = require('./config')

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
app.use(router.routes())

// 启动程序，监听端口
app.listen(config.port, () => {
    debug(`sever started, and is listening on port ${config.port}`);
    console.log(`listen @${config.port} `);
})
