<template>
  <div class="container">
    <div class="tab1con tabcon">
      <div>
        <i-card
          v-for="(x,i) in goodslist"
          :key="i"
          full
          :title="x.name"
          extra="删除商品"
          :thumb="x.thumbnail"
          :origin="x.origin"
          @click="deletemodal(x._id, x.origin)"
        >
          <!-- <view slot="content">{{x.detailDesc}}</view> -->
          <!-- <view slot="footer">
            <span class="iconfont icon-round"></span>
            {{x.deliveryArea}}
          </view> -->
        </i-card>
      </div>
    </div>
    <div class="none" v-if="goodslist.length<=0">
      暂无已发布商品
    </div>
  </div>
</template>
<script>
import qc from 'wafer2-client-sdk'
import conf from '@/config'

import checkscope from '@/wxapis/check_scope'

export default {
  
  data: function() {
    return {
      logged: false,
      goodslist:[]
    };
  },
  created() {
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
    if(!loginstate){
      return wx.showToast({
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
    this.getmyrelease()
  },
  onPullDownRefresh(){
    this.getmyrelease()
  },
  methods: {
    getmyrelease(){
        var self = this;
        wx.showLoading({
            title: "已发布商品获取中"
        });
        qc.request({
            url: conf.service.myreleaseUrl,
            data: {},
            success: function(res) {
              wx.hideLoading();
              // console.log(res.data.msg);
              self.goodslist = res.data.data
              wx.showToast({
                  title: res.data.msg,
                  duration: 1500,
                  icon: "none",
                  mask: true
              });
            },
            fail: function(err) {
              wx.hideLoading();
              // console.log(err);
              wx.showToast({
                  title: "请求失败，请检查网络",
                  duration: 1500,
                  icon: "none",
                  mask: true
              });
            },
            complete: function() {
                wx.stopPullDownRefresh()
            }
      });
    },
    deletemodal(id, origin){
      var self = this;
      wx.showModal({
          title:"提示",
          content:"商品删除后不可恢复",
          success(res){
            if(res.confirm){
              self.deletegoods(id, origin)
            }else{

            }
          }
        })
      
    },
    deletegoods(id, origin){
        var self = this;
        wx.showLoading({
            title: "商品删除中..."
        });
        qc.request({
            url: conf.service.deletemyreleaseUrl,
            data: {
              goodsid: id, origin
            },
            success: function(res) {
              wx.hideLoading();
              // console.log(res.data.msg);
              wx.showToast({
                  title: res.data.msg,
                  duration: 1500,
                  icon: "none",
                  mask: true
              });
            },
            fail: function(err) {
              wx.hideLoading();
              // console.log(err);
              wx.showToast({
                  title: "请求失败，请检查网络",
                  duration: 1500,
                  icon: "none",
                  mask: true
              });
            },
            complete: function() {
                wx.stopPullDownRefresh()
                self.getmyrelease()
            }
      });
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
  .none{
    text-align: center;
    font-size: 40rpx;
    width: 750rpx;
    padding:  40rpx 0;
  }
}
</style>
