const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud
const { payconf } = require('../config.js');
var crypto = require('crypto');

// 短信模块
const sendmsg = require('../wxsms/index.js')

/* <xml>
<appid><![CDATA[wxcad3341551190ad3]]></appid>
<bank_type><![CDATA[CFT]]></bank_type>
<cash_fee>6</cash_fee>
<fee_type><![CDATA[CNY]]></fee_type>
<is_subscribe><![CDATA[N]]></is_subscribe>
<mch_id><![CDATA[1525651531]]></mch_id>
<nonce_str><![CDATA[M0L5G995RP6S]]></nonce_str>
<openid><![CDATA[ozB_j5POSuDssaHEvAeyPKc6wKZM]]></openid>
<out_trade_no><![CDATA[1902143944601OQNN]]></out_trade_no>
<result_code><![CDATA[SUCCESS]]></result_code>
<return_code><![CDATA[SUCCESS]]></return_code>
<sign><![CDATA[1229B41E0C5CED87A432259850766638]]></sign>
<time_end><![CDATA[20190214094317]]></time_end>
<total_fee>6</total_fee>
<trade_type><![CDATA[JSAPI]]></trade_type>
<transaction_id><![CDATA[4200000266201902143240990123]]></transaction_id>
</xml>     */
// 字段顺序：
//   appid: [ 'wxcad3341551190ad3' ],
//   bank_type: [ 'CFT' ],
//   cash_fee: [ '6' ],
//   fee_type: [ 'CNY' ],
//   is_subscribe: [ 'N' ],
//   mch_id: [ '1525651531' ],
//   nonce_str: [ 'M0L5G995RP6S' ],
//   openid: [ 'ozB_j5POSuDssaHEvAeyPKc6wKZM' ],
//   out_trade_no: [ '1902143944601OQNN' ],
//   result_code: [ 'SUCCESS' ],
//   return_code: [ 'SUCCESS' ],
//   sign: [ '1229B41E0C5CED87A432259850766638' ],
//   time_end: [ '20190214094317' ],
//   total_fee: [ '6' ],
//   trade_type: [ 'JSAPI' ],
//   transaction_id: [ '4200000266201902143240990123' ]
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
                let phone = goodsinfo.phone
                let goods_openid = goodsinfo.openid
                console.log('usertype: ');
                console.log(usertype);
                
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
                            
                            // 短信通知
                            // ["学员,13814878111", "老师,13611127777", "初一-数学", "2019年3月19日10:58:16"]
                            let buyerinfo = await mysql("cSessionInfo").first().where({open_id:openid})
                            let buyerphone = buyerinfo.phone
                            var buyerusertype = '普通用户'
                            if(buyerinfo.usertype == 'normal'){
                                buyerusertype = '普通用户'
                            }else if(buyerinfo.usertype == 'student'){
                                buyerusertype = '学员'
                            }else if(buyerinfo.usertype == 'teacher'){
                                buyerusertype = '老师'
                            }else {
                                buyerusertype = '普通用户'
                            }
                            var salerusertype = '普通用户'
                            if(usertype == 'normal'){
                                salerusertype = '普通用户'
                            }else if(usertype == 'student'){
                                salerusertype = '学员'
                            }else if(usertype == 'teacher'){
                                salerusertype = '老师'
                            }else {
                                salerusertype = '普通用户'
                            }
                            sendmsg([ 
                                buyerusertype+' '+buyerphone, 
                                salerusertype+' '+ phone,
                                goodsinfo.course,
                                order._createtime
                            ],'yuyue')


                            if(usertype == 'student'){
                                var randomstr = goodsinfo.randomstr
                                await mysql("user_students").update({beenordered:1, recieveorder:0,}).where({openid:goods_openid, randomstr}).limit(1)
                                await mysql("user_students").increment('ordercount', 1).where({openid:goods_openid, randomstr}).limit(1)
                                
                            }
                            if(usertype == 'teacher'){
                                await mysql("user_teachers").update({beenordered:1, recieveorder:0,}).where({openid:goods_openid}).limit(1)
                                await mysql("user_teachers").increment('ordercount', 1).where({openid:goods_openid}).limit(1)
                            }
                            
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