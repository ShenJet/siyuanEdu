
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

		// 查询用户手机号
		let query = await mysql('cSessionInfo').first('phone').where({ open_id: openid })
		if(query && query.phone){
			return ctx.body = {
				code: 1,
				success: true,
				data: null,
				msg:"获取成功"
			}
		}else{
			return ctx.body = {
				code: 0,
				success: false,
				data: null,
				msg:"获取失败，用户未设置手机号"
			}
		}
		
	} catch (error) {
		console.log(error);
		return ctx.body = {
			code: 0,
			success: false,
			data: null,
			msg:"系统错误，请重新操作"
		}
		
	}



}

