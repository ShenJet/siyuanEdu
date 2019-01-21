// 打开地图 选择位置
const chooselocation = () => {
    return new Promise(function(resolve, reject){
        wx.chooseLocation( {
            success(res) {
                // name address 纬度latitude 经度longitude
                // console.log('选了：',res);
                
                resolve(res)
            },
            fail:function(){
                resolve(false)
            },
            complete:function(){
                wx.hideLoading()
            }
        } )
    }) 

}
export default chooselocation