/**
 * https://developers.weixin.qq.com/miniprogram/dev/api/wx.requestPayment.html
 * https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_3&index=1
 * 有点复杂 需要通读API
 * @summary short description for the file
 * @author Shen Jie
 *
 * Created at     : 2018-12-19 12:40:16 
 * Last modified  : 2018-12-19 15:53:48
 */

const wxpay = async ( x ) => {
    // {timeStamp, nonceStr,package,paySign}
    // console.log(...x);
    // console.log('调起支付');
    
    let res = await new Promise(function(resolve, reject){
        wx.requestPayment({
            timeStamp:x.timeStamp, //: '1545065922',
            nonceStr:x.nonceStr, //:"95GQTD8OCKFC",
            package:x.package, //:'prepay_id=wx18005843135707252a0c67430768776579',
            paySign:x.paySign, //:'DD32FD592AF142FA6E330DC236EBA968'
            signType:"MD5",
            success:function(res){
                // console.log('success');
                resolve(res)
            },
            fail:function(err){
                // console.log('fail');
                resolve(err)
            }
        })
    })

    return res 
}
export default wxpay ;