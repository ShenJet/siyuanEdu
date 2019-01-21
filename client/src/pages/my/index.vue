<template>
  <div class="container">
    <!-- <open-data type="userAvatarUrl"></open-data>
    <open-data type="userNickName"></open-data>-->
    <div class="mainpart top">
      <div class="l">
        <img :src="userInfo.avatarUrl" alt="原始头像" mode="widthFix">
      </div>
      <!--  -->
      <div class="m1 m" v-if="!logged">
        <button class="loginbtn" open-type="getUserInfo" @getuserinfo="getUserInfo">立即登录</button>
      </div>
      <div class="m2 m" v-if="logged">
        <span>{{userInfo.nickName}}</span>
        <span class="label" v-if="userInfo.rolename=='普通会员'">{{userInfo.rolename || '普通会员'}}</span>
        <span class="label" v-if="userInfo.rolename=='普通会员'">{{userInfo.rolename || '普通会员'}}</span>
        <span class="label" v-if="userInfo.rolename=='普通会员'">{{userInfo.rolename || '普通会员'}}</span>
        <span class="label" v-if="userInfo.rolename=='普通会员'">{{userInfo.rolename || '普通会员'}}</span>

      </div>
      <div class="r"></div>
    </div>
    <div class="mainpart mid">
      <div class="head">
        <div class="myorder">我的订单</div>
        <div class="toall" @click='toorderlist(0)'>查看全部
          <i class="iconfont icon-tubiao_xiangyou"></i>
        </div>
      </div>
      <div class="list">
        <div @click='toorderlist(1)'>
          <i class="iconfont icon-fukuan i1"></i>
          <div>待付款</div>
        </div>
        <div @click='toorderlist(2)'>
          <i class="iconfont icon-icon-test i2"></i>
          <div>待发货</div>
        </div>
        <div @click='toorderlist(3)'>
          <i class="iconfont icon-yifahuodefuben i3"></i>
          <div>已发货</div>
        </div>
        <div @click='toorderlist(4)'>
          <i class="iconfont icon-yiwanchengdingdan i4"></i>
          <div>已完成</div>
        </div>
        <div @click='toorderlist(5)'>
          <i class="iconfont icon-tui i5"></i>
          <div>退换货</div>
        </div>
      </div>
    </div>
    <div class="mainpart btm">
      <div class="list" @click="toaddress">收货地址
        <i class="iconfont icon-tubiao_xiangyou"></i>
      </div>
      <div class="list">
        <button class="contact" open-type='contact'>联系我们</button>
        <i class="iconfont icon-tubiao_xiangyou"></i>
      </div>
      <div class="list" @click="tomymoney">我的余额
        <i class="iconfont icon-tubiao_xiangyou"></i>
      </div>
      <div class="list" @click="tomygoods">我的发布
        <i class="iconfont icon-tubiao_xiangyou"></i>
      </div>
      <!-- <div class="list">我的邀请
        <i class="iconfont icon-tubiao_xiangyou"></i>
      </div> -->
      <!-- <div class="list">联系我们
        <i class="iconfont icon-tubiao_xiangyou"></i>
      </div> -->
    </div>
    <i-load-more class="footer" tip="苏州任意门软件提供技术支持" @click="showrenyimen" />

  </div>
</template>
<script>
import qc from 'wafer2-client-sdk'
import config from '@/config'

import checkscope from '@/wxapis/check_scope'

