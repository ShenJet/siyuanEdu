<template>
  <div class="container">
    <div class="head">
      <div class="avatar">
        <img :src="studentdetail.avatar" mode='aspectFill' alt="老师头像">
      </div>
      <div class="title">{{studentdetail.name}}
        <img src='/static/img/nan.png' mode='aspectFill' v-if="studentdetail.sex == '男'" />
        <img src='/static/img/nv.png' mode='aspectFill' v-if="studentdetail.sex == '女'" />
      </div>
      <div class="view">
        <div class="r">
          被看过 {{studentdetail.viewcount}} 次
        </div>
      </div>
      <div class="brdesc">学员简介：{{studentdetail.applydesc}}</div>
      <div class="qqmap" @click='toqqmap'>
        <span class='iconfont icon-round position'></span>
        <span class='position'>{{studentdetail.citylabel}}</span>
      </div>
    </div>
    <!-- #f9ffea -->
    <!-- <div class="qqmap" @click='toqqmap'>老师位置 : </div> -->
    <div class="teachinfo">
      补课信息
    </div>
    <div class="detail">
      <div class="line">
        <div class="l">
          补课方式
        </div>
        <div class="r">
          {{studentdetail.teachtype}}
        </div>
      </div>
      <div class="line">
        <div class="l">
          所在年级
        </div>
        <div class="r">
          {{studentdetail.grade}}
        </div>
      </div>
      <div class="line">
        <div class="l">
          补课科目
        </div>
        <div class="r">
          {{studentdetail.coursename}}
        </div>
      </div>
      <div class="line">
        <div class="l">
          期望教龄
        </div>
        <div class="r">
          {{studentdetail.teachyear}} 年
        </div>
      </div>
      <div class="line">
        <div class="l">
          期望时间
        </div>
        <div class="r">
          <span class="iconfont icon-rili"></span>
          {{studentdetail.teachday}}
        </div>
      </div>
      <div class="line">
        <div class="l">
          具体时间
        </div>
        <div class="r">
          <span class="iconfont icon-time"></span>
          {{studentdetail.teachstarttime}} 至 {{studentdetail.teachendtime}} 
        </div>
      </div>
      <div class="line">
        <div class="l">
          信息核验
        </div>
        <div class="r">
          <span class="iconfont icon-yanzheng1"></span>
          已核验
        </div>
      </div>
      <div class="line">
        <div class="l">
          身份证
        </div>
        <div class="r">
          <span class="iconfont icon-shenfenzheng"></span>
          已证实
        </div>
      </div>
      <div class="line">
        <div class="l">
          学员概况
        </div>
        <div class="r">
          {{studentdetail.gaikuang}}
        </div>
      </div>
    </div>
    <div class="toptip">
      *预约下单后，您将获取学员的更全面信息，如：学员联系方式等。
      可以进入‘我的’->‘已支付’中查看具体信息。
    </div>
    <i-load-more tip="我是有底线的" :loading="false" />
    <div class="spacing"></div>
    
    <div class="foot" >
      <div class="item s part1">
        <div @click="routeToHome">
          <i class="iconfont icon-shouye"></i>
          前往首页
        </div>
        <div @click="contact">
          <!-- <i class="iconfont icon-dianhua"></i>
          联系商家 -->
        </div>
      </div>
      <div class="item b part4" hover-class="hoverbtn1" @click="jointocollect">
        添加收藏
      </div>
      <div class="item b part5" hover-class="hoverbtn" @click="confirmphone">立即预约</div>
    </div>
    <button class="share" open-type="share">
      <i class="iconfont icon-fenxiang-copy"></i>
    </button>
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

    let openid = this.$root.$mp.query.openid
    let randomstr = this.$root.$mp.query.randomstr
    
    if(!openid || !randomstr){
      return wx.showToast({
        title:'学员信息有误，请返回重新选择',
        icon:'none',
        duration: 2000
      })
    }
    
    var self = this;
      qc.request({
        url: conf.service.studentdetailUrl,
        // method:"POST",
        data:{
          openid, randomstr
        },
        success:function(res) {
          wx.hideLoading()
          self.studentdetail = res.data.data
        },
        fail(){
          wx.showToast({
            title:"获取学员信息失败，请检查网络",
            duration:1500
          })
        }
      })
  },
  onShareAppMessage(){
    var self = this
    // console.log('share');
    return {
      title: '急!这位同学想找个厉害的家教!',
      path: `/pages/studentdetail/main?openid=${self.studentdetail.openid}&randomstr=${self.studentdetail.randomstr}`,
      // imageUrl: `${self.studentdetail.urls[0]}`,
      success: (res) => {
        // console.log("转发成功", res);
      },
      fail: (res) => {
        // console.log("转发失败", res);
      }
    }
  }
};
</script>

<style scoped lang='scss'>
$maincolor: #377BF0;
.icon-time{
  color:$maincolor;
}
.icon-rili{
  color:$maincolor;
  font-size: 50rpx;
  position: relative;
  top: -10rpx;
  left: -6rpx;
  padding-right: 10rpx;
}
.icon-yanzheng1{
  color:$maincolor;
}
.icon-shenfenzheng{
  color:green;
  font-size: 34rpx;
}
.toptip{
  background: #efefef; 
  margin-top:12rpx;
  padding: 12rpx;
  text-align: center;   
  font-size: 28rpx;
  text-align: left;
  text-indent: 1.5em;
}

