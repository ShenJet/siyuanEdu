// xmlParse.js
const xml = require('./xmlTool')

module.exports = () => {
    return async (ctx, next) => {
        if (ctx.method == 'POST' && ctx.request.type == 'text/xml' ) {
            let promise = new Promise(function (resolve, reject) {
                let buf = ''
                ctx.req.setEncoding('utf8')
                ctx.req.on('data', (chunk) => {
                    buf += chunk
                })
                ctx.req.on('end', () => {
                    xml.xmlToJson(buf)
                        .then(resolve)
                        .catch(reject)
                })
            })

            await promise.then((result) => {
                    ctx.req.body = result

                    console.log('-------------result-------------');
                    console.log(result);
                    console.log('-------------result end-------------');
                    
                })
                .catch((e) => {
                    e.status = 400
                })

            next()
        } else {
            await next()
        }
    }
}