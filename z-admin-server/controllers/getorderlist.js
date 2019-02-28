const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    try {
        let params = ctx.query ;
        var { pageindex, start, end } = params

        pageindex = pageindex?pageindex:'1' ;
        start = start?start:new Date().getTime()
        end = end?end:start + 86400000

        if(start > end){
            return ctx.body = {
                code:"ORDERLIST_GET_FAILED",
                success:false,
                msg:"开始日期不可大于结束日期",
                data:{}
            }
        }
        console.log(start, end);
        

        var res = await mysql('orders')
        // .select().whereBetween('createtime', [start, end]) 
        .select().where({status: 4, wxpayconfirmed: 1}).whereBetween('createtime', [start, end])
        .limit(10).offset(10* (pageindex - 1))
        
        var count = await mysql('orders').where({status: 4, wxpayconfirmed: 1}).whereBetween('createtime', [start, end]).count('id as count')

        
        res.map(function(v,i){
            v.goodsinfo = JSON.parse(v.goodsinfo)
            if(v.goodsinfo.usertype == 'student'){
                v.goodsinfo.teachtype = JSON.parse(v.goodsinfo.teachtype)
                v.goodsinfo.teachday = JSON.parse(v.goodsinfo.teachday)
            }else if(v.goodsinfo.usertype == 'teacher'){
                v.goodsinfo.teachtype = JSON.parse(v.goodsinfo.teachtype)
                v.goodsinfo.teacharea = JSON.parse(v.goodsinfo.teacharea)
                v.goodsinfo.teachday = JSON.parse(v.goodsinfo.teachday)
                v.goodsinfo.comment = JSON.parse(v.goodsinfo.comment)
            }
        })
        return ctx.body = {
            code:'ORDERLIST_GET_SUCCESS',
            success:true,
            msg:"订单列表获取成功",
            data:res,
            count: count
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
