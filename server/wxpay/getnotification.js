const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud
const { payconf } = require('../config.js');
var crypto = require('crypto');
        
const post = async function (ctx, next) {
    try{
        let data = ctx.xmlbody.xml //ctx.request.body
        console.log('-------notification data----------');
        console.log(data);
        console.log('-------notification data end-------');
        if( data && data['return_code'][0] == 'SUCCESS' && data['result_code'][0] == 'SUCCESS' ){
            // 1. 通知信息的处理
            var keys = Object.keys(data);
            keys = keys.sort()
            let basic = {}
            let other = {}
            let stringA = ''
            keys.forEach(function (key) {
                const element = data[key];
                if(key.indexOf('coupon_type_') != -1 || key.indexOf('coupon_id_') != -1 || key.indexOf('coupon_fee_') != -1){
                    other[key] = element[0]
                }else{
                    basic[key] = element[0]
                }
                if(key != "sign"){
                    stringA += `${key}=${element[0]}&`
                }
            });
            stringA += ("key=" + payconf.mchkey)
            console.log(stringA);
            other = JSON.stringify(other)

            var res = await mysql("wxnotification").insert( {...basic,other} )
            console.log(res);

            let _sign = crypto.createHash('md5').update(stringA, 'utf8').digest('hex').toUpperCase();
            console.log(data['sign'][0]);
            console.log(_sign);
            // 2. 对数据进行加密校验，判断是否来自微信      对订单进行核验、状态修改
            if(_sign === data['sign'][0]){
                // 3. 加密校验通过,对订单进行核验   
                let orderid = data["out_trade_no"][0]
                let openid = data["openid"][0]
                let transaction_id = data["transaction_id"][0]

                let order = await mysql("orders").first().where({orderid, openid})
                let goodsinfo = JSON.parse(order.goodsinfo)
                let usertype = goodsinfo.usertype
                let goods_openid = goodsinfo.openid
                console.log('usertype: ');
                console.log(usertype);
                
                if(usertype == 'student'){
                    var randomstr = goodsinfo.randomstr
                    await mysql("applysforstudent").update({beenordered:1, recieveorder:0,}).where({openid:goods_openid, randomstr}).limit(1)
                    await mysql("applysforstudent").increment('ordercount', 1).where({openid:goods_openid, randomstr}).limit(1)
                    
                }
                if(usertype == 'teacher'){
                    await mysql("user_teachers").update({beenordered:1, recieveorder:0,}).where({openid:goods_openid}).limit(1)
                    await mysql("user_teachers").increment('ordercount', 1).where({openid:goods_openid}).limit(1)
                }
                console.log('------------order------------');
                console.log(order);
                console.log('------------order end ------------ ');
                if(order){
                    let { total_fee, wxpayconfirmed, status } = order
                    if(wxpayconfirmed || parseInt(status) >= 4 ){
                        // 已收到过通知已确认过
                    }else{
                        if(total_fee == data['total_fee'][0]){
                            // 4.校验通过 金额正确 订单状态修改 
                            await mysql("orders").update({status:4, wxpayconfirmed:1,transaction_id}).where({orderid, openid})
                        }else{
                            // 金额不对
                            console.log('!!!warning!!!金额不对!!!');
                        }
                    }
                    return ctx.body = `<xml>
                        <return_code><![CDATA[SUCCESS]]></return_code>
                        <return_msg><![CDATA[OK]]></return_msg>
                    </xml>`
                }else{
                    return ctx.body = `<xml>
                        <return_code><![CDATA[FAIL]]></return_code>
                        <return_msg><![CDATA[数据没有查到该订单]]></return_msg>
                    </xml>`
                }
            }else{
                return ctx.body = "fuck you son of bitch."
            }
        }else{
            var res = await mysql("wxnotification").insert( {data: '微信通知结果解析失败' } )
            console.log(res);
            return ctx.body = `<xml>
                <return_code><![CDATA[FAIL]]></return_code>
                <return_msg><![CDATA[XML解析失败]]></return_msg>
            </xml>`
        }
    }catch(e){
        console.log('getwxnotification error :',e);
        return ctx.body = `<xml>
            <return_code><![CDATA[FAIL]]></return_code>
            <return_msg><![CDATA[XML解析失败]]></return_msg>
        </xml>`
    }
}

const get = async function (ctx, next) {
    let data = ctx.query // ctx.query
    return ctx.body = `<xml>
        <return_code><![CDATA[SUCCESS]]></return_code>
        <return_msg><![CDATA[OK]]></return_msg>
    </xml>`
}

// savenotification()
module.exports = {
    get,post
}