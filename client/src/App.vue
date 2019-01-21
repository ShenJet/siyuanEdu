<script>
import qc from 'wafer2-client-sdk'
import config from '@/config'

export default {
  data:function(){
    return {
      appdata:"66666",
      logged:false,
      authmodalshowL:false
    }
  },
  
  methods:{
    
    
  },
  
  onLaunch(){
    // console.log('app onlunch');
    qc.setLoginUrl(config.service.loginUrl);  
  },
  onShow(obj){
    let shareTicket = obj.shareTicket || ''
    // console.log('shareTicket:',shareTicket);
    if(!shareTicket)return ;
    
    wx.getShareInfo({
      shareTicket,
      timeout: 1000,
      success(res){
        // console.log(res);
      } ,
      fail(err){

      } ,
      complete(){

      } ,
    }) 
  },
  onError(err){
    // console.log('app onerror:', err);
  }
}
</script>

<style>
.container {
  height: 100%;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; */
  
  box-sizing: border-box;
}

</style>
