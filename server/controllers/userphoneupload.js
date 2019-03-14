
const configs = require('../config')
const qcloud = require('wafer-node-sdk')(configs)
const { mysql } = qcloud

module.exports = async (ctx, next) => {
	try {
		let openid = ctx.state.$wxInfo.userinfo.openId ;
		if(!openid){
			return ctx.body = {
				code: -1,
				success: false,
				data:null,
				msg:"您尚未登录，请先登录"
			}
		}
		let params = ctx.request.body;
		console.log('params:');
		console.log(params);
		
		if(!params.chenghu || !params.phone || params.phone.length != 11 ){
			return ctx.body = {
				code: 0,
				success: false,
				data:null,
				msg:"参数有误，请检查后重新提交"
			}
		}
		

		// 更新用户手机号
		await  mysql('cSessionInfo').update({ phone: params.phoneNumber, chenghu: params.chenghu }).where({ open_id: openid })

		return ctx.body = {
			code: 1,
			success: true,
			data: null,
			msg:"提交成功，请返回重新预约"
		}
	} catch (error) {
		console.log(error);
		return ctx.body = {
			code: 0,
			success: false,
			data: null,
			msg:"系统错误，请手动输入"
		}
		
	}



}

