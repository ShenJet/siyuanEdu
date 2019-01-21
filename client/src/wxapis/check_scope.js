// 授权检查
// res.authSetting = {
//   "scope.userInfo": true,
//   "scope.userLocation": true
// }

const checkscope = x => {
    return new Promise(function(resolve, reject){
        wx.getSetting({
            success(res) {
                // console.log(res.authSetting[x]);
                resolve(res.authSetting[x])
            },
            fail: (err) => {
                reject(err)
            },
            complete: (e) => {
                wx.hideLoading()
            }
        })
    })
};

export default checkscope;
