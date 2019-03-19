// 准备必要参数和实例化QcloudSms
const QcloudSms = require("../wxsmslib/index.js");
const wxsmsconf = require("../config.js").wxsmsconf;
var sha256 = require("crypto-js/sha256");

const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

const sendmsg = async function (smsparams) {
    // 短信应用SDK AppID
    const appid = wxsmsconf.appid;  // SDK AppID是1400开头

    // 短信应用SDK AppKey
    const appkey = wxsmsconf.appkey;

    // 需要发送短信的手机号码
    // const phoneNumbers = wxsmsconf.phoneNumbers ;
    var phonequery = await mysql('smsphones').select('phone').where({ inuse: 1 });

    if(!phonequery.length || !phonequery){
        var phoneNumbers = [18112528156]
    }else{
        var phoneNumbers = []
        for (let index = 0; index < phonequery.length; index++) {
            const element = phonequery[index];
            phoneNumbers.push( element.phone )
        }
    }
    if(!phonequery.length || !phonequery){
        var phoneNumbers = [18112528156]
    }
    // return console.log(phoneNumbers);


    // 短信模板ID，需要在短信应用中申请
    // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
    const templateId = wxsmsconf.templateId;

    // 签名// NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`
    const smsSign = wxsmsconf.smsSign;

    // 实例化QcloudSms
    const qcloudsms = QcloudSms(appid, appkey);

    // 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
    function callback(err, res, resData) {
        if (err) {
            console.log("err: ", err);
        } else {
            console.log("request data: ", res.req);
            console.log("response data: ", resData);
        }
    }


    // 组装sig
    // var strMobile = "13788888888,13788888889"; //tel 的 mobile 字段的参数值以 "," 分割
    // var strAppKey = "5f03a35d00ee52a21327ab048186a2c4"; //sdkappid 对应的 appkey，需要业务方高度保密
    // var strRand = "7226249334"; //url 中的 random 字段的值
    // var strTime = "1457336869"; //UNIX 时间戳
    // var sig = sha256("appkey=5f03a35d00ee52a21327ab048186a2c4&random=7226249334&time=1457336869&mobile=13788888888,13788888889") ;
    // 'be66bb4aeb54701ed0637d0996a0b75111d5b8eda9b3a71bdc579a3d26f3edfb';
    const strMobile = phoneNumbers.join(',');
    const strAppKey = appkey;
    const strRand = Math.floor(Math.random() * (99999999 - 10000000) + 10000000)
    const strTime = new Date().getTime()
    const sig = sha256(`appkey=${strAppKey}&random=${strRand}&time=${strTime}&mobile=${strMobile}`)
    console.log(sig);

    // 单发短信
    // var smsType = 0; // Enum{0: 普通短信, 1: 营销短信}
    // var ssender = qcloudsms.SmsSingleSender();
    // ssender.send(smsType, 86, phoneNumbers[0], "【腾讯云】您的验证码是: 5678", "", "", callback); 

    // 群发
    // let smsType = 0;  // Enum{0: 普通短信, 1: 营销短信}
    // let msender = qcloudsms.SmsMultiSender();
    // msender.send(smsType, "86", phoneNumbers, "【腾讯云】您的验证码是: 5678", "", "", callback);

    // 指定模板ID群发
    var msender = qcloudsms.SmsMultiSender();
    // var params = ["学员13814878111", "老师11111122222", "数学", "2019年3月19日10:58:16"];
    // // msender.sendWithParam("86", phoneNumbers, templateId, params, smsSign, "", "", callback);
    // // 签名参数未提供或者为空时，会使用默认签名发送短信
    msender.sendWithParam("86", phoneNumbers, templateId, smsparams, '', "", "", callback);
    // Note 群发一次请求最多支持200个号码，如有对号码数量有特殊需求请联系腾讯云短信技术支持(QQ:3012203387)。
}
// sendmsg(["学员,13814878111", "老师,13611127777", "初一-数学", "2019年3月19日10:58:16"])
module.exports = sendmsg