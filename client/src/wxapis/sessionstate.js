// 检查登录态是否过期。

const checkSession = async (x) => {
    return await new Promise(function(resolve, reject){
        wx.checkSession({
            scope:x,
            success(res) {
                // 用户已经同意
                resolve(true)
            },
            fail: (err) => {
                resolve(false)
            }
        })
    })
};

export default checkSession;
