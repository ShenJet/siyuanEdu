<template>
  <div class="container">
    <div class="head">
      <div class="title">
        {{newsdetail.title}}
      </div>
      <div class="view">
        <div class="r">
          作者:{{newsdetail.author}} 发布时间:{{newsdetail.time}} 
        </div>
      </div>
      <!-- <rich-text class="brdesc"> -->
        <!-- <p>请输入    内容...</p><p><strong>asdasd   asdasd</strong></p><p><strong style="color: rgb(250, 204, 204);">asdasdasdasd</strong></p><ol><li><strong style="color: rgb(250, 204, 204);">11123432sf</strong></li><li><strong style="color: rgb(250, 204, 204);">fsdfsdfsd</strong><img src="data:image/png;base64,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"></li><li><strong style="color: rgb(250, 204, 204);">dfgsdfgsdfg</strong></li></ol><p><strong style="color: rgb(0, 102, 204);"><u>asdasdasda</u></strong></p>
      -->
      <div class="vhtml" v-html="newsdetail.content"></div>
      <!-- </rich-text> -->
    </div>
    <i-load-more tip="文章到底啦" :loading="false" />
  </div>
</template>
<script>
import qc from 'wafer2-client-sdk'
import conf from '@/config'
export default {
  data() {
    return {
      newsdetail: {
        content:'<p>请输入    内容...</p><p><strong>asdasd   asdasd</strong></p><p><strong style="color: rgb(250, 204, 204);">asdasdasdasd</strong></p><ol><li><strong style="color: rgb(250, 204, 204);">11123432sf</strong></li><li><strong style="color: rgb(250, 204, 204);">fsdfsdfsd</strong></li><li><strong style="color: rgb(250, 204, 204);">dfgsdfgsdfg</strong></li></ol><p><strong style="color: rgb(0, 102, 204);"><u>asdasdasda</u></strong></p>',
        id:1,
        title:"测试新闻",
        time:"2019年3月25日17:30:37",
      },
      newsid:''
    };
  },
  components: {
  },
  methods: {
    getnewsdetail(){
      var self = this;
      qc.request({
        url: conf.service.newsdetailUrl,
        data:{
          id: self.newsid
        },
        success:function(res) {
          wx.hideLoading()
          self.newsdetail = res.data.data
        },
        fail(){
          wx.showToast({
            title:"获取学员信息失败，请检查网络",
            duration:1500
          })
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
    let newsid = this.$root.$mp.query.id
    console.log(newsid);
    
    if( !newsid ){
      return wx.showToast({
        title:'新闻信息有误，请返回重新选择',
        icon:'none',
        duration: 2000
      })
    }
    this.newsid = newsid
    this.getnewsdetail()
  },
  onShareAppMessage(){
    var self = this
    // console.log('share');
    return {
      title: '【92家教】最新新闻',
      path: `/pages/newsdetail/main?newsid=${self.newsid}`,
      // imageUrl: `${self.newsdetail.urls[0]}`,
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
.icon-time{
  color:$maincolor;
}
.icon-rili{
  color:$maincolor;
  font-size: 50rpx;
  position: relative;
  top: -10rpx;
  left: -6rpx;
  padding-right: 10rpx;
}
.icon-yanzheng1{
  color:$maincolor;
}
.icon-shenfenzheng{
  color:green;
  font-size: 34rpx;
}
.toptip{
  background: #efefef; 
  margin-top:12rpx;
  padding: 12rpx;
  text-align: center;   
  font-size: 28rpx;
  text-align: left;
  text-indent: 1.5em;
}

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
  .view{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    font-size: 32rpx;
    color: #c0c0c0;
    margin-bottom: 20rpx;
    .l{

    }
    .r{

    }
  }
  .vhtml{
    text-align: left;
    text-indent: 2em;
    font-size: 32rpx;
  }
  .title {
    font-size: 40rpx;
    font-weight: 700;
    max-width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0 auto;
    span{
      font-weight: normal;
      font-size: 36rpx;
    }
    img{
      width: 32rpx;
      height: 40rpx;
    }
  }
  .brdesc {
    color: rgb(107, 107, 107);
    max-width: 80%;
    margin: 0 auto;
    text-align: left;
    padding-bottom: 20rpx;
    // border-bottom:1rpx solid #eeeeee; 
  }
}
.qqmap{
  border-bottom:1px solid #e5e5e5; 
  .position{
    font-size: 30rpx;
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
    height: 10rpx;
  }
.dtdesc{
  word-break: break-all;
  
  padding: 0rpx 20rpx 20rpx;
  font-size: 32rpx;
  
  div{
    text-indent: 2em;
  }
}
.teachinfo{
  font-weight: 600;
  font-size: 40rpx;
  text-align: center;
}
.detail{
  font-size: 34rpx;
  .line{
    display: flex;
    flex-direction: row;
    .l{
      width: 200rpx;
      box-sizing: border-box;
      padding-right: 26rpx;
      text-align: right;
      font-weight: 600;
    }
    .r{
      width: 510rpx;
      display: flex;
      align-items: flex-start;
      span{
        display: inline-block;
        padding-right: 10rpx;
      }
    }
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
    font-size: 36rpx;
    text-align: center;
  }
  .part5 {
    background-color: $maincolor;
    color: #fff;
    font-size: 36rpx;
    text-align: center;
  }
  .hoverbtn1 {
    background-color: rgb(199, 129, 0);
  }
  .hoverbtn {
    background-color: rgb(39, 102, 211);
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