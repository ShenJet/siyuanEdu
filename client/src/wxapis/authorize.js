// 请求授权 https://developers.weixin.qq.com/miniprogram/dev/api/wx.authorize.html
// scope	                对应接口	        	                                 描述
// scope.userInfo	        wx.getUserInfo		                                    用户信息
// scope.userLocation	    wx.getLocation, wx.chooseLocation		                地理位置
// scope.address	        wx.chooseAddress		                                通讯地址
// scope.invoiceTitle	    wx.chooseInvoiceTitle		                            发票抬头
// scope.invoice	        wx.chooseInvoice		                                获取发票
// scope.werun	            wx.getWeRunData		                                    微信运动步数
// scope.record	            wx.startRecord	                                        录音功能
// scope.writePhotosAlbum	wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum	保存到相册
// scope.camera	            <camera /> 组件	                                         摄像头

const authorize =  (x,refuseFn) => {
    return  new Promise(function(resolve, reject){
        wx.authorize({
            scope:x,
            success(res) {
                // 用户已经同意
                resolve(res)
            },
            fail: (err) => {
                resolve(err)
            },
            complete: (e) => {
                wx.hideLoading()
            }
        })
    })
};

export default authorize;
