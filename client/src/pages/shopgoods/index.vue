<template>
  <div class="container">
    <div class="top">
      <div class="l">
        <img :src="logo" alt=""><span>{{shopname}}</span>
      </div>
      <div class="location" @click="toqqmap">
        <span class="iconfont icon-round"></span>
        <span>{{citylabel1}} {{citylabel2}}</span>
      </div>
    </div>
    <div class="main">
      <div class="goods" v-for="(x,i) in goodslist" :key="i">
        <div class="img">
          <img v-for="(y,k) in x.urls" :key="k" :src="y" alt="" @click="predivImage(y,x)"> 
        </div>
        <div class="maininfo">
          <div class="name">
            <span class="iconfont icon-tubiao_yizan-copy"></span>
            {{x.name}}
          </div>
          <div class="price">
            <span class="current">￥{{x.currentPrice}}</span>
            <span class="old">￥{{x.oldPrice}}</span>
          </div>
        </div>
        <div class="desc">
          {{x.detailDesc}}
        </div>
        <div class="time">
          <span>活动时间：</span>
          <span>{{x._start}} 至 {{x._end}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import qc from 'wafer2-client-sdk'
import conf from '@/config'

export default {
  data: function() {
    return {
      shopname :'',
      shopid :'',
      logo :'',
      longitude :'',
      latitude :'',
      citylabel1 :'',
      citylabel2 :'',
      goodslist:[]
    };
  },
  methods: {
    toqqmap(){
      wx.navigateTo({
        url:`/pages/qqmap/main?longitude=${this.longitude}&latitude=${this.latitude}`
      })
    },
    predivImage(y, x) {
      wx.previewImage({
        current: y, // 当前显示图片的http链接
        urls: x.urls // 需要预览的图片http链接列表
      });
    },
    getshopgoods(){
      let self = this
      wx.showLoading({
        title:"Loading..."
      })
      qc.request({
        url: conf.service.searchroundshopgoodsUrl ,
        data: {
          shopid: self.shopid
        },
        success(res){
          // console.log(res);
          if(res.data.success){
            self.goodslist = res.data.data
          }else{
            self.goodslist = []
          }
        },
        fail(err){
          // console.log(err);
          self.goodslist = []
        },
        complete(){
          // console.log('complete');
          wx.hideLoading()
        }
      })
    }
  },
  async onLoad() {
    wx.showShareMenu({
      withShareTicket: true
    });
  },
  async onShow() {
    // if (!this.globalData.loginstate) {
    //   wx.showToast({
    //     title: "请先登录哦",
    //     icon: "none",
    //     mask: true,
    //     duration: 1500,
    //     success() {
    //       setTimeout(function() {
    //         wx.switchTab({ url: "/pages/my/main" });
    //       }, 1500);
    //     }
    //   });
    // }
    // ${x.openid}&shopname=${x.shopname}&latitude=${x.latitude}&longitude=${x.longitude}&logo=${x.logo}
    let {shopid, shopname, logo, longitude, latitude, citylabel1, citylabel2} = this.$root.$mp.query
    this.shopname = shopname
    this.shopid = shopid
    this.logo = logo
    this.longitude = longitude
    this.latitude = latitude
    this.citylabel1 = citylabel1
    this.citylabel2 = citylabel2
    // console.log(shopid, shopname, logo, longitude, latitude, citylabel1, citylabel2);
    
    this.getshopgoods()
  }
};
</script>
<style lang="scss" scoped>
$maincolor: #377BF0;
.container{
  padding: 6rpx 20rpx;
  .top{
    // display: flex;
    // flex-direction: row;
    // justify-content: space-between;
    font-size: 32rpx;
    border-bottom: 1px solid #e5e5e5;
    .l{
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 40rpx;
      font-weight: 600;
      img{
        width: 100rpx;
        height: 100rpx;
        margin-right: 12rpx;
        border-radius: 5rpx;
      }
    }
  }
  .main{
    padding: 0rpx 0 50rpx;
    .goods{
      padding: 20rpx 0 20rpx;
      border-bottom: 1px solid #e5e5e5;
      .img{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 710rpx;
        height: 170rpx;
        img{
          width: 225rpx;
          height: 170rpx;
          border-radius: 12rpx;
        }
      }
      .maininfo{
        padding: 12rpx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .name{
          .iconfont{
            color: $maincolor ;
          }
        }
        .price{
          display: flex;
          flex-direction: row;
          .current{
            color: $maincolor ;
          }
          .old{
            color: rgb(75, 75, 75);
            text-decoration: line-through;
            padding-left: 16rpx;
          }
        }
      }
      .desc{
        font-size: 24rpx;
        padding: 20rpx;
        color: rgb(34, 34, 34);
      }
      .time{
        font-size: 32rpx;
      }
    }
  }
}

</style>