.container{
  padding: 0 20rpx 100rpx;
}
swiper {
  width: 750rpx;
  height: 562.5rpx;
  swiper-item {
    width: 750rpx;
    height: 562.5rpx;
    img {
      display: flex;
      width: 750rpx;
      height: 562.5rpx;
    }
  }
}
.warn{
  color: #949494;
  font-size: 28rpx;
  padding: 0 12rpx;
  background-color: #eeeeee;
}
.head {
  padding: 20rpx 0;
  text-align: center;
  .avatar{
    display: flex;
    justify-content: space-around;
    padding: 10rpx 0;
    img{
      width: 170rpx;
      height: 170rpx;
      border-radius: 85rpx;
    }
  }
  .view{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    font-size: 32rpx;
    color: #c0c0c0;
    .l{

    }
    .r{

    }
  }
  .title {
    font-size: 40rpx;
    font-weight: 700;
    max-width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0 auto;
    span{
      font-weight: normal;
      font-size: 36rpx;
    }
    img{
      width: 32rpx;
      height: 40rpx;
    }
  }
  .brdesc {
    color: rgb(107, 107, 107);
    max-width: 80%;
    margin: 0 auto;
    text-align: left;
    padding-bottom: 20rpx;
    // border-bottom:1rpx solid #eeeeee; 
  }
}
.qqmap{
  border-bottom:1px solid #e5e5e5; 
  .position{
    font-size: 30rpx;
    color: $maincolor;
  }
}
.price {
  background-color: #f9ffea;
  padding: 20rpx 20rpx;
  .up {
    display: flex;
    flex-direction: row;
    .l {
      width: 65%;
      display: flex;
      flex-direction: row;
      .nowmoney {
        font-size: 60rpx;
        color: $maincolor;
        height: 100rpx;
      }
      .oldmoney {
        height: 100rpx;
        line-height: 100rpx;
        text-decoration: line-through;
        color: #c0c0c0;
      }
    }
    .r {
      width: 35%;
      .marketprice {
        font-size: 28rpx;
      }
    }
    .tag {
      background-color: #ffebcf;
      font-size: 24rpx;
      text-align: center;
      height: 30rpx;
      line-height: 30rpx;
      border-radius: 15rpx;
      display: inline-block;
      padding: 0 15rpx;
      margin: 0 auto;
    }
  }
  .down {
    color: rgb(141, 141, 141);
    border-top: 1px solid #eafcbe;
    display: flex;
    flex-direction: row;
    align-items: center;
    i {
      color: $maincolor;
    }
  }
}
.countchange{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    button{
      width: 60rpx;
      height: 60rpx;
      padding: 0;
      line-height: 60rpx;
      text-align: center;
      font-size: 40rpx;
      margin: 0;
    }
    input{
      width: 100rpx;
      height: 60rpx;
      padding: 0;
      line-height: 60rpx;
      text-align: center;
      font-size: 40rpx;
    }
  }
  .spacing{
    height: 10rpx;
  }
.dtdesc{
  word-break: break-all;
  
  padding: 0rpx 20rpx 20rpx;
  font-size: 32rpx;
  
  div{
    text-indent: 2em;
  }
}
.teachinfo{
  font-weight: 600;
  font-size: 40rpx;
  text-align: center;
}
.detail{
  font-size: 34rpx;
  .line{
    display: flex;
    flex-direction: row;
    .l{
      width: 200rpx;
      box-sizing: border-box;
      padding-right: 26rpx;
      text-align: right;
      font-weight: 600;
    }
    .r{
      width: 510rpx;
      display: flex;
      align-items: flex-start;
      span{
        display: inline-block;
        padding-right: 10rpx;
      }
    }
  }
}
.foot {
  position: fixed;
  bottom: 0;
  width: 750rpx;
  height: 100rpx;
  padding: 20rpx 0 0rpx;
  display: flex;
  flex-direction: row;
  z-index: 9999;
  background-color: #fff;
  .s {
    width: 40%;
    display: flex;
    flex-direction: row;
    text-align: center;
    font-size: 26rpx;
    height: 100rpx;
    overflow: hidden;
    & > div {
      width: 50%;
    }
    i {
      font-size: 34rpx;
    }
  }
  .b {
    height: 100rpx;
    line-height: 100rpx;
    width: 30%;
  }
  .part4 {
    background-color: #fdb51b;
    color: #000;
    font-size: 36rpx;
    text-align: center;
  }
  .part5 {
    background-color: $maincolor;
    color: #fff;
    font-size: 36rpx;
    text-align: center;
  }
  .hoverbtn1 {
    background-color: rgb(199, 129, 0);
  }
  .hoverbtn {
    background-color: rgb(39, 102, 211);
  }
}
.share{
  position: fixed;
  right: 6rpx;
  top:563rpx;
  width: 100rpx;
  height: 100rpx;
  border-radius: 50rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: rgba(0, 0, 0, .5);
  i{
    color: rgba(0, 0, 0, .9);
    font-size: 60rpx;
  }
}
</style>