export default {
  
  data: function() {
    return {
      logged: false,
      userInfo: {
        avatarUrl: "/static/img/initialAvatar.png",
        city: "",
        country: "",
        gender: 1, //0：未知、1：男、2：女
        language: "zh_CN",
        nickName: "",
        province: ""
      }
    };
  },
  created() {
    //
    var self = this;
    
  },
  onShow(){},
  onLoad(){
    wx.showShareMenu({
      withShareTicket: true
    })
    // this.getUserInfo()
    // console.log('my onload');
    let loginstate = this.globalData.loginstate;
    // console.log('loginstate@my',loginstate);
    if(loginstate === true){
      this.userInfo = this.globalData.userInfo
      this.logged = true
    }else{
      this.logged = false
      this.userInfo = {
        avatarUrl: "/static/img/initialAvatar.png",
      }
    }
  },
  methods: {
    showrenyimen(){
      wx.showModal({
        title:"联系方式",
        content:"138-148-78101"
      })
    },
    showBusy: text =>
      wx.showToast({
        title: text,
        icon: "loading",
        duration: 10000
      }),

    // 显示成功提示
    showSuccess: text =>
      wx.showToast({
        title: text,
        icon: "success"
      }),

    // 显示失败提示
    showModel: (title, content) => {
      wx.hideToast();
      wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
      });
    },
    async getUserInfo() {
      var self = this;
      // 调用登录接口
      
      const session = qc.Session.get();
      // console.log('session：',session);

      let checkscoperes = await checkscope('scope.userInfo')
      // console.log( 'my checkscoperes' ,checkscoperes);
      
      if ( session ){
        // console.log('二次登录');
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qc.loginWithCode({
          success: res => {
            self.userInfo=res
            self.logged=true

            self.globalData.loginstate = true
            self.globalData.userInfo = res

            self.showSuccess("登录成功");
          },
          fail: err => {            
            console.error('二次登录失败');
            self.userInfo = {avatarUrl: "/static/img/initialAvatar.png",}
            self.logged = false

            self.globalData.loginstate = false
            self.globalData.userInfo = {avatarUrl: "/static/img/initialAvatar.png",}
            self.showModel("登录提示", '登录失败，请检查网络');
          }
        });
      } else {
      //   // 首次登录
        this.showBusy("正在登录");
        // console.log('首次登录');
        qc.login({
          success: res => {
            self.userInfo = res
            self.logged = true 

            self.globalData.loginstate = true
            self.globalData.userInfo = res

            self.showSuccess("登录成功");
          },
          fail: err => {

            console.error('一次登录失败');
            console.error(err);

            self.userInfo = {avatarUrl: "/static/img/initialAvatar.png",}
            self.logged = false 

            self.globalData.loginstate = false
            self.globalData.userInfo = {avatarUrl: "/static/img/initialAvatar.png",}

            // self.showModel("登录错误", err.message);
            self.showModel("登录提示", '登录失败，请检查网络');
          }
        });
      }

    },
    toorderlist(x){
      wx.navigateTo({
        url:`/pages/orderlist/main?index=${x}`
      })
    },
    toaddress(){
      wx.navigateTo({
        url:"/pages/myaddress/main"
      })
    },
    tomymoney(){
      wx.navigateTo({
        url:"/pages/mymoney/main"
      })
    },
    tomygoods(){
      wx.navigateTo({
        url:"/pages/myrelease/main"
      })
    }
  }
};
</script>
<style lang="scss" scoped>
$maincolor: #377BF0;
.container {
  height: 100vh;
  background-color: #fff;
  .mainpart {
    padding: 20rpx;
    background-color: #fff;
    border-bottom: 12rpx solid rgb(233, 233, 233);
  }
  .top {
    display: flex;

    .l {
      // width: 128rpx;
      padding-left: 20rpx;
      img {
        width: 128rpx;
        height: 128rpx;
        float: left;
        border: 1px solid rgb(233, 233, 233);
        border-radius: 64rpx;
      }
    }
    .m {
      display: flex;
      //   background-color: pink;
      padding-left: 40rpx;
      //   flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .loginbtn {
        background-color: $maincolor;
        color: #fff;
      }
    }
    .r {
      background: #377BF0;
    }
  }
  .mid {
    .head {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .myorder {
        font-family: Courier, monospace;
        font-size: 36rpx;
      }
      .toall {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: rgb(156, 156, 156);
        font-size: 32rpx;
      }
    }
    .list {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      & > div {
        text-align: center;
        i {
          height: 75rpx;
          font-size: 75rpx;
          line-height: 75rpx;
          // color: rgb(166,166,166);
          color: $maincolor;
        }
        .i2{
          font-size: 65rpx;
        }
        .i3{
          font-size: 85rpx;
          
        }
        .i4{
          font-size: 60rpx;
        }
        .i5{
          font-size: 62rpx;
        }
        div {
          font-size: 32rpx;
          color: rgb(89, 89, 89);
        }
      }
    }
  }
  .btm {
    font-size: 32rpx;
    .list {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 75rpx;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
    }
    .contact{
      background-color: #fff;
      color: #000;
      border: 1px solid transparent;
      margin: 0;
      height: 70rpx;
      line-height: 70rpx;
      padding: 0;
      font-size: 32rpx;
    }
    button::after{
      border: 0;
    }
  }
  .footer{
    position: fixed;
    width: 100%;
    bottom: 0;
    height: 50rpx;
    color: #e5e5e5;
  }
}
</style>
