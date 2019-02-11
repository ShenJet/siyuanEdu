<template>
  <div class="container">
    <div class="head">
      <div class="avatar">
        <img :src="teacherdetail.avatar" mode='aspectFill' alt="老师头像">
      </div>
      <div class="title">您已预约：{{teacherdetail.name}}老师
        <img src='/static/img/nan.png' mode='aspectFill' v-if="teacherdetail.sex == '男'" />
        <img src='/static/img/nv.png' mode='aspectFill' v-if="teacherdetail.sex == '女'" />
      </div>
      <div class="brdesc">老师简介：{{teacherdetail.applydesc}}</div>
      <div class="qqmap" @click='toqqmap'>
        <span class='iconfont icon-round position'></span>
        <span class='position'>{{teacherdetail.citylabel}}</span>
      </div>
    </div>
    <!-- #f9ffea -->
    <!-- <div class="qqmap" @click='toqqmap'>老师位置 : </div> -->
    <div class="teachinfo">
      老师信息
    </div>
    <div class="detail">
      <div class="line">
        <div class="l">
          联系方式
        </div>
        <div class="r" @click="dail">
          {{teacherdetail.phone}}
        </div>
      </div>
      <div class="line">
        <div class="l">
          教学年级
        </div>
        <div class="r">
          {{teacherdetail.coursetype}}
        </div>
      </div>
      <div class="line">
        <div class="l">
          教学科目
        </div>
        <div class="r">
          {{teacherdetail.coursename}}
        </div>
      </div>
      <div class="line">
        <div class="l">
          目前职业
        </div>
        <div class="r">
          {{teacherdetail.role}}
        </div>
      </div>
      <div class="line">
        <div class="l">
          学历
        </div>
        <div class="r">
          {{teacherdetail.xueli}}
        </div>
      </div>
      <div class="line">
        <div class="l">
          教龄
        </div>
        <div class="r">
          {{teacherdetail.teachyear}} 年
        </div>
      </div>
      <div class="line">
        <div class="l">
          补课时间
        </div>
        <div class="r">
          <span class="iconfont icon-rili"></span>
          {{teacherdetail.teachday}}
        </div>
      </div>
      <div class="line">
        <div class="l">
          课时费
        </div>
        <div class="r">
          <span class="iconfont icon-feiyongshenqing"></span>
          {{teacherdetail.price}} 元/小时
        </div>
      </div>
      <div class="line">
        <div class="l">
          时间段
        </div>
        <div class="r">
          <span class="iconfont icon-time"></span>
          {{teacherdetail.teachstarttime}} 至 {{teacherdetail.teachendtime}} 
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
          生活照
        </div>
        <div class="r idcard3">
          <img :src="teacherdetail.idcard3" mode='aspectFill' alt="">
        </div>
      </div>
    </div>
    <div class="toptip">
      *您已成功预约该老师。您可以通过上述联系方式联系该老师，也可以通过'我的'->'联系客服'，通过客服协助联络该老师。
    </div>
    <i-load-more tip="我是有底线的" :loading="false" />
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
      teacherdetail: {},
      count:1,
      goodsid:'',
      origin:''
    };
  },
  components: {
  },
  methods: {
    dail(){
      wx.makePhoneCall({
        phoneNumber: this.teacherdetail.phone
      })
    },
    routeToHome() {
      let url = "/pages/index/main";
      wx.switchTab({ url });
    },
    toqqmap() {
      if(!this.teacherdetail.longitude || !this.teacherdetail.latitude){
        return wx.showToast({
          title:'该商品未添加定位',
          duration: 1500,
          icon:'none'
        })
      }
      wx.navigateTo({
        url:`/pages/qqmap/main?longitude=${this.teacherdetail.longitude}&latitude=${this.teacherdetail.latitude}`
      })
    },
    jointocollect(){
      // console.log("teacherdetail jointocollect");
      var self = this;
      // 做本地存储
      let teacher_collect = wx.getStorageSync('teacher_collect') || []
      for (let index = 0; index < teacher_collect.length; index++) {
        const v = teacher_collect[index];
        if(v.openid == self.teacherdetail.openid){
          return wx.showToast({
            title:'添加成功',
            duration: 1800
          })
        }
      }
      teacher_collect.unshift(self.teacherdetail)
      wx.setStorage({
        key: 'teacher_collect',
        data: teacher_collect
      })
      return wx.showToast({
        title:'添加成功',
        duration: 1800
      })
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
          id: self.teacherdetail.openid,
          type:'teacher'
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
  },
  onShow(){
    let orderid = this.$root.$mp.query.orderid
    if(!orderid){
      return wx.showToast({
        title:'订单信息有误，请尝试重新选择',
        icon:'none',
        duration: 2000
      })
    }
    
    var self = this;
      qc.request({
        url: conf.service.teacherfulldetailUrl,
        // method:"POST",
        data:{
          orderid
        },
        success:function(res) {
          wx.hideLoading()
          self.teacherdetail = res.data.data
        },
        fail(){
          wx.showToast({
            title:"获取老师详情失败，请检查网络",
            duration:1500
          })
        }
      })
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
.icon-feiyongshenqing{
  color:$maincolor;
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
  padding: 0 20rpx 10rpx;
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
    background-color: rgb(219, 143, 0);
  }
  .hoverbtn {
    background-color: #9c2518;
  }
}
</style>
