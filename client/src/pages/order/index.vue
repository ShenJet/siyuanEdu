<template>
  <!-- @click="clickHandle('test click', $event)" -->
  <div class="container">
    <div class="header main">
      <div class="u">订单详情</div>
      <div class="m">
        <div class="l">
          <img :src="goodsdetail.thumbnail" mode='widthFix' alt="">
        </div>
        <div class="m">
          {{goodsdetail.name}}
        </div>
        <div class="r">
          ￥{{goodsdetail.currentPrice}}
        </div>
      </div>
      <div class="d">
          数量：
          <button @click="count>1?count--:''" :disabled='count<=1'>-</button>
          <input type="text" v-model='count' disabled>
          <button @click="count++">+</button>
      </div>

    </div>
    <div class="fahuo main">
      <div class="u">注意事项</div>
      
      <div class="m">
        <table>
        <tr>
          <td>发货方式 :</td>
          <td>{{goodsdetail.deliveryMethods}}</td>
        </tr>
        <tr>
          <td>发货地 :</td>
          <td>{{goodsdetail.deliveryArea}}</td>
        </tr>
        <tr>
          <td>发货时间 :</td>
          <td>{{goodsdetail.deliveryTime}}</td>
        </tr>
        <!-- <tr>
          <td>可购区域 :</td>
          <td>{{goodsdetail.targetArea_name}}</td>
        </tr> -->
        <tr>
          <td>是否包邮 :</td>
          <td>{{goodsdetail.shipping?'包邮':'不包邮'}}</td>
        </tr>
      </table>
      </div>
    </div>
    <div class="main shouhuo">
      <div class="u">
        <span>收货地址</span>
        <span class="add" @click='toaddress'>添加收货地址></span>
      </div>
      <div class="m">
        <!-- @change="radioChange" -->
        <radio-group class="radio-group" >
          <label class="radio" v-for="(x,i) in address" :key="i" @click="radioChange1(i)">
            <radio :value="i" :checked="x.checked" >
            <div>
              <div>
                {{x.userName}}-{{x.telNumber}}
              </div>
              <div>
                {{x.provinceName}}-{{x.cityName}}-{{x.countyName}}-{{x.detailInfo}}
              </div>
            </div>
            </radio>
          </label>
        </radio-group>
      </div>
    </div>
    <div class="main beizhu">
      <div class="u">订单备注</div>
      <div class="m">
        <textarea v-model="beizhu" name="beizhu" id=""></textarea>
      </div>
    </div>
    <div class="spacing"></div>
    <div class="foot">
      <div class="item s part1">
        <div @click="routeToHome">
          <i class="iconfont icon-shouye"></i>
          返回首页
        </div>
      </div>
      <div class="item b part4">
        总计:￥{{totalfee || 0}}
      </div>
      <div class="item b part5" hover-class="hoverbtn" @click="paynow">确认付款</div>
    </div>
    
  </div>
</template>

<script>
import checkscope from "@/wxapis/check_scope";
import authorize from "@/wxapis/authorize";
import openSetting from "@/wxapis/openSetting";
import chooselocation from "@/wxapis/chooselocation";
import modal from "@/wxapis/modal";
import wxpay from "@/wxapis/wxpay";
import clientpaid from "@/wxapis/clientpaid";

import qc from 'wafer2-client-sdk'
import conf from '@/config'

import slogan from "@/components/slogan";
import goodsItem from "@/components/goodsitem";

