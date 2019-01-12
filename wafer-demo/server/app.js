const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('piwubang:app')

const response = require('./middlewares/response')
const bodyParser = require('./middlewares/bodyparser')
const config = require('./config')

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
