
const modal = async (option) => {

    let x = Object.assign({title:'提示'},option)
    return new Promise(function(resolve, reject){
        wx.showModal( {
            ...x,
            success(res) {
                if (res.confirm) {
                    resolve(true)
                } else if (res.cancel) {
                    resolve(false)
                }
            }
        } )
    }) 

}
export default modal