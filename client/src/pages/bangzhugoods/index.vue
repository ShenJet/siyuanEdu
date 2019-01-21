<template>
  <div class="container">
    <div class="card" v-for='(x,i) in goodslist' :key="i">
      <i-card
        full
        :title="x.name+'  ￥'+x.currentPrice"
        extra="查看详情"
        :thumb="x.urls[0]"
        @click='togoodsdetail(x._id)'
      >
        <view slot="content">{{x.briefDesc}}</view>
        <view slot="footer">已售{{x.salescount}}件</view>
      </i-card>
    </div>
    <i-divider content="已经到底啦" ></i-divider>
  </div>
</template>
<script>
import qc from 'wafer2-client-sdk'
import conf from '@/config'

import modal from "@/wxapis/modal";

export default {
  data: function() {
    return {
      // routeInfo: routeInfo
      goodslist:[]
    }
  },
  methods: {
    searchgoods(openid){
      let self = this
      if( !openid ){
        return wx.showToast({
          title:'没有发布商品',
          icon:'none',
          duration: 1500
        })
      }
      qc.request({
        url: conf.service.searchbangzhugoodsUrl ,
        data: {
          openid: openid
        },
        success(res){
          // console.log(res);
          self.goodslist = res.data.data
        },
        fail(err){
          // console.log(err);
          self.goodslist = []
        }
      })
    },
    togoodsdetail(_id){
      wx.navigateTo({
        url:`/pages/goodsdetail/main?goodsid=${_id}&origin=bangzhu`
      })
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
    let openid = this.$root.$mp.query.openid
    // console.log(openid);
    if(openid){
      this.searchgoods(openid)
    }
  }
  
};
</script>
<style lang="scss" scoped>
$maincolor: #377BF0;
.card{
  // margin-bottom: 20rpx;
  border-bottom: 12rpx solid #e5e5e5;
}
</style>
