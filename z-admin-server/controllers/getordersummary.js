const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    try {
        var newday = new Date()
        var stamp = newday.getTime()
        var day = newday.getDay()
        var date = newday.getDate()
        var month = newday.getMonth()
        var year = newday.getFullYear()

        console.log('newday:',newday);
        console.log('stamp:',stamp);
        console.log('day:',day);
        console.log('month:',month);
        console.log('year:',year);
        
        var today = new Date(year, month, date)
        var todaystart = today.getTime()
        var todayend = todaystart + 24*3600*1000

        var week = new Date(year, month, date - day + 1)
        var weekstart = week.getTime()
        var weekend = weekstart + 7*24*3600*1000

        var thismonth = new Date(year, month, 1)
        var thismonthstart = thismonth.getTime()

        var nextmonth = new Date(year, month+1, 1)
        var thismonthend = nextmonth.getTime()
        console.log(
            todaystart,
            todayend,
            weekstart,
            weekend,
            thismonthstart,
            thismonthend    
        );
        
        let todayorderlist = await mysql('orders').select().where({
            status:4,
            wxpayconfirmed:1
        }).whereBetween('createtime', [todaystart, todayend]).sum( 'total_fee as money' ).count('id as count')



        let weekorderlist = await mysql('orders').select().where({
            status:4,
            wxpayconfirmed:1
        }).whereBetween('createtime', [weekstart, weekend]).sum( 'total_fee as money' ).count('id as count')


        let monthorderlist = await mysql('orders').select().where({
            status:4,
            wxpayconfirmed:1
        }).whereBetween('createtime', [thismonthstart, thismonthend]).sum( 'total_fee as money' ).count('id as count')

        console.log(
            todayorderlist,
            weekorderlist,
            monthorderlist
        );
        

        return ctx.body = {
            code:1,
            success:true,
            msg:"订单列表获取成功",
            data:{
                daycount: todayorderlist[0].count,
                daymoney: todayorderlist[0].money || 0,
                weekcount: weekorderlist[0].count,
                weekmoney: weekorderlist[0].money || 0,
                monthcount: monthorderlist[0].count,
                monthmoney: monthorderlist[0].money || 0
            }
        }
    } catch (error) {
        console.log(error);
        return ctx.body = {
            code:0,
            data:[],
            success:false,
            msg:"订单列表获取失败"
        }
    }
    
}
