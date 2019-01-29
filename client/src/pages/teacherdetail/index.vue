<template>
  <div class="container">
    
    <div class="head">
      <div class="avatar">
        <img :src="teacherdetail.avatar" mode='aspectFill' alt="老师头像">
      </div>
      <div class="title">{{teacherdetail.name}}</div>
      <div class="brdesc">个人简介：{{teacherdetail.applydesc}}</div>
    </div>
    <!-- #f9ffea -->
    <div class="qqmap" @click='toqqmap'>老师位置 : 
      <span class='iconfont icon-round position'></span>
      <span class='position'>{{teacherdetail.citylabel}}</span>
    </div>
    
    <div class="spacing">
    </div>
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
      <div class="item b part4" hover-class="hoverbtn1" @click="jointocart">
        添加收藏
      </div>
      <div class="item b part5" hover-class="hoverbtn" @click="buynow">立即预约</div>
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

import slogan from "@/components/slogan";
import goodsItem from "@/components/goodsitem";


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
    slogan,
    goodsItem
  },
  methods: {
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
    buynow() {
      // console.log("buynow");
      let url = `/pages/order/main?teacherdetail=${JSON.stringify(this.teacherdetail)}&origin=${this.origin}`
      wx.navigateTo({url})
    },
    jointocart(){
      // console.log("teacherdetail jointocart");
      var self = this;
      wx.showLoading({
        title:'Loading',
        mask:true,
      })
      qc.request({
        url: conf.service.addtocartUrl,
        data:{
          goodsid:self.teacherdetail._id
        },
        success:function(res) {
          wx.hideLoading()
          // console.log('addtocart res', res.data.data);
          if(res.data.success){
            wx.showToast({
              title:"添加成功",
              duration:1500,
              icon:'success'
            })
          }else{
            wx.showToast({
              title:res.data.msg ,
              duration:1500,
              icon:'none'
            })
          }
          
        },
        fail(){
          wx.hideLoading()
          wx.showToast({
            title:"请求失败",
            duration:1500,
            icon:'none'
          })
        },
        complete(){
          
        }
      })
    }
  },
  onLoad(){
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShow(){
    let openid = this.$root.$mp.query.openid
    if(!openid){
      return wx.showToast({
        title:'老师信息有误，请返回重新选择',
        icon:'none',
        duration: 2000
      })
    }
    
    var self = this;
      qc.request({
        url: conf.service.teacherdetailUrl,
        // method:"POST",
        data:{
          openid
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
  },
  onShareAppMessage(){
    var self = this
    // console.log('share');
    return {
      // title: `【找家教,就找思元家教】${self.teacherdetail.name}`,
      title: `快看这里有个厉害的家教`,
      path: `/pages/teacherdetail/main?goodsid=${self.goodsid}&origin=${self.origin}`,
      imageUrl: `${self.teacherdetail.urls[0]}`,
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
  .title {
    font-size: 40rpx;
    font-weight: 700;
    max-width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0 auto;
  }
  .brdesc {
    color: rgb(107, 107, 107);
    max-width: 80%;
    margin: 0 auto;
    text-align: left;
    padding-bottom: 20rpx;
    border-bottom:1rpx solid #eeeeee; 
  }
}
.qqmap{
  .position{
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
    height: 100rpx;
  }
.dtdesc{
  word-break: break-all;
  
  padding: 0rpx 20rpx 20rpx;
  font-size: 32rpx;
  border-bottom:1px solid #e5e5e5; 
  div{
    text-indent: 2em;
  }
}
.fahuo{
  padding: 0rpx 20rpx 20rpx;
  border-bottom:1px solid #e5e5e5; 
  font-size: 32rpx;
  .u{
    font-weight: 700;
    color: #ce4031;
  }
  .m{
    padding: 0 0 0 20rpx;
    span{
      font-weight: 600;
    }
    .position{
      color: #24a94e;
      text-decoration:underline;
    }
  }
}
.dtimgs{
  font-size: 32rpx;
  border-bottom:1px solid #e5e5e5; 
  padding: 0rpx 20rpx 20rpx;
  img{
    width: 100%;
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
    font-size: 40rpx;
    text-align: center;
  }
  .part5 {
    background-color: $maincolor;
    color: #fff;
    font-size: 40rpx;
    text-align: center;
  }
  .hoverbtn1 {
    background-color: rgb(219, 143, 0);
  }
  .hoverbtn {
    background-color: #9c2518;
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
