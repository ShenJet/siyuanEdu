const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
    try {
        let params = ctx.query
        console.log('params:');
        console.log(params);
        let { price, role } = params
        price = parseFloat(price)
        if(role === 'teacher'){
            var obj = {
                teacher: price
            }
        }else if(role === 'student'){
            var obj = {
                student: price
            }
        }else{
            return ctx.body = {
                code:0,
                success:false,
                msg:"参数错误，操作失败",
                data:null
            }
        }
        console.log('obj:');
        console.log(obj);
        
        let res = await mysql('price').update( obj )

        return ctx.body = {
            code:"PRICE_MODIFY_SUCCESS",
            success: true,
            msg: "价格修改成功",
            data: res
        }
    } catch (error) {
        console.log(error);
        
        return ctx.body = {
            code:0,
            success:false,
            msg:"价格修改失败",
            data:[]
        }
    }
}