export default {
  data() {
    return {
      userInfo: {},
      location: "尚未获取定位",
      goodsdetail:{},
      img:'',
      goodsid:'',
      count:1,
      address:[],
      which: '',
      beizhu:'',
      provincecode: '',
      citycode: '',
      countrycode: '',
      origin:''
    };
  },
  components: {
    slogan,
    goodsItem
  },
  computed:{
    totalfee:function(){
      return (this.goodsdetail.currentPrice * 10 * 10) * this.count / 100
    }
  },
  methods: {
    toaddress(){
      wx.navigateTo({
        url:'/pages/myaddress/main'
      })
    },
    async changelocation() {
      // 检查定位授权
      let locationAuth = await checkscope("scope.userLocation"); //userInfo
      // console.log(66, locationAuth);
      if (!locationAuth) {
        let locationAuthRes = await authorize("scope.userLocation");
        // console.log(75, locationAuthRes);
        if (locationAuthRes.errMsg == "authorize:ok") {
          // 同意
          let location = await chooselocation();
          // console.log(location);
        } else {
          // 拒绝了
          let modalres = await modal({
            content: "打开定位可以看到离你最近的批发商哦",
            cancelText: "放弃推荐",
            confirmText: "打开定位"
          });
          // console.log(86, modalres);
          if (modalres) {
            // 打开设置页面
            let settingres = await openSetting();
            // console.log(settingres);
            if (settingres["scope.userLocation"]) {
              // 已打开定位
              wx.showToast({
                title: "定位打开成功",
                icon: "none",
                duration: 1000
              });
              let location = await chooselocation();
              // console.log(location);
            } else {
              wx.showToast({
                title: "您没有打开定位",
                icon: "none",
                duration: 1000
              });
            }
          }
        }
      } else {
        let location = await chooselocation();
        // console.log(location);
        this.location = location.name;
      }
    },
    routeToHome() {
      let url = "/pages/index/main";
      // console.log(url);
      wx.switchTab({ url });
    },
    contact() {},
    async getstorage(x){
      let res = await Promise(function(resolve, reject){
        wx.getStorage({
        key: x,
        success(res) {
          // console.log(res);
          
          if(res && res.length){
            resolve(res.data)
          }else{
            resolve(false)
          }
         
        },
        fail(){
          resolve(false)
        }
      })
      })
      return res
    },
    selectaddress(){
      let address = wx.getStorageSync('address')
      // console.log(address);
      if(!address || address.length == 0 || address.length == {} ){
        return wx.showModal({
          title:"提示",
          content:"请先添加收货地址",
          success(res){
            if(res){
              wx.navigateTo({
                url:"/pages/myaddress/main"
              })
            }else{

            }
          }
        })
      }
      this.address = address
      // this.address[0].checked = true
      // this.which
      // this.showedit = true
    },
    async paynow() {
      // console.log(this.which);
      var self = this
      if(!this.which ){
        return wx.showToast({
          title:'请选择收货地址',
          icon:'none',
          duration:1500
        })
      }
      if(!this.origin ){
        return wx.showToast({
          title:'订单错误，请重新下单',
          icon:'none',
          duration:1500
        })
      }
      // return console.log(this.which);
      
      wx.showLoading({
        title: 'Loading...',
      })
      // 统一下单 生成订单号
      // qcloud.request  https://github.com/tencentyun/wafer-client-sdk#request
      qc.request({
        login:false,
        url: conf.service.prepayUrl,
        method:"POST",
        data:{
          origin: self.origin,
          // count: self.count,
          // _id: self.goodsdetail._id,
          goodslist:[{
            _id: self.goodsdetail._id,
            count: self.count
          }],
          receipt: self.which,
          beizhu:self.beizhu,
          provincecode: self.provincecode,
          citycode: self.citycode,
          countrycode: self.countrycode,
          from: 'goodsdetail'
        },
        success:async function(res) {
          wx.hideLoading();
          // console.log('统一下单返回：');
          // console.log(res.data);
          if(res.data.code == 1 && res.data.success){
            // console.log('支付中');
            let payres = await wxpay( res.data.data );
            // console.log('payres', payres)
            // console.log('支付流程结束，支付成功~')
            if(payres.errMsg == 'requestPayment:ok'){
              // 前端订单支付完成 等待商家核验（等待微信通知回调） 
              let clientpaidres = await clientpaid(res.data.data)
              // console.log('前端订单支付完成 等待商家核验');
              
              wx.showToast({
                title: clientpaidres.msg, 
                duration: 1500,
                icon:'success',
                mask:true,
                complete:function(){
                  setTimeout(function(){
                    wx.navigateTo({
                      url:"/pages/orderlist/main?index=0"
                    })
                  },1500)
                }
              })
            }else{
              wx.showToast({
                title: '支付失败',
                 duration: 1000,
                  icon:'none',
                  mask:true ,
                  complete:function(){
                    wx.navigateTo({
                      url:"/pages/orderlist/main?index=0"
                    })
                  }
              })
            }
          }else{
            wx.showToast({
              title: "系统错误，请重新下单",
              icon: 'none',
              duration: 2000,
              complete:function(){
                setTimeout(function(){
                  // wx.navigateBack({
                  //   delta: 1
                  // })
                },2000)
              }
            })
          }
        },
        fail: function(err) {
          // console.log(err);
          // console.log('支付流程结束，支付失败~')
          // wx.hideLoading();
          wx.showToast({
              title: '下单失败,请先登录', 
              duration: 1000,
              icon:'none',
              mask:true,
              complete:function(){
                wx.switchTab({
                  url:"/pages/my/main"
                })
              }
          })

          
        },
        complete:function(){
          // wx.hideLoading();
        }
      });

    },
    radioChange(x){
      // console.log(x.mp.detail.value);
      let k = parseInt(x.mp.detail.value)
      // console.log(k,this.address[k] );

      let xx = this.address[k]
      let arr = xx.nationalCode.split('')
      this.provincecode = arr[0] + arr[1]
      this.citycode = arr[2] + arr[3]
      this.countrycode = arr[4] + arr[5]

      let yy = JSON.stringify(this.address[k])
      // console.log(yy);
      
      this.which = yy
    },
    radioChange1(k){
      // console.log(k);
      // console.log(k,this.address[k] );
      
      this.address.map(function(v,i){
        delete v.checked
      })

      this.address[k].checked = true

      let xx = this.address[k]

      let arr = xx.nationalCode.split('')
      this.provincecode = arr[0] + arr[1]
      this.citycode = arr[2] + arr[3]
      this.countrycode = arr[4] + arr[5]

      let yy = JSON.stringify(this.address[k])
      // console.log(yy);
      
      this.which = yy
      
    }
  },
  onShow(){
    this.count = 1
    let {goodsdetail, origin} = this.$root.$mp.query
    // console.log(goodsdetail);
    this.goodsdetail = JSON.parse(goodsdetail)
    this.origin = origin

    this.selectaddress()

    
  }
};
</script>

