<template>
  <div class="con">
    <div class="title" v-if="tixianlist.length==0">无可用余额</div>
    <div class="tixian" v-if="tixianlist.length!=0">
        <div class="tr tr1">
            <span class="l">序号</span>
            <div class="m">可提金额（元）</div>
            <div class="r">操作</div>
        </div>
        <div class="tr" v-for="(x,i) in tixianlist" :key='i'>
            <span class="l">{{i+1}}</span>
            <div class="m">{{x.total_fee/10/10}}</div>
            <div class="r">
                <button hover-class='btnhover' @click='tixianmodal(x)'>提现</button>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import qc from 'wafer2-client-sdk'
import conf from '@/config'

export default {
  data: function() {
    return {
      mymoney: 0.0,
      tixianlist: []
    };
  },
  methods: {
    // tixian(){
    //     wx.showToast({
    //         title:"余额不足",
    //         icon:"none",
    //         duration: 1500
    //     })
    // }
    
    getTixianList() {
        var self = this;
        wx.showLoading({
            title: "钱包数据获取中"
        });
        qc.request({
            url: conf.service.getTixianListUrl,
            data: {},
            success: function(res) {
            wx.hideLoading();
            // console.log(res.data.msg);
            self.tixianlist = res.data.data
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
    tixianmodal(x){
        var self = this
        wx.showModal({
            title: '提示',
            content: '确定提现吗？',
            success(res) {
            if (res.confirm) {
                // console.log('用户点击确定')
                self.tixian(x)
            } else if (res.cancel) {

            }
            }
        })
    },
    tixian(x){
        
      var self = this
      wx.showLoading({
        title:'提现请求中...'
      })
      qc.request({
        // login:true,
        url: conf.service.tixianUrl,
        // method:"POST",
        data:{
            orderid: x.orderid
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
          self.getTixianList()
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
          self.getTixianList()
        },
        complete:function(){
          
        }
      });
    }
  },
  onLoad() {
    // wx.showShareMenu({
    //     withShareTicket: true
    // })
  },
  onShow() {
    if (!this.globalData.loginstate) {
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
    this.getTixianList();
  },
  onPullDownRefresh(){
    this.getTixianList()
  }
};
</script>
<style lang="scss" scoped>
$maincolor: #377BF0;

.con {
  padding: 50rpx;
  & > div {
    text-align: center;
  }
  .title {
  }
  .money {
    font-size: 50rpx;
    // color: $maincolor;
    font-weight: 700;
  }
  .tixian {
    margin-top: 40rpx;
    button {
      background-color: $maincolor;
      width: 30%;
      color: #fff;
    }
    
    .tr{
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        align-items: center;
        padding: 10rpx 40rpx;
        border-top: 1rpx solid rgb(224, 224, 224);
        font-size: 32rpx;
        .l{
            display: inline-block;
            width: 20%;
            text-align: center;
        }
        .m{
            width: 50%;
        }
        .r{
            width: 30%;
            text-align: center;
            button{
                width: 90%;
                height: 60rpx;
                line-height: 60rpx;
            }
            .btnhover {
                background-color: rgb(150, 0, 0);
                color: rgb(206, 206, 206);
            }
        }
        
    }
  }
}
</style>
