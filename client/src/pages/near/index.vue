<template>
  <div class="container">
    <div class="location">
      <i class="iconfont icon-round"></i>
      <span @click="chooselocation">{{location}}</span>
      <i class="iconfont icon-tubiao_xiala"></i>
      <button @click="opensetting" v-if="showopensettingbtn">打开定位</button>
    </div>
    <!-- <i-tabs :current="current" color="#377BF0" @change="handleChange">
      <i-tab key="tab1" title="附近店铺"></i-tab>
    </i-tabs> -->
    <div class="tab1con tabcon" v-if="current == 'tab1'">
      <div class='shop' v-for="(x,i) in shoplist" :key="i">
        <div class="top">
          <div class="l">
            <img :src="x.logo" alt=""><span>{{x.shopname}}</span>
          </div>
          <div class="r">
            <button class="jindian" hover-class='jindian-hover' @click="toshop(x)">进店看看</button>
          </div>
        </div>
        <div class="main" @click="toshop(x)">
          <div class="goods" v-for="(y,n) in x.goodslist" :key="n">
            <img :src="y.thumbnail" alt="">
            <div class="name">{{y.name}}</div>
            <div class='price'>
              <div class='current'>￥{{y.currentPrice}}</div>
              <div class='old'>{{y.oldPrice}}</div>
            </div>
          </div>
        </div>
        <div class="locate" @click="toqqmap(x)">
          <span class="iconfont icon-round"></span>
          <span>{{x.citylabel1}}</span>
          <span>{{x.citylabel2}}</span>
        </div>
      </div>
    </div>
    <div class="fabu">
      <button hover-class="btnhover" @click="togoodsupload">我要发布</button>
    </div>
  </div>
</template>
<script>

import qc from 'wafer2-client-sdk'
import conf from '@/config'

import qqmap from "@/wxapis/qqmap.js";
var mymap = new qqmap({
  // 地图开发秘钥
  key: conf.mapkey // 必填
});

import checkscope from "@/wxapis/check_scope";
import authorize from "@/wxapis/authorize";
import openSetting from "@/wxapis/openSetting";
import chooselocation from "@/wxapis/chooselocation";
import modal from "@/wxapis/modal";

