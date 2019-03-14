<template>
  <div class="container">
    <div class="head">
      <div class="avatar">
        <!-- <img src="/static/code.jpg" @click='preview'  alt="二维码"> -->
        <!-- mode='aspectFill' -->
        
      </div>
      
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
      origin:''
    };
  },
  components: {
  },
  methods: {
    
    routeToHome() {
      let url = "/pages/index/main";
      wx.switchTab({ url });
    },
    toqqmap() {
      if(!this.studentdetail.longitude || !this.studentdetail.latitude){
        return wx.showToast({
          title:'该商品未添加定位',
          duration: 1500,
          icon:'none'
        })
      }
      wx.navigateTo({
        url:`/pages/qqmap/main?longitude=${this.studentdetail.longitude}&latitude=${this.studentdetail.latitude}`
      })
    },
    jointocollect(){
      // console.log("studentdetail jointocollect");
      var self = this;
      // 做本地存储
      let student_collect = wx.getStorageSync('student_collect') || []
      for (let index = 0; index < student_collect.length; index++) {
        const v = student_collect[index];
        if(v.openid == self.studentdetail.openid && v.randomstr == self.studentdetail.randomstr){
          return wx.showToast({
            title:'添加成功',
            duration: 1800
          })
        }
      }
      student_collect.unshift(self.studentdetail)
      wx.setStorage({
        key: 'student_collect',
        data: student_collect
      })
      return wx.showToast({
        title:'添加成功',
        duration: 1800
      })
    },
    touserinfo(){
      var url = '/pages/userinfo/main'
      wx.navigateTo({
        url
      })
    },
    confirmphone(){
      var self = this
      wx.showLoading({
        title: 'Loading...',
      })
      // 用户信息确认
      qc.request({
        url: conf.service.confirmphone,
        data:{},
        success:async function(res) {
          wx.hideLoading();
          if(res.data.success){
            self.paynow()
          }else{
            self.touserinfo()
          }
        },
        fail: function(err) {
          wx.showToast({
              title: '通信失败,请检查网络', 
              duration: 2000,
              icon:'none',
              mask:true
          })

        },
        complete:function(){
          // wx.hideLoading();
        }
      });
    
    },
    paynow(){
      var self = this
      wx.showLoading({
        title: 'Loading...',
      })
      // 统一下单 生成订单号
      qc.request({
        url: conf.service.prepayUrl,
        method:"POST",
        data:{
          id: self.studentdetail.openid,
          type:'student',
          randomstr: self.studentdetail.randomstr
        },
        success:async function(res) {
          wx.hideLoading();
          if(res.data.success){
            let payres = await wxpay( res.data.data );
            console.log(payres);
            if(payres.errMsg == 'requestPayment:ok'){
              // 前端订单支付完成 等待商家核验（等待微信通知回调） 
              wx.showToast({
                title: '支付成功', 
                duration: 1500,
                icon:'success',
                mask:true,
                complete:function(){
                  setTimeout(function(){
                    wx.navigateTo({
                      url:"/pages/orderlist/main?index=0"
                    })
                  },1500)
                }
              })
            }else{
              wx.showToast({
                title: '支付失败',
                 duration: 1500,
                  icon:'none',
                  mask:true ,
                  complete:function(){
                    setTimeout(function(){
                      wx.navigateTo({
                        url:"/pages/orderlist/main?index=0"
                      })
                    },1500)
                  }
              })
            }
          }else{
            wx.showToast({
              title: "系统错误，请重新下单",
              icon: 'none',
              duration: 2000,
              complete:function(){
                setTimeout(function(){
                  // wx.navigateBack({
                  //   delta: 1
                  // })
                },2000)
              }
            })
          }
        },
        fail: function(err) {
          // console.log(err);
          // console.log('支付流程结束，支付失败~')
          // wx.hideLoading();
          wx.showToast({
              title: '下单失败,请检查网络', 
              duration: 2000,
              icon:'none',
              mask:true
          })

          
        },
        complete:function(){
          // wx.hideLoading();
        }
      });
    }
  },
  onLoad(){
    wx.showShareMenu({
      withShareTicket: true
    })
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

<style scoped lang='scss'>
$maincolor: #377BF0;

</style>