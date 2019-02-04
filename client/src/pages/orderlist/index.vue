<template>
  <div class="container">
    <div class="nav">
      <nav-bar :tabs="tabs" :activeIndex="index" @tabClick="tabClick"></nav-bar>
    </div>
    <div class="main">
      <!-- <orderlist-item></orderlist-item> -->
      <div class="ordercon" v-for='(x,i) in which' :key="i" >
        <div class="header main">
          <div class="u">
            <div class="status">
              {{statusname[x.status]}}
            </div>
            <div class="time">
              {{ x._createtime }}
            </div>
          </div>
          <div class="m" @click="toorderdetail(x)">
            <div class="l">
              {{ x.goodsinfo.name }} {{ x.goodsinfo.coursetype }}-{{ x.goodsinfo.coursename }}
            </div>
            <div class="r">
              <div class="total_fee">总价:￥{{x.total_fee/100}}</div>
            </div>
          </div>
          <div class="round">
            <span class="iconfont icon-round"></span>
            {{ x.goodsinfo.citylabel }}
          </div>
          <div class="d">
              <button plain type="warn" @click='deleteModal(x)'  v-if="x.status==1 || x.status==6 || x.status==8|| x.status==10">删除订单</button>
          </div>
        </div>
      </div>
    <div class="nothing" v-if='!which.length'>
      <i class="iconfont icon-quanbudingdan01"></i>
      <div>您还没有相关订单</div>
    </div>
  </div> 

  </div>
</template>

<script>
import checkscope from "@/wxapis/check_scope";
import authorize from "@/wxapis/authorize";
import openSetting from "@/wxapis/openSetting";
import modal from "@/wxapis/modal";
import qc from 'wafer2-client-sdk'
import conf from '@/config'
// 组件：
// import mpNavbar from 'mpvue-weui/src/navbar';

import navBar from '@/components/navbar';
import orderlistItem from '@/components/orderlistitem';

/*
 * 订单状态定义：
 * 下单 但取消支付
 * 1 : 下单，但未支付。可以做的事：删除订单（没支付的订单等同于作废，只能进行删除操作）
 * 下单 且支付了
 * 2 : 前台已支付完成，把订单设置为‘商户确认中’状态，注意只有当status=1的订单才能改 。可以做的事：啥都不可操作
 * (废弃)2 : 商户查询结果是未支付。可以做的事：支付
 * (废弃)3 : 商户查询结果是已支付 处于已支付，待发货状态。可以做的事：退款
 * 4 : 后台服务器收到了来自微信的订单通知，订单确实已支付。需要判断订单是否已发货，处于已发货，则不改写订单status；如果处于未发货则修改为4。
 */ 

export default {
  data() {
    return {
      tabs: ['支付成功','支付失败','全部'],
      tabstate:['paid','unpay','all'],
      paid:[],
      unpay:[],
      all:[],
      which:[],
      index:0,
      statusname:{
        1:'未支付',
        2:'待商户确认',
        3:'待商户确认',
        4:'已支付'
      }
    };
  },
  components: {
    navBar, orderlistItem
  },
  onLoad(){
    let routeParam = this.$root.$mp.query
    // console.log(routeParam);
    this.index = parseInt(routeParam.index)
  },
  methods: {
    toorderdetail(x){
      
    },
    deleteModal(x){
      var self = this
      wx.showModal({
        title: '提示',
        content: '确定删除订单？',
        success(res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            self.deleteOrder(x)
          } else if (res.cancel) {
          }
        }
      })
    },
    deleteOrder(x){
      var self = this
      wx.showLoading({
        title:'订单删除中...'
      })
      qc.request({
        // login:true,
        url: conf.service.deleteorderUrl,
        // method:"POST",
        data:{
          orderid : x.orderid
        },
        success:function(res) {
          wx.hideLoading();
          // console.log(res.data.msg);
          
          wx.showToast({
              title: res.data.msg, 
              duration: 1500,
              icon:'none',
              mask:true
          })
          self.getorderlist()
        },
        fail: function(err) {
          wx.hideLoading();
          // console.log(err);
          wx.showToast({
              title: '请求失败，请检查网络', 
              duration: 1500,
              icon:'none',
              mask:true
          })
        },
        complete:function(){
          
        }
      });
    },
    tabClick:function(x){
      // console.log(x);
      this.index = x
      this.which = this[this.tabstate[x]]
      // console.log('which:',this.which);
    },
    getorderlist(){
      wx.showLoading({
          title: '订单加载中...', 
          mask:true
      })
      var self = this
      qc.request({
        url: conf.service.getOrderList,
        data:{
          state : 'all'
        },
        success:function(res) {
          wx.hideLoading();
          // console.log(res.data.data);
          self.all = res.data.data
          self.unpay = res.data.data.filter(function(v, i){
            return v.status == 1 || v.status == 2 || v.status == 3
          })
          self.paid = res.data.data.filter(function(v, i){
            return v.status == 4
          })
          
          self.which = self[self.tabstate[self.index]]
          
        },
        fail: function(err) {
          wx.hideLoading();
          
          // console.log(err);
          wx.showToast({
              title: '请求失败，请检查网络', 
              duration: 1000,
              icon:'none',
              mask:true
          })
        },
        complete:function(){
          wx.stopPullDownRefresh()
        }
      });
    }
    
  },
  onShow() {
    this.getorderlist()
  },
  onPullDownRefresh(){
    this.getorderlist()
  }
};
</script>

<style lang='scss'>
$maincolor: #377BF0;
.weui-navbar__item.weui-bar__item_on {
  color: $maincolor!important;
}
.weui-navbar-slider-on.data-v-79639602 {
  background-color: #377BF0!important;
}
</style>
<style scoped lang='scss'>
  $maincolor: #377BF0;
  .nav{
    position: fixed;
    top: 0;
    width:100%;
    height: 106rpx;
    background-color:#fff;
    z-index: 999;
  }
  .main{
    padding-top: 106rpx;
  }
  .nothing{
    display:flex;
    flex-direction: column;
    justify-content:center;
    padding-top: 50rpx;
    i{
      font-size:200rpx;
      line-height:200rpx;
      text-align:center;
      color: #ccc;
    }
    div{
      font-size:34rpx;
      text-align:center;
    }
  }
  .ordercon{
    .main{
  border-top: 20rpx solid #f5f5f5 ;
  padding: 20rpx 20rpx;
  .u{
    color: #b3b3b3;
    font-size: 32rpx;
    // font-size: 13pt;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    flex-direction: row;
    .status{
      padding: 0 15rpx 0 0;
      border-right: 1px solid #f5f5f5;
      color: $maincolor;
    }
  }
}

.header{
  
  &>.m{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 20rpx 0;
    border-bottom: 1px solid #f5f5f5;
    
    .l{
      font-size: 32rpx;
      width: 60%;
      text-align: left;
      img{
        width: 90%;
      }
    }
    .r{
      width: 40%;
      font-size: 32rpx;
      .count{
        color:#ccc;
      }
      .total_fee{
        text-align: right;
      }
    }
  }
  .round{
    font-size: 30rpx;
    color: #c9c9c9;
  }
  .d{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 20rpx 0 0;
    button{
      // width: 60rpx;
      height: 45rpx;
      padding: 0 8rpx;
      line-height: 40rpx;
      text-align: center;
      font-size: 30rpx;
      margin: 0 0 0 12rpx;
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
}
  }
</style>