export default {
  data: function() {
    return {
      // routeInfo: routeInfo
      current: "tab1",
      location: "点击切换定位",
      mypositioncode: "",
      shoplist: [],
      
    };
  },
  methods: {
    async chooselocation() {
      try {
        let location = (await chooselocation()) || null;
        this.location = location.name || "切换位置";
        // console.log(location);
        let querycode = await this.reverseGeocoder(
          location.longitude,
          location.latitude
        );
        // console.log("querycode:", querycode);
        this.mypositioncode = querycode.result.ad_info.adcode;
        // console.log("this.mypositioncode:", this.mypositioncode);
        this.searchroundshop()
  

        wx.setStorageSync("roundposition", location);
      } catch (error) {
        wx.showToast({
          title: '您没有选择定位',
          duration: 1500,
          icon: "none"
        });
      }
    },
    async changelocation() {
      // 检查定位授权
      let locationAuth = await checkscope("scope.userLocation"); //userInfo
      // console.log(46, locationAuth);
      if (!locationAuth) {
        // console.log("未授权过，唤起授权窗口");
        let locationAuthRes = await authorize("scope.userLocation");
        // console.log(49, locationAuthRes);
        if (locationAuthRes.errMsg == "authorize:ok") {
          // console.log("同意授权");
          this.showopensettingbtn = false;
          // 同意
          let location = (await chooselocation()) || null;
          let querycode = await this.reverseGeocoder(
            location.longitude,
            location.latitude
          );
          // console.log("querycode:", querycode);
          this.mypositioncode = querycode.result.ad_info.adcode;
          // console.log("this.mypositioncode:", this.mypositioncode);
          this.searchroundshop()
    
          this.location = location.name || "切换位置";
          
          wx.setStorageSync("roundposition", location);
        } else {
          // console.log("拒绝授权");
          // 拒绝过
          this.showopensettingbtn = true;
          let modalres = await modal({
            content: "请点击'打开定位'按钮，即可看到离你最近的组团商品",
            // cancelText: "放弃组团",
            confirmText: "好"
          });
          // console.log(65, modalres);
          if (modalres) {
            // 需要用户打开设置 开启定位
          }
        }
      } else {
        this.showopensettingbtn = false;
        // console.log("已授权");
      }
    },
    async opensetting() {
      // 打开设置页面
      let settingres = await openSetting();
      // console.log(settingres);
      if (settingres["scope.userLocation"]) {
        this.showopensettingbtn = false;
        // 已打开定位
        wx.showToast({
          title: "定位打开成功",
          icon: "none",
          duration: 1000
        });
      } else {
        this.showopensettingbtn = true;
        wx.showToast({
          title: "您没有打开定位",
          icon: "none",
          duration: 1000
        });
      }
    },
    reverseGeocoder(longitude, latitude) {
      return new Promise(function(resolve, reject) {
        mymap.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function(res) {
            resolve(res);
          },
          fail: function(res) {
            resolve(null);
          }
        });
      });
    },
    searchroundshop(){
      let self = this
      wx.showLoading({
        title:"附近帮主获取中..."
      })
      qc.request({
        url: conf.service.searchroundshopUrl ,
        data: {
          code: self.mypositioncode
        },
        success(res){
          // console.log(res);
          if(res.data.success){
            self.shoplist = res.data.data
          }else{
            self.shoplist = []
          }
        },
        fail(err){
          // console.log(err);
          self.shoplist = []
        },
        complete(){
          // console.log('complete');
          wx.hideLoading()
          wx.stopPullDownRefresh()
        }
      })
    },
    toshop(x){
      wx.navigateTo({
        url: `/pages/shopgoods/main?shopid=${x.openid}&shopname=${x.shopname}&latitude=${x.latitude}&longitude=${x.longitude}&citylabel1=${x.citylabel1}&citylabel2=${x.citylabel2}&logo=${x.logo}`
      });
    },
    handleChange(x) {
      // console.log(x);
      this.current = x.mp.detail.key;
    },
    togoodsupload() {
      // 判断是否已入驻
      let self = this
      wx.showLoading({
        title:"店铺信息获取中..."
      })
      qc.request({
        url: conf.service.checkuserisshopUrl ,
        data: {},
        success(res){
          // console.log(res);
          let code = res.data.code
          if(code=='ROUNDSHOP_USER_IS_SHOP'){
            // 是商家 且通过审核 可发布
            return wx.navigateTo({
              url: "/pages/shopgoodsupload/main"
            });
          }
          if(code=='ROUNDSHOP_USER_ISNOT_SHOP'){
            // 不是商家 提交审核
            wx.showToast({
              title:'请检查网络',
              duration: 1500,
              icon:'none'
            })
            setTimeout(function(){
              wx.navigateTo({
                url: "/pages/shopapply/main"
              });
            },1500)
          }
          wx.showToast({
            title: res.data.msg,
            duration: 1500,
            icon:'none'
          })
          
        },
        fail(err){
          // console.log(err);
          wx.showToast({
            title:'请检查网络',
            duration: 1500,
            icon:'none'
          })
        },
        complete(){
          // console.log('complete');
          wx.hideLoading()
        }
      })
    },
    toqqmap(x){
      wx.navigateTo({
        url:`/pages/qqmap/main?longitude=${x.longitude}&latitude=${x.latitude}`
      })
    }
  },
  onPullDownRefresh(){
    this.searchroundshop()
  },
  async onLoad() {
    // console.log("onload");
    wx.showShareMenu({
      withShareTicket: true
    });
    // 获取storage中存出的地址
    let roundposition = wx.getStorageSync("roundposition") || null;
    // console.log(roundposition);
    // if(!roundposition){
    //   this.changelocation()
    // }
    if (roundposition && roundposition.name) {
      this.location = roundposition.name || "点击切换定位";

      let querycode = await this.reverseGeocoder(
        roundposition.longitude,
        roundposition.latitude
      );
      // console.log("querycode:", querycode);
      this.mypositioncode = querycode.result.ad_info.adcode;
      // console.log("this.mypositioncode:", this.mypositioncode);

      this.searchroundshop()


    } else {
      this.location = "点击切换定位";
    }
  },
  onShow() {
    if (!this.globalData.loginstate) {
      wx.showToast({
        title: "请先登录哦",
        icon: "none",
        mask: true,
        duration: 1500,
        success() {
          setTimeout(function() {
            wx.switchTab({ url: "/pages/my/main" });
          }, 1500);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
$maincolor: #377BF0;
.location {
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20rpx;
  // max-width: 70%;
  // margin: 0 auto 5rpx;
  i {
    display: inline;
  }
  span {
    display: inline-block;
    max-width: 60%;
    overflow: hidden;
    margin: 0 10rpx;
    word-break: keep-all;
    word-wrap: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  button {
    background-color: $maincolor;
    height: 55rpx;
    line-height: 55rpx;
    color: #fff;
  }
}

.tabcon {
  map {
    width: 750rpx;
    height: 750rpx;
  }
}
.shop{
  padding: 6rpx 20rpx 12rpx;
  border-bottom: 1px solid rgb(228, 228, 228);
  .top{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 32rpx;
    .l{
      display: flex;
      flex-direction: row;
      align-items: center;
      img{
        width: 100rpx;
        height: 100rpx;
        margin-right: 12rpx;
        border-radius: 5rpx;
      }
    }
    .r{
      display: flex;
      flex-direction: row;
      align-items: center;
      .jindian{
        background: #fff;
        height: 44rpx;
        line-height: 40rpx;
        font-size: 30rpx;
        color: $maincolor;
        border: 1px solid $maincolor;
        border-radius: 22rpx;
      }
      .jindian-hover{
        color: $maincolor;
        background: rgb(231, 230, 230);
      }
    }
  }
  .main{
    display: flex;
    flex-direction: row;
    align-items: center;
    .goods{
      width: 220rpx;
      // height: 210rpx;
      position: relative;
      margin-right: 25rpx;
      img{
        width: 220rpx;
        height: 170rpx;
      }
      .price{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        font-size: 30rpx;
        position: absolute;
        bottom: 46rpx;
        right: 0;
        padding: 4rpx 5rpx 0;
        border-top-left-radius: 18rpx;
        background: rgb(236, 236, 236);
        .current{
          color: rgb(61, 61, 61);
        }
        .old{
          text-decoration: line-through;
          margin-left: 10rpx;
          color: #ccc;
        }
      }
      .name{
        height: 40rpx;
        line-height: 40rpx;
        font-size: 30rpx;
        color: rgb(83, 83, 83);
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .locate{
    text-align: left;
    font-size: 30rpx;
    color: rgb(145, 143, 143);
    padding-top: 6rpx;
  }
}
.fabu {
  width: 750rpx;
  position: fixed;
  bottom: 0;
  button {
    width: 40%;
    height: 62rpx;
    line-height: 62rpx;
    background-color: $maincolor;
    font-size: 32rpx;
    border-radius: 31rpx;
    color: #fff;
  }
  .btnhover {
    background-color: rgb(138, 0, 0);
  }
}
</style>
