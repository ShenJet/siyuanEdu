<template>
  <div class="page">
    <div class="main">
      <div class="ordercon" v-for='(x,i) in releaselist' :key="i" >
        <div class="header main">
          <div class="m">
            <div class="l" @click="tocollectdetail(x)">
              {{ x.name }} {{ x.coursetype }} {{ x.coursename }}
            </div>
            <div class="r">
              <div class="refresh" @click="refresh(x)" >擦亮信息</div>
            </div>
          </div>
          <div class="round" @click="tocollectdetail(x)">
            <span class="iconfont icon-round"></span>
            {{ x.citylabel }}
          </div>
          <div class="d">
              <button plain type="primary" @click='deleteModal(x)'>编辑</button>
              <button plain class="down"  @click='deleteModal(x)'>暂时下架</button>
              <button plain type="warn" @click='deleteModal(x)'>删除</button>
          </div>
        </div>
      </div>
      <div class="nothing" v-if='!releaselist.length'>
        <i class="iconfont icon-quanbudingdan01"></i>
        <div>您尚未发布过任何信息</div>
      </div>
    </div> 
    <i-load-more v-if='releaselist.length' tip="我是有底线的" :loading="false" />
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
      courses:[["小学","初中","高中","艺术","兴趣"], ["语文","数学","英语","物理","化学","钢琴","古筝","画画","舞蹈","棋类","其他"]],
      sexes:['男老师','女老师','都可以'],
      roles:['专职教师','大学生','都可以'],
      sex:'',
      role:'',
      releaselist: [],
      pageindex:1,
      coursetype:'',
      coursename:'',
      province:'',
      city:'',
      country:'',
    }
  },
  methods:{
    refresh(x){
      console.log(x);
      
    },
    getrelease(){
      var self = this
      wx.showLoading({
        title:"Loading..."
      })
      qc.request({
        data:{},
        url: conf.service.myreleaseUrl,
        success(res){
          self.releaselist = res.data.data
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
    teacherdetail(x){
      let loginstate = this.globalData.loginstate;
      if(loginstate === true){
        let url = `/pages/teacherdetail/main?openid=${x.openid}`
        wx.navigateTo({
          url
        })
      }else{
        wx.showToast({
          title:'用户尚未登录，请先登录',
          duration: 1800,
          icon:'none',
          mask: true,
          complete(){
            setTimeout(function(){
              let url = `/pages/my/main`
              wx.switchTab({
                url
              })
            },1900)
          }
        })
      }
    }
  },
  created () {

  },
  onShow() {
    let coursename = this.globalData.coursename
    console.log(coursename);
    
    if(coursename){
      this.coursename = coursename ;
      this.getrelease()
    }
    
  },
  onLoad(){
    this.getrelease()
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
