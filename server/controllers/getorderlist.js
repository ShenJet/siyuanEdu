const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    
    // STEP1 用户校验
    console.log(ctx.state.$wxInfo);


    if(!ctx.state.$wxInfo || ctx.state.$wxInfo.loginState !== 1 ){
        return ctx.body = {
            code:0,
            data:[],
            success:false,
            msg:"用户尚未登录"
        }
        
    }
    // STEP2 订单类别提取
    let param = ctx.query.state ;
    let openid = ctx.state.$wxInfo.userinfo.openId ;
    var status = 'all'
    switch (param) {
        case 'all':
            status = 'all'
            break;
        default:
            break;
    }
    // STEP3 查询+返回
    try {
        if(status=='all'){
            var res = await mysql('orders').select('orderid','goodsinfo','total_fee','status','_createtime','_endtime').where({ openid }).whereNot('deleted', '1').orderBy('id', 'desc') ;
        }else{
            var res = await mysql('orders').select('orderid','goodsinfo','total_fee','status','_createtime','_endtime').where({ status, openid }).whereNot('deleted', '1').orderBy('id', 'desc');
        }
        res.map(function(v,i){
            v.goodsinfo = JSON.parse(v.goodsinfo)
            for (const key in v.goodsinfo) {
                if (v.goodsinfo.hasOwnProperty(key)) {
                    delete v.goodsinfo.phone
                    delete v.goodsinfo.id
                    if(v.goodsinfo.usertype == 'teacher'){
                        v.goodsinfo.name = v.goodsinfo.name.substring(0,1)+'老师'
                    }else{
                        v.goodsinfo.name = v.goodsinfo.name.substring(0,1)+'同学'
                    }
                }
            }
        })
        ctx.body = {
            code:1,
            success:true,
            msg:"订单列表获取成功",
            data:res
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
