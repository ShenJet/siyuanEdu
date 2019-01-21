
const openSetting =  (option) => {
    return new Promise(function(resolve, reject){
        wx.openSetting( {
            success(res) {
                resolve(res.authSetting)
            },
            fail(){
                resolve(null)
            }
        } )
    }) 

}
export default openSetting