<template>
  <div class="container">
    <div class="location">
      <i class="iconfont icon-round"></i>
      <span @click="chooselocation">{{location}}</span>
      <i class="iconfont icon-tubiao_xiala"></i>
      <button @click="opensetting" v-if="showopensettingbtn">打开定位</button>
    </div>
    <div class="tab1con tabcon">
      <div>
        <i-card
          v-for="(x,i) in goodslist"
          :key="i"
          full
          :title="x.name"
          extra="查看详情"
          :thumb="x.urls[0]"
          :origin="x.origin"
          @click="togoodsdetail(x._id, x.origin)"
        >
          <view slot="content">{{x.detailDesc}}</view>
          <view slot="footer">
            <span class="iconfont icon-round"></span>
            {{x.deliveryArea}}
          </view>
        </i-card>
      </div>
    </div>
    <div class="spacing"></div>
    <div class="fabu">
      <button hover-class="btnhover" @click="togoodsupload">我要发布</button>
    </div>
    <mp-picker
      ref="mpPicker"
      :mode="mode"
      :deepLength="deepLength"
      :pickerValueArray="communities"
      @onChange="onChange"
      @onConfirm="onConfirm"
    ></mp-picker>
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
import mpPicker from '@/components/picker';

export default {
  components:{
    mpPicker
  },
  data: function() {
    return {
      location: "点击切换定位",
      mypositioncode: "",
      bangzhulist:[],
      nearuserlist: [],
      mode:'selector',
      deepLength: 1,
      communities:[],
      goodslist:[],
      tipshow:false,
      tip:''
    };
  },
  methods: {
    onChange(e){
      // console.log(e);
      wx.setStorageSync("mycommunity", {
        name: e.label ,
        _id: e.value[0]
      });
    },
    onConfirm(e){
      // console.log(e);
      wx.setStorageSync("mycommunity", {
        name: e.label ,
        _id: e.value[0]
      });
      // 获取小区内发布的商品
      this.getCommunityGoods(e.value[0])
    },
    getCommunity(){
      var self = this;
      wx.showLoading({
        title:'小区列表加载中...'
      })
      qc.request({
        url:conf.service.getcommunitylistUrl,
        data:{
          code: self.mypositioncode
        },
        success(res){
          wx.hideLoading()
          let data = res.data.data
          if(data && data.length > 0){
            data.map(function(v,i){
              v.label = v.name;
              v.value = v._id
            })
            self.communities = data
            // console.log(self.communities);
            self.$refs.mpPicker.show();
            self.tip = ''
            self.tipshow = false
          }else{
            wx.showToast({
              icon:'none',
              title:'该地区尚未开放，敬请期待',
              duration: 3000
            })
            self.tip = '该地区暂时没有帮主，尚未开放，敬请期待。您可以点击上方定位切换到别的区看看，也可以通过"首页=>帮主招募"申请成为帮主。'
            self.tipshow = true
          }
        },
        fail(err){
          wx.hideLoading()
          wx.showToast({
            icon:'none',
            title:'请求失败，请检查网络',
            duration: 2000
          })
        }
      })
    },
    getCommunityGoods(communityid){
      var self = this;
      wx.showLoading({
        title:'组团商品加载中...'
      })
      qc.request({
        url:conf.service.getcommunitygoodslistUrl,
        data:{
          communityid
        },
        success(res){
          wx.hideLoading()
          wx.stopPullDownRefresh()
          let data = res.data.data
          self.goodslist = data
          // console.log(self.goodslist);
          if(data && data.length > 0){
            self.tip = ''
            self.tipshow = false
          }else{
            wx.showToast({
              icon:'none',
              title:'该小区暂无组团商品，快发布一个吧',
              duration: 3000
            })
            self.tip = '该小区暂无组团商品，您可以点击下方"我要发布"，发布您的商品。'
            self.tipshow = true
          }
        },
        fail(err){
          wx.stopPullDownRefresh()
          wx.hideLoading()
          wx.showToast({
            icon:'none',
            title:'请求失败，请检查网络',
            duration: 2000
          })
        }
      })
    },
    async chooselocation() {
      try {
        let location = (await chooselocation()) || {};
        this.location = location.name || "切换位置";
        console.log(location);
        let querycode = await this.reverseGeocoder(
          location.longitude,
          location.latitude
        );
        console.log("querycode:", querycode);
        this.mypositioncode = querycode.result.ad_info.adcode;
        // console.log( "this.mypositioncode:", this.mypositioncode );

        // 获取该地区所有小区列表
        this.getCommunity()

        wx.setStorageSync("zutuanposition", location);
      } catch (error) {
        console.log(error);
        
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
          let location = (await chooselocation()) || {};
          let querycode = await this.reverseGeocoder(
            location.longitude,
            location.latitude
          );
          // console.log("querycode:", querycode);
          this.mypositioncode = querycode.result.ad_info.adcode;
          // console.log("this.mypositioncode:", this.mypositioncode);
          this.location = location.name || "切换位置";

          // this.searchbangzhu()
          // this.searchzutuanuser()
          
          wx.setStorageSync("zutuanposition", location);
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
    searchbangzhu(){
      let self = this
      wx.showLoading({
        title:"附近帮主获取中..."
      })
      qc.request({
        url: conf.service.searchbangzhuUrl ,
        data: {
          code: self.mypositioncode
        },
        success(res){
          wx.hideLoading()
          // console.log(res);
          self.bangzhulist = res.data.data
        },
        fail(err){
          // console.log(err);
          self.bangzhulist = []
          wx.hideLoading()
          wx.showToast({
            icon:'none',
            title:'请求失败，请检查网络',
            duration: 2000
          })
        },
        complete(){
          // console.log('complete');
          wx.hideLoading()
          wx.stopPullDownRefresh()
        }
      })
    },
    searchzutuanuser(){
      let self = this
      qc.request({
        url: conf.service.searchzutuanuserUrl,
        data: {
          code: self.mypositioncode
        },
        success(res){
          // console.log(res);
          self.nearuserlist = res.data.data
        },
        fail(err){
          // console.log(err);
          self.nearuserlist = []
        }
      })
    },
    tosearchgoods(who){
      wx.navigateTo({
        url:`/pages/bangzhugoods/main?openid=${who}`
      })
    },
    togoodsdetail(goodsid, origin){
      wx.navigateTo({
        url:`/pages/goodsdetail/main?goodsid=${goodsid}&origin=${origin}`
      })
    },
    searchgoods(who){
      let self = this
      if( !who ){
        return wx.showToast({
          title:'没有发布商品',
          icon:'none',
          duration: 1500
        })
      }
      qc.request({
        url: conf.service.searchbangzhugoodsUrl ,
        data: {
          openid: who
        },
        success(res){
          // console.log(res);
        },
        fail(err){
          wx.hideLoading()
          wx.showToast({
            icon:'none',
            title:'请求失败，请检查网络',
            duration: 2000
          })
          // console.log(err);
        }
      })
    },
    
    // handleChange(x) {
    //   console.log(x);
    //   this.current = x.mp.detail.key;
    // },
    togoodsupload() {
      // 要先加入一个小区
      let mycommunity = wx.getStorageSync("mycommunity") || {};
      if(!mycommunity.name || !mycommunity._id){
        return wx.showToast({
          icon:'none',
          duration: 3000,
          title:'要先成为帮主或加入一个小区才能发布商品'
        })
      }
      wx.navigateTo({
        url: "/pages/goodsupload/main"
      });
    },
    async init(){
      
      // console.log("onload");
      wx.showShareMenu({
        withShareTicket: true
      });
      // 获取storage中存出的地址
      let zutuanposition = wx.getStorageSync("zutuanposition") || {};
      // console.log(zutuanposition);
      // if(!zutuanposition){
      //   this.changelocation()
      // }
      if (zutuanposition && zutuanposition.name) {
        this.location = zutuanposition.name || "点击切换定位";

        let querycode = await this.reverseGeocoder(
          zutuanposition.longitude,
          zutuanposition.latitude
        );
        // console.log("querycode:", querycode);
        this.mypositioncode = querycode.result.ad_info.adcode;
        // console.log("this.mypositioncode:", this.mypositioncode);
        // this.searchbangzhu()
        // this.searchzutuanuser()

      } else {
        wx.stopPullDownRefresh()
        wx.showToast({
          title:'选择位置后才能加载商品',
          duration:1500,
          icon:'none'
        })
        return this.location = "点击切换定位";
      }
      // 获取storage中存出的小区信息
      let mycommunity = wx.getStorageSync("mycommunity") || {};

      if( (zutuanposition && zutuanposition.name) && (!mycommunity.name || !mycommunity._id)){
        // 搜索该地区内小区
        return this.getCommunity()
      }
      if(mycommunity.name && mycommunity._id){
        // 查询小区中的商品
        this.getCommunityGoods(mycommunity._id)
      }else{
        wx.stopPullDownRefresh()
        wx.showToast({
          title:'您尚未加入任何小区',
          duration:2500,
          icon:'none'
        })
      }
    }
  },
  onPullDownRefresh(){
    this.init()
  },
  onLoad() {
    this.init()
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
  border-bottom: 8rpx solid #ccc;
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
  .tip {
    padding: 50rpx;
    color: #ccc;
    font-size: 36rpx;
    // text-align: center;
    text-indent: 2em;
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
.spacing{
  height: 100rpx;
}
</style>
