<template>
  <div class="container">
    <swiper v-if="goodsdetail.origin != 'platform'" indicator-dots="true" circular="true" next-margin="0" previous-margin="0">
      <block v-for="(x, i) in goodsdetail.urls" :key="i">
        <swiper-item>
          <img :src="x" class="slide-image" mode>
        </swiper-item>
      </block>
    </swiper>
    <swiper v-if="goodsdetail.origin == 'platform'" indicator-dots="true" circular="true" next-margin="0" previous-margin="0">
      <block v-for="(x, i) in goodsdetail.urls" :key="i">
        <swiper-item>
          <img :src="x.url" class="slide-image" mode>
        </swiper-item>
      </block>
    </swiper>
    <!-- <div class="warn">
      *为保证交易安全，普通用户上传的商品只可浏览不可购买
    </div> -->
    <div class="head">
      <div class="title">{{goodsdetail.name}}</div>
      <div class="brdesc" v-if="goodsdetail.origin == 'platform'">{{goodsdetail.briefDesc}}</div>
    </div>
    <!-- #f9ffea -->
    <div class="price">
      <div class="up">
        <div class="l">
          <div class="nowprice">
            <div class="tag">批物价</div>
            <div class="nowmoney">￥{{goodsdetail.currentPrice}}</div>
          </div>
          <div class="oldprice">
            <div class="tag">市场价</div>
            <div class="oldmoney">￥{{goodsdetail.oldPrice}}</div>
          </div>
        </div>
        <div class="r" v-if="origin == 'platform'">
          <div class="tag">各大商超价</div>
          <div
            class="marketprice"
            v-for="(x,i) in goodsdetail.marketPrice"
            :key="i"
          >{{x.name}}:￥{{x.price}}</div>
        </div>
      </div>
      <div class="down">
        <i class="iconfont icon-kucunguanli"></i>
        商品库存{{goodsdetail.stock}}件
      </div>
    </div>
    <div class="dtdesc">
      商品描述：
      <div>{{goodsdetail.detailDesc}}</div>
    </div>
    <div class="fahuo">
      <div class="u">[注意事项]</div>
      <!-- 发货地 发货时间 发货方式 -->
      <div class="m">
          <div>发货方式 : <span>{{goodsdetail.deliveryMethods || '商家未注明'}}</span></div>
          <div @click='toqqmap'>发货/提货位置 : 
            <span class='iconfont icon-round position'></span>
            <span class='position'>{{goodsdetail.deliveryArea || '商家未注明'}}</span>
          </div>
          <div v-if="goodsdetail.origin!='platform'">组团时间 :{{goodsdetail._start+'~'+goodsdetail._end}}</div>
          <div>发货/提货时间 :{{goodsdetail.deliveryTime || '商家未注明'}}</div>
          <!-- <div>可购区域 :<span>{{goodsdetail.targetArea_name || '商家未注明'}}</span> </div> -->
          <div class="tips"></div>
          <div>是否包邮 :{{goodsdetail.shipping?'包邮':'不包邮'}}</div>
      </div>
    </div>
    <div class="fahuo" v-if="goodsdetail.origin != 'platform'">
      <div class="u">[卖家提示]</div>
      <div>
        {{goodsdetail.tips}}
      </div>
    </div>
    <div class="dtimgs" v-if="goodsdetail.origin == 'platform'">
      <div>商品详情：</div>
      <div>
        <img v-for='(x,i) in goodsdetail.detailImg' :key='i' :src="x.url" alt="">
      </div>
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
        加入购物车
      </div>
      <div class="item b part5" hover-class="hoverbtn" @click="buynow">立即购买</div>
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
      goodsdetail: {},
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
      if(!this.goodsdetail.longitude || !this.goodsdetail.latitude){
        return wx.showToast({
          title:'该商品未添加定位',
          duration: 1500,
          icon:'none'
        })
      }
      wx.navigateTo({
        url:`/pages/qqmap/main?longitude=${this.goodsdetail.longitude}&latitude=${this.goodsdetail.latitude}`
      })
    },
    buynow() {
      // console.log("buynow");
      let url = `/pages/order/main?goodsdetail=${JSON.stringify(this.goodsdetail)}&origin=${this.origin}`
      wx.navigateTo({url})
    },
    jointocart(){
      // console.log("goodsdetail jointocart");
      var self = this;
      wx.showLoading({
        title:'Loading',
        mask:true,
      })
      qc.request({
        url: conf.service.addtocartUrl,
        data:{
          goodsid:self.goodsdetail._id
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
    let goodsid = this.$root.$mp.query.goodsid
    let origin = this.$root.$mp.query.origin
    if(!goodsid || !origin){
      return wx.showToast({
        title:'商品信息有误，请重新选择',
        icon:'none',
        duration: 2500
      })
    }
    this.goodsid = goodsid
    this.origin = origin

    // console.log('goodsid:',goodsid);
    
    var self = this;
      qc.request({
        url: conf.service.goodsdetailUrl,
        // method:"POST",
        data:{
          goodsid, origin
        },
        success:function(res) {
          // console.log('goodsdetail', res.data.data);
          let goodsinfo = res.data.data
          goodsinfo.dtimgs = []
          goodsinfo.detailImg.map(function(v,i){
            goodsinfo.dtimgs.push(v.url)
          })
          self.goodsdetail = goodsinfo
        },
        fail(){
          wx.showToast({
            title:"获取商品详情失败",
            duration:1500
          })
        }
      })
  },
  onShareAppMessage(){
    var self = this
    // console.log('share');
    return {
      title: `【批物帮-买啥都是批发价!】${self.goodsdetail.name}`,
      path: `/pages/goodsdetail/main?goodsid=${self.goodsid}&origin=${self.origin}`,
      imageUrl: `${self.goodsdetail.urls[0]}`,
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
    color: #377BF0;
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
