
var xmlreader = require("xmlreader");
var fs = require("fs");
 
 
var wxpay = {
 
    //把金额转为分
    getmoney: function (money) {
        console.log("money:",money);
        console.log("parseFloatmoney:",parseFloat(money));
        console.log(parseFloat(money) * 10 * 10);
        
        return parseFloat(money) * 10 * 10;
    },
 
    // 随机字符串产生函数  
    randomstr : len => {
        let res = ''
        let source = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'] ;
        for(let i=0;i<len;i++){
            res += source[Math.floor(Math.random()*source.length)]
        }
        return res
    },
 
    // 时间戳产生函数   单位：秒
    createTimeStamp: function () {
        return parseInt(new Date().getTime() / 1000) + '';
    },
 
    //签名加密算法
    paysignjsapi: function (appid, body, mch_id, nonce_str, notify_url, out_trade_no, spbill_create_ip, total_fee, trade_type, mchkey, openid) {
        var ret = {
            appid: appid,
            mch_id: mch_id,
            nonce_str: nonce_str,
            body: body,
            notify_url: notify_url,
            out_trade_no: out_trade_no,
            spbill_create_ip: spbill_create_ip,
            total_fee: total_fee,
            trade_type: trade_type,
            openid: openid
        };
        // console.log('ret==', ret);
        var string = raw(ret);
        var key = mchkey;
        string = string + '&key=' + key;
        // console.log('string=', string);
        var crypto = require('crypto');
        return crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase();
    },
    //签名加密算法,第二次的签名
    paysignjsapifinal: function (appid,mch_id,prepayid,noncestr,timestamp,mchkey) {
        var ret = {
            appId: appid,
            // partnerid: mch_id,
            // prepayid: prepayid,
            signType:"MD5",
            package: 'prepay_id=' + prepayid,
            nonceStr: noncestr,
            timeStamp: timestamp,
        };
        // console.log('retretret==', ret);
        var string = raw(ret);
        var key = mchkey;
        string = string + '&key=' + key;
        // console.log('stringstringstring=', string);
        var crypto = require('crypto');
        return crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase();
    },
    getXMLNodeValue: function (xml) {
        // var tmp = xml.split("<"+node_name+">");
        // console.log('tmp',tmp);
        // var _tmp = tmp[1].split("</"+node_name+">");
        // console.log('_tmp',_tmp);
        // return _tmp[0];
        xmlreader.read(xml, function (errors, response) {
            if (null !== errors) {
                console.log(errors)
                return;
            }
            console.log('长度===', response.xml.prepay_id.text().length);
            var prepay_id = response.xml.prepay_id.text();
            console.log('解析后的prepay_id==',prepay_id);
            return prepay_id;
        });
    }
 
}
function raw(args) {
    var keys = Object.keys(args);
    keys = keys.sort()
    var newArgs = {};
    keys.forEach(function (key) {
        newArgs[key] = args[key];
    });
    var string = '';
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
}
 
module.exports = wxpay