<style scoped lang='scss'>
$maincolor: #377BF0;

.main{
  border-top: 20rpx solid #f5f5f5 ;
  padding: 00rpx 20rpx 10rpx;
  .u{
    color: #b3b3b3;
    font-size: 32rpx;
    // font-size: 13pt;
    border-bottom: 1px solid #f5f5f5;
  }
}
.shouhuo{
  .u{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .m{
    font-size: 30rpx;
  }
}
.beizhu{
  .m{
    padding-top: 10rpx;
    font-size: 30rpx;
    textarea{
      border: 1rpx solid #e5e5e5;
      width: 690rpx;
      height: 200rpx;
      border-radius: 12rpx;
      padding: 10rpx;
    }
  }
}
.spacing{
  height: 120rpx;
}
.header{
  
  &>.m{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 10rpx 0 0;
    border-bottom: 1px solid #f5f5f5;
    .l{
      width: 25%;
      img{
        width: 90%;
        max-height: 150rpx;
      }
    }
    .m{
      width: 50%;
      text-align: left!important;
      display: flex;
      justify-content: flex-start;
      padding-left: 25rpx;
      font-size: 32rpx;
    }
    .r{
      width: 25%;
      font-size: 32rpx;
      text-align: center!important;
    }
  }
  .d{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 10rpx 0 0;
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
}
.fahuo{
  .u{
    color: $maincolor;
    font-weight: 700;
  }
  .m{
    table{
      width: 80%;
      margin: 0 auto;
      font-size: 32rpx;
      color: #000;
      tr{
        display: flex;
        flex-direction: row;
        // justify-content: space-around;
        td:first-child{
          width: 30%;
        }
        td:last-child{
          width: 70%;
        }
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
    width: 24%;
    display: flex;
    flex-direction: row;
    text-align: center;
    font-size: 26rpx;
    height: 100rpx;
    overflow: hidden;
    & > div {
      width: 100%;
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
    // background-color: #ffe900;
    color: #000;
    font-size: 35rpx;
    width: 46%;
    color: $maincolor;
    text-align: center;
    font-weight: 700;
  }
  .part5 {
    background-color: $maincolor;
    color: #fff;
    font-size: 35rpx;
    text-align: center;
  }
  .hoverbtn {
    background-color: #9c2518;
  }
}
.modalcon {
    // height: 40vh;
    width: 650rpx;
    background-color: #fff;
    position: fixed;
    top: 25%;
    left: 30rpx;
    z-index: 2;
    border-radius: 20rpx;
    border: 1px solid #ccc;
    padding: 0 20rpx;
    font-size: 32rpx;
    transition: 0.3s;
    .title {
      padding: 8rpx 0 12rpx;
      border-bottom: 1px solid #e5e5e5;
      text-align: center;
      height: 40rpx;
      line-height: 40rpx;
      font-size: 30rpx;
    }
    label{
      display: flex;
      flex-direction: row;
      font-size: 30rpx;
    }
    .modalfoot{
      display: flex;
      flex-direction: row;
      .closemodal{
        background-color: #fff;
        border:1rpx solid $maincolor;
        height: 48rpx;
        line-height: 48rpx;
        font-size: 32rpx;
        color: $maincolor;
        width: 30%;
        margin: 20rpx auto;
      }
      .closeedit{
        background-color: $maincolor;
        height: 50rpx;
        line-height: 50rpx;
        font-size: 32rpx;
        color: #fff;
        width: 30%;
        margin: 20rpx auto;
      }
    }
  }
</style>
