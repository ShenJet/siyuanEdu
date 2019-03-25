<template>
  <div class="page">
    <div class="main">
      <div class="ordercon" v-for='(x,i) in newslist' :key="i" >
        <div>{{x.title}}</div>
        <div>{{x.time}}</div>
      </div>
      <div class="nothing" v-if='!newslist.length'>
        <i class="iconfont icon-quanbudingdan01"></i>
        <div>暂无任何新闻</div>
      </div>
    </div> 
    <i-load-more v-if='newslist.length' tip="已经到底啦" :loading="false" />
  </div>
</template>

<script>
import qc from 'wafer2-client-sdk'
import conf from '@/config'

export default {
  components: {
  },

  data () {
    return {
      newslist: [],
    }
  },
  methods:{
    getnewslist(){
      var self = this
      wx.showLoading({
        title:"Loading..."
      })
      qc.request({
        data:{},
        url: conf.service.newslistUrl,
        success(res){
          self.newslist = res.data.data
          wx.hideLoading()
          wx.showToast({
            title:res.data.msg,
            icon:'none',
            duration:1400
          })
        },
        fail(){
          wx.hideLoading()
          wx.showToast({
            title:'网络连接失败',
            icon:'none',
            duration:1400
          })
        },
        complete(){
          wx.stopPullDownRefresh()
        }
      })
    },
    todetail(x){
      let url = `/pages/my/main?newsid=${x.id}`
      wx.navigateTo({
        url
      })
    },
    created () {

    },
    onShow() {
      
    },
    onLoad(){
      this.getnewslist()
    },
    onPullDownRefresh(){
      this.getnewslist()
    }
  }
}
</script>

<style lang='scss' scoped>
$maincolor: #377BF0;
.main {
  // padding-top: 106rpx;
}
.ordercon {
  .main {
    border-top: 20rpx solid #f5f5f5;
    padding: 20rpx 20rpx;
    .u {
      color: #b3b3b3;
      font-size: 32rpx;
      // font-size: 13pt;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      flex-direction: row;
      .status {
        padding: 0 15rpx 0 0;
        border-right: 1px solid #f5f5f5;
        color: $maincolor;
      }
    }
  }

  .header {
    .tip{
      font-size: 32rpx;
      color: red;
    }
    .tip::before{
      content: '';
      display: inline-block;
      background-color: red;
      width: 20rpx;
      height: 20rpx;
      border-radius: 10rpx;
      margin-right: 5rpx;
    }
    & > .m {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding: 20rpx 0;
      border-bottom: 1px solid #f5f5f5;

      .l {
        font-size: 32rpx;
        width: 70%;
        text-align: left;
        img {
          width: 90%;
        }
      }
      .r {
        width: 25%;
        font-size: 32rpx;
        .refresh {
          text-align: center;
          color: #fff;
          background-color: $maincolor;
          border-radius: 6rpx;
        }
      }
    }
    .round {
      font-size: 30rpx;
      color: #c9c9c9;
    }
    .d {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      padding: 20rpx 0 0;
      button {
        // width: 60rpx;
        height: 45rpx;
        padding: 0 8rpx;
        line-height: 40rpx;
        text-align: center;
        font-size: 30rpx;
        margin: 0 0 0 12rpx;
      }
      input {
        width: 100rpx;
        height: 60rpx;
        padding: 0;
        line-height: 60rpx;
        text-align: center;
        font-size: 40rpx;
      }
      .down{
        color: orange;
        border: 1rpx solid orange;
      }
      .release{
        color: $maincolor;
        border: 1rpx solid $maincolor;
      }
    }
  }
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
</style>
