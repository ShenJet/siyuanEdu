/**
 * 客户端支付了，通知服务端。
 * @summary short description for the file
 * @author Shen Jie
 *
 * Created at     : 2018-12-19 12:40:16 
 * Last modified  : 2018-12-19 15:53:48
 */
import qc from 'wafer2-client-sdk'
import conf from '@/config'

const clientpaid = async ( x ) => {
    // console.log(...x);
    // console.log('客户端支付了，通知服务端');
    let res = await new Promise(function(resolve, reject){
        qc.request({
            url: conf.service.clientpaidUrl,
            data:{
                timeStamp:x.timeStamp, //: '1545065922',
                nonceStr:x.nonceStr, //:"95GQTD8OCKFC",
                package:x.package, //:'prepay_id=wx18005843135707252a0c67430768776579',
                paySign:x.paySign, //:'DD32FD592AF142FA6E330DC236EBA968'
                signType:"MD5",
                prepay_id:x.prepayId
            },
            success:function(res){
                resolve(res)
            },
            fail:function(err){
                resolve(err)
            }
        })
    })

    return res 
}
export default clientpaid ;