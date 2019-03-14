var WXBizDataCrypt = require('../wxpay/WXBizDataCrypt')
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
		
		if(!params.encryptedData || !params.iv){
			return ctx.body = {
				code: 0,
				success: false,
				data:null,
				msg:"获取失败，请手动输入"
			}
		}
		let query = await mysql('cSessionInfo').first('session_key').where({ open_id: openid })
		let sessionKey = query.session_key
		if(!sessionKey){
			return ctx.body = {
				code: 0,
				success: false,
				data: null,
				msg:"系统错误，请手动输入",
				reason:"sessionKey错误"
			}
		}
		console.log('sessionKey:');
		console.log(sessionKey);
		console.log('-----------');
		
		let appId = configs.appId
		let { encryptedData, iv } = params
		let pc = new WXBizDataCrypt(appId, sessionKey)
		if(!pc){
			return ctx.body = {
				code: 0,
				success: false,
				data: null,
				msg:"系统错误，请手动输入"
			}
		}
		let data = pc.decryptData(encryptedData , iv)
		console.log(data);
		if(!data){
			return ctx.body = {
				code: 0,
				success: false,
				data: null,
				msg:"系统错误，请手动输入"
			}
		}
		// 解密后的数据为
		//
		// data = {
		//   "nickName": "Band",
		//   "gender": 1,
		//   "language": "zh_CN",
		//   "city": "Guangzhou",
		//   "province": "Guangdong",
		//   "country": "CN",
		//   "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
		//   "unionId": "ocMvos6NjeKLIBqg5Mr9QjxrP1FA",
		//   "watermark": {
		//     "timestamp": 1477314187,
		//     "appid": "wx4f4bc4dec97d474b"
		//   }
		// }

		// 更新用户手机号
		await  mysql('cSessionInfo').update({ phone: data.phoneNumber }).where({ open_id: openid })

		return ctx.body = {
			code: 1,
			success: true,
			data: data,
			msg:"获取成功，请提交"
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

