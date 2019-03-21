<template>
  <div class="container">
    <div class="head">支付金额</div>
    <div class="main">
      <div class="l">￥</div>
      <div class="r">
        <input type="digit" v-model='fee' focus=true @input="inputing">
      </div>
    </div>
    <div class="spacing"></div>
    <div class="beizhu">
      <div class="up" @click="togglebeizhu">添加支付备注</div>
      <div class="down" v-show='showbeizhu'>
        <textarea v-model="beizhu" placeholder="支付备注..." class="textarea" id=""></textarea>
      </div>
    </div>
    <div class="btm">
      <button class='paybtn' hover-class='paybtnhover' type="primary" :disabled="btndisable"
      @click="paynow">确定支付</button>
    </div>
  </div>
</template>
<script>
import checkscope from "@/wxapis/check_scope";
import authorize from "@/wxapis/authorize";
import openSetting from "@/wxapis/openSetting";
import chooselocation from "@/wxapis/chooselocation";
import modal from "@/wxapis/modal";
import qc from 'wafer2-client-sdk'
import conf from '@/config'
import wxpay from '@/wxapis/wxpay'


export default {
  data() {
    return {
      userInfo: {},
      location: "尚未获取定位",
      studentdetail: {},
      count:1,
      goodsid:'',
      origin:'',
      fee:'',
      beizhu:'',
      showbeizhu:false,
      btndisable: true
    };
  },
  components: {
  },
  methods: {
    inputing(e){
      console.log(e.mp.detail.value);
      var fee = parseFloat(e.mp.detail.value)
      console.log(fee);

      if(fee && fee > 0){
        this.btndisable = false
      }else{
        this.btndisable = true
      }
    },
    togglebeizhu(){
      this.showbeizhu = !this.showbeizhu
    },
    paynow(){
      this.btndisable = true
      if(!this.fee || this.fee <= 0){
        this.btndisable = false
        return wx.showToast({
                title: '请输入大于0的正确金额', 
                duration: 1800,
                icon:'none',
                mask:true
              })
      }
      var self = this
      wx.showLoading({
        title: 'Loading...',
      })
      // 统一下单 生成订单号
      qc.request({
        url: conf.service.custompayUrl,
        method:"POST",
        data:{
          fee: parseFloat(self.fee),
          beizhu: self.beizhu
        },
        success:async function(res) {
          self.btndisable = false
          wx.hideLoading();
          if(res.data.success){
            let payres = await wxpay( res.data.data );
            console.log(payres);
            if(payres.errMsg == 'requestPayment:ok'){
              // 前端订单支付完成 等待商家核验（等待微信通知回调） 
              wx.showToast({
                title: '支付成功，已通知管理员', 
                duration: 1500,
                icon:'success',
                mask:true,
              })
            }else{
              wx.showToast({
                title: '支付失败，请重新操作',
                 duration: 1500,
                  icon:'none',
                  mask:true
              })
            }
          }else{
            wx.showToast({
              title: "系统错误，请重新操作",
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: function(err) {
          self.btndisable = false
          // console.log(err);
          // console.log('支付流程结束，支付失败~')
          // wx.hideLoading();
          wx.showToast({
              title: '操作失败,请检查网络', 
              duration: 2000,
              icon:'none',
              mask:true
          })

          
        },
        complete:function(){
          self.btndisable = false
          // wx.hideLoading();
        }
      });
    }
  },
  onLoad(){
    // wx.showShareMenu({
    //   withShareTicket: true
    // })
  },
  onShow(){
    // 判断登录
    let loginstate = this.globalData.loginstate;
    if(!loginstate){
      return wx.showToast({
        title:'用户尚未登录，请先登录',
        duration: 1800,
        icon:'none',
        mask: true,
        complete(){
          setTimeout(function(){
            let url = `/pages/my/main`
            wx.switchTab({
              url
            })
          },1900)
        }
      })
    }

    
  }
};
</script>
<style>
page {
    background-color: rgb(237,237,237);
    padding: 30rpx;
    box-sizing: border-box;
}
</style>

<style scoped lang='scss'>
$maincolor: #377BF0;
page {
    background-color: rgb(237,237,237);
}
.container{
  background: rgb(255,255,255);
  padding: 30rpx;
  .main{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .l{
      font-size: 80rpx;
      height: 120rpx;
      // background-color: pink;
      
    }
    .r{
      font-size: 80rpx;
      height: 120rpx;
      // background-color: yellowgreen;
      input{
        // background-color: blue;
        font-size: 80rpx;
        // display: block;
        height: 120rpx;
      }
    }
  }
  .spacing{
    height: 1rpx;
    margin: 15rpx 0 30rpx;
    background-color: rgb(237,237,237);
  }
  .beizhu{
    .up{
      color: rgb(69,76,89);
      font-size: 30rpx;
    }
    .down{
      padding-bottom: 20rpx;
      border-bottom: 1rpx solid rgb(237,237,237);
      margin-bottom: 30rpx;
      textarea{
        border: 1rpx solid rgb(237,237,237);
        width: 100%;
        border-radius: 20rpx;
        height: 200rpx;
        font-size: 34rpx;
      }
    }
  }
  .btm{
    margin-top: 40rpx;
    margin-bottom: 100rpx;
    .paybtnhover{

    }
  }

}
</style>