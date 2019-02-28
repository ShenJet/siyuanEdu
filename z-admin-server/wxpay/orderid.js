/**
 * long description for the file
 *
 * @summary 订单号生成
 * @author Shen Jie
 *
 * Created at     : 2018-12-18 16:39:12 
 * Last modified  : 2018-12-19 13:41:04
 */

const generateOrderId = function(){
    // 规则：日期 + 随机6位数 + 时间戳后4位 + openid
    let now = new Date()
    
    // 181218 6位日期
    let part1 = now.toISOString().substr(2, 8).split('-').join('')
    
    // 2427   4位随机数
    let part2 = Math.floor(Math.random()*(9999-1000)+1000)
    
    // 086    3位毫秒数
    let part3 = (now.getTime()+'').substr(-3,3)
    
    //        4位36进制随机数
    let part4 = Math.random().toString(36).substr(-4,4).toUpperCase()
    
    let res = part1 + part2 + part3 + part4

    // console.log(part1);
    // console.log(part2);
    // console.log(part3);
    // console.log(part4);
    // console.log(res);
    // 共17位
    return res
}
// generateOrderId()
module.exports = generateOrderId