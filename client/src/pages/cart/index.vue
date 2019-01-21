<template>
  <!-- @click="clickHandle('test click', $event)" -->
  <div class="container">
    <i-tabs :current="tabkey" color='#377BF0' @change="tabChange">
      <i-tab key="platform" title="平台好物" :count="platform.length"></i-tab>
      <i-tab key="bangzhu" title="帮主推荐" :count="bangzhu.length"></i-tab>
      <i-tab key="user" title="个人卖家"  :count="user.length"></i-tab>
    </i-tabs>
    <div class="shop platformshop" v-if="tabkey=='platform'">
      <div v-if='platform.length <= 0'>
        购物车暂无平台商品
      </div>
      <checkbox-group @change="selectgoods($event,'platform','platform')">
        <div class="main" v-for="(x,i) in platform" :key="i">
          <div class="header">
            <!-- <div class="u">商品详情</div> -->
            <div class="m">
              <div class="selectgoods">
                <checkbox color="#377BF0" :value="x.goodsid" />
              </div>
              <div class="l" @click="todetail(x)">
                <img :src="x.thumbnail" mode="widthFix" alt>
              </div>
              <div class="m" @click="todetail(x)">
                <div>{{x.name}}</div>
                <div class="desc">{{x.desc}}</div>
              </div>
              <div class="r">
                <div class="u">￥{{x.currentPrice}}</div>
                <div class="b">
                  <button @click="minus(x)" :disabled="x.count<=1">-</button>
                  <input type="text" v-model.lazy="x.count" disabled>
                  <button @click="plus(x)">+</button>
                </div>
              </div>
            </div>
          </div>
          <div class="fahuo">
            <span class="iconfont icon-zhuyi"></span>
            <span class="tips" v-if="x.deliveryMethods">【{{x.deliveryMethods}}】</span>
            <span class="tips" v-if="x.shipping">【{{x.shipping}}】</span>
          </div>
          <div class="fahuo" v-if="false">
            <!-- <div class="u">注意事项</div> -->
            <!-- 发货地 发货时间 发货方式 -->
            <div class="m">
              <div class="table">
                <div class="tr">
                  <div>发货方式 :</div>
                  <div class="tips">{{x.deliveryMethods || '商家未注明'}}</div>
                  <div>发货地 :</div>
                  <div>{{x.deliveryArea || '商家未注明'}}</div>
                </div>
                <div class="tr">
                  <div>发货时间 :</div>
                  <div>{{x.deliveryTime || '商家未注明'}}</div>
                  <div>可购区域 :</div>
                  <div class="tips">{{x.targetArea_name || '商家未注明'}}</div>
                </div>
                <div class="tr">
                  <div>是否包邮 :</div>
                  <div>{{x.shipping?'包邮':'不包邮'}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </checkbox-group>
    </div>
    <checkbox-group @change="selectgoods($event,'bangzhu')" v-if="tabkey=='bangzhu'">
    <div class="shop bangzhushop" v-for="(m,j) in bangzhu" :key="j">
      <div v-if='bangzhu.length <= 0'>
        购物车暂无帮主推荐商品
      </div>
        <div class="main" >
          <div class="header">
            <div class="m">
              <div class="selectgoods">
                <checkbox color="#377BF0" :value="m.goodsid" :count:='m.count' />
              </div>
              <div class="l" @click="todetail(m)">
                <img :src="m.thumbnail" mode="widthFix" alt>
              </div>
              <div class="m" @click="todetail(m)">
                <div>{{m.name}}</div>
                <div class="desc">{{m.desc}}</div>
              </div>
              <div class="r">
                <div class="u">￥{{m.currentPrice}}</div>
                <div class="b">
                  <button @click="minus(m)" :disabled="m.count<=1">-</button>
                  <input type="text" v-model.lazy="m.count" disabled>
                  <button @click="plus(m)">+</button>
                </div>
              </div>
            </div>
          </div>
          <div class="fahuo">
            <span class="iconfont icon-zhuyi"></span>
            <span class="tips" v-if="m.deliveryMethods">【{{m.deliveryMethods}}】</span>
            <span class="tips" v-if="m.shipping">【{{m.shipping}}】</span>
          </div>
        </div>
      
    </div>
    </checkbox-group>
    <checkbox-group @change="selectgoods($event,'user')" v-if="tabkey=='user'">
    <div class="shop usershop" v-for="(x,i) in user" :key="i" >
      <div v-if='user.length <= 0'>
        购物车暂无个人卖家商品
      </div>
      <!-- <div class="shopheader">
        <div>
          <span class="iconfont icon-tubiao_shangcheng"></span>
          个人卖家
        </div>
      </div> -->
        <div class="main">
          <div class="header">
            <div class="m">
              <div class="selectgoods">
                <checkbox color="#377BF0" :value="x.goodsid" />
              </div>
              <div class="l" @click="todetail(x)">
                <img :src="x.thumbnail" mode="widthFix" alt>
              </div>
              <div class="m" @click="todetail(x)">
                <div>{{x.name}}</div>
                <div class="desc">{{x.desc}}</div>
              </div>
              <div class="r">
                <div class="u">￥{{x.currentPrice}}</div>
                <div class="b">
                  <button @click="minus(x)" :disabled="x.count<=1">-</button>
                  <input type="text" v-model.lazy="x.count" disabled>
                  <button @click="plus(x)">+</button>
                </div>
              </div>
            </div>
          </div>
          <div class="fahuo">
            <span class="iconfont icon-zhuyi"></span>
            <span class="tips" v-if="x.deliveryMethods">【{{x.deliveryMethods}}】</span>
            <span class="tips" v-if="x.shipping">【{{x.shipping}}】</span>
          </div>
        </div>
    </div>
    </checkbox-group>
    <div class="jiesuan">
      <span class="total">总价：￥{{total}}</span>
      <button hover-class="btnhover" @click="showmodal=true">结算</button>
    </div>
    <div class="none" v-if="shownone">
      <i class="iconfont icon-tubiao_gouwuche-copy"></i>
      <div>购物车空空如也~</div>
    </div>
    <div class="modal" v-if='showmodal'>
      <div class="contain">
        <div class="main shouhuo">
          <div class="u">
            <span>收货地址</span>
            <span class="add" @click='toaddress'>添加收货地址></span>
          </div>
          <div class="m">
            <!-- @change="radioChange" -->
            <radio-group class="radio-group" >
              <label class="radio" v-for="(x,i) in address" :key="i" @click="radioChange(i)">
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
      <div class="footer">
        <button class="btn cancelbtn" @click="showmodal=false">取消</button>
        <button class="btn confirmbtn" hover-class='confirmhover' @click='paynow'>确认下单</button>
      </div>
      </div>
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

import qc from "wafer2-client-sdk";
import conf from "@/config";

import slogan from "@/components/slogan";
import goodsItem from "@/components/goodsitem";

export default {
  data() {
    return {
      tabkey:'platform',
      platform: [],
      bangzhu: [],
      user: [],
      shownone: false,
      userInfo: {},
      location: "尚未获取定位",
      img: "",
      goodsid: "",
      count: 1,
      a: {},
      total: 0,
      selectedlist: {
        platform:[],
        bangzhu:[],
        user:[]
      },
      address: [],
      receipt:'',
      beizhu: '',
      provincecode:'',
      citycode:'',
      countrycode:'',
      showmodal:false
    };
  },
  components: {
    slogan,
    goodsItem
  },
  computed: {},
  methods: {
    minus(x){
      var self = this;
      self.total = 0
      x.count>1?x.count--:'';
      // 读取选中的商品数量 
      self.selectedlist[self.tabkey].map(function(v,i){
        self[self.tabkey].map(function(v1,i1){
          if(v._id == v1._id){
            v.count = v1.count
            // 计算价格
            self.total += (v1.currentPrice * 10 * 10) * v1.count / 100
          }
        })
      })
      // console.log(self.selectedlist);
    },
    plus(x){
      var self = this;
      self.total = 0
      x.count++;
      // 读取选中的商品数量 
      self.selectedlist[self.tabkey].map(function(v,i){
        self[self.tabkey].map(function(v1,i1){
          if(v._id == v1._id){
            v.count = v1.count
            // 计算价格
            self.total += (v1.currentPrice * 10 * 10) * v1.count / 100
          }
        })
      })
      // console.log(self.selectedlist);
    },
    tabChange(e) {
      // console.log(e.mp.detail);
      this.tabkey = e.mp.detail.key
      this.selectedlist = {
        platform:[],
        bangzhu:[],
        user:[]
      }
      this.total = 0
    },
    selectgoods(e, origin, uploadUser) {
      var self = this;
      self.selectedlist = {
        platform:[],
        bangzhu:[],
        user:[]
      }
      self.total = 0
      // console.log(e);
      // console.log(origin);
      // console.log(uploadUser);
      let arr = e.mp.detail.value;// 所有选中商品的id
      arr.map(function(v,i){
        self.selectedlist[self.tabkey][i] = {}
        self.selectedlist[self.tabkey][i]._id = v
        // self.selectedlist[self.tabkey][i].count = self[self.tabkey]
        self[self.tabkey].map(function(v1, i1){// 当前origin下的所有商品
          if(v1._id == v){
            // id一致时 拿到其数量
            // console.log(v1);
            self.selectedlist[self.tabkey][i].count = v1.count
            self.selectedlist[self.tabkey][i].name = v1.name
            self.selectedlist[self.tabkey][i].uploadUser = v1.uploadUser
            // 计算价格
            self.total += (v1.currentPrice * 10 * 10) * v1.count / 100
          }
        })
      })
    },
    selectaddress(){
      // 读收货地址
      let address = wx.getStorageSync('address')
      // console.log(address);
      if(!address || address.length == 0 || address == {} ){
        return wx.showModal({
          title:"提示",
          content:"请先添加收货地址",
          success(res){
            if(res.confirm){
              console.log(res);
              
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
    toaddress(){
      wx.navigateTo({
        url:'/pages/myaddress/main'
      })
    },
    radioChange(k){
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
      
      this.receipt = yy
      
    },
    async paynow() {
      var self = this
      if(self.selectedlist[self.tabkey].length<=0){
        return wx.showToast({
                title: "尚未选择任何商品",
                duration: 2000,
                icon: "none",
                mask: true
              });
      }
      if(!self.receipt){
        return wx.showToast({
                title: "尚未选择收货地址",
                duration: 2000,
                icon: "none",
                mask: true
              });
      }
      // console.log(self.selectedlist);
      // 选择 收货地址和填写备注
      
      // return
      wx.showLoading({
        title: "Loading..."
      });
      // 统一下单 生成订单号
      // qcloud.request  https://github.com/tencentyun/wafer-client-sdk#request
      qc.request({
        login:false,
        url: conf.service.prepayUrl,
        method:"POST",
        data: {
          origin: self.tabkey,
          goodslist: self.selectedlist[self.tabkey],
          receipt: self.receipt,
          beizhu: self.beizhu,
          provincecode:self.provincecode,
          citycode:self.citycode,
          countrycode:self.countrycode,
          from: 'cart'
        },
        success: async function(res) {
          wx.hideLoading();
          // console.log("统一下单返回：");
          // console.log(res.data);
          if (res.data.code == 1 && res.data.success) {
            // console.log("支付中");
            let payres = await wxpay(res.data.data);
            // console.log("payres", payres);
            // console.log("支付流程结束，支付成功~");
            if (payres.errMsg == "requestPayment:ok") {
              // 前端订单支付完成 等待商家核验（等待微信通知回调）
              let clientpaidres = await clientpaid(res.data.data);
              // console.log("前端订单支付完成 等待商家核验");

              wx.showToast({
                title: clientpaidres.msg,
                // title: '支付成功',

                duration: 1600,
                icon: "success",
                mask: true,
                complete: function() {
                  setTimeout(function() {
                    wx.navigateTo({
                      url: "/pages/orderlist/main?index=0"
                    });
                  }, 1500);
                }
              });
            } else {
              wx.showToast({
                title: "支付失败",
                duration: 1600,
                icon: "none",
                mask: true,
                complete: function() {
                  setTimeout(function(){
                    wx.navigateTo({
                      url: "/pages/orderlist/main?index=0"
                    });
                  },1500)
                }
              });
            }
          } else {
            wx.showToast({
              title: res.data.reason,
              icon: "none",
              duration: 2000
            });
          }
          self.showmodal = false
        },
        fail: function(err) {
          // console.log(err);
          // console.log("支付流程结束，支付失败~");
          // wx.hideLoading();
          wx.showToast({
            title: "下单失败,请先登录",
            duration: 1000,
            icon: "none",
            mask: true,
            complete: function() {
              wx.switchTab({
                url: "/pages/my/main"
              });
            }
          });
          self.showmodal = false

        },
        complete: function() {
          // wx.hideLoading();
        }
      });
    },
    getcartgoods() {
      var self = this;
      wx.showLoading({
        title: "购物车读取中..."
      });
      qc.request({
        // login:true,
        url: conf.service.cartgoodsUrl,
        // method:"GET",
        data: {},
        success: function(res) {
          self.platform = res.data.data.platformgoods
          self.bangzhu = res.data.data.bangzhugoods
          self.user = res.data.data.usergoods;
          if (res.data.success) {
            if (
              res.data.data.platform == [] &&
              res.data.data.bangzhu == [] &&
              res.data.data.user == []
            ) {
              self.shownone = true;
            } else {
              self.shownone = false;
            }
          } else {
            self.shownone = true;
            wx.removeTabBarBadge({
              index: 3
            });
          }
        },
        fail: function(err) {
          // console.log(err);
          // wx.removeTabBarBadge({
          //   index : 3
          // })
          wx.showToast({
            title: "请求失败，请检查网络",
            icon: "none",
            duration: 2000
          });
        },
        complete: function() {
          // console.log("456456456456456");

          wx.stopPullDownRefresh();
          wx.hideLoading();
        }
      });
    },
    todetail(x) {
      if (x.goodsid) {
        wx.navigateTo({
          url: `/pages/goodsdetail/main?goodsid=${x.goodsid}&origin=${x.origin}`
        });
      }
    }
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
    this.getcartgoods();
    this.selectaddress()
  },
  onLoad() {
    wx.showShareMenu({
      withShareTicket: true
    });
  },
  onPullDownRefresh() {
    this.getcartgoods();
  }
};
</script>
<style >
page{
  background-color: #f3f3f3;
}
</style>
<style scoped lang='scss'>
$maincolor: #377BF0;
.icon-zhuyi {
  color: orange;
}
.container {
  background-color: #f3f3f3;
  padding: 0rpx 0rpx 70rpx;
  min-height: 100%;
}
.main {
  // border-top: 20rpx solid #f5f5f5 ;
  padding: 0 20rpx 0rpx;
  .u {
    color: #b3b3b3;
    font-size: 32rpx;
    // font-size: 13pt;
    border-bottom: 1px solid #f5f5f5;
  }
}
.shop {
  width: 710rpx;
  margin: 20rpx auto 0;
  border-radius: 20rpx;
  background-color: #fff;
  padding: 10rpx 20rpx 10rpx;
  box-sizing: border-box;
  .shopheader {
    color: #000;
    font-size: 30rpx;
    padding: 0rpx 10rpx 0rpx;
    border-bottom: 1rpx solid #f5f5f5;
  }
}

.header {
  & > .m {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 10rpx 0 0;
    // border-bottom: 1px solid #f5f5f5;
    .l {
      width: 25%;
      img {
        width: 160rpx;
        height: 120rpx;
      }
    }
    .m {
      width: 50%;
      text-align: left !important;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding-left: 25rpx;
      font-size: 32rpx;
      div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .desc {
        font-size: 28rpx;
        color: #b3b3b3;
      }
    }
    .r {
      width: 25%;
      font-size: 32rpx;
      text-align: center !important;
      .b {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        padding: 0;
        button {
          width: 34rpx;
          height: 34rpx;
          padding: 0;
          line-height: 34rpx;
          text-align: center;
          font-size: 20rpx;
          margin: 0;
        }
        input {
          width: 100rpx;
          height: 34rpx;
          padding: 0;
          line-height: 34rpx;
          text-align: center;
          font-size: 20rpx;
        }
      }
    }
  }
}
.fahuo {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 28rpx;
  // border-bottom: 1px solid #f5f5f5;
  .tips {
    color: $maincolor;
  }
  .m {
    .table {
      width: 100%;
      margin: 0 auto;
      font-size: 28rpx;
      color: #000;
      .tr {
        display: flex;
        flex-direction: row;
        width: 100%;
        div {
          width: 20%;
        }
        div:nth-child(3) {
          margin-left: 40rpx;
        }
      }
    }
  }
}
// .jiesuan{
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
//   button{
//     width: 150rpx;
//     height: 44rpx;
//     line-height: 44rpx;
//     background-color: $maincolor;
//     color: #fff;
//     font-size: 32rpx;
//     text-align: center;
//     margin: 0;
//   }
//   .btnhover{
//     background-color: #9c2518;
//   }
// }
.jiesuan {
  position: fixed;
  bottom: 0;
  width: 710rpx;
  display: flex;
  justify-content: flex-end;
  padding: 10rpx 20rpx;
  background-color: #f3f3f3;
  .total {
    color: $maincolor;
    font-weight: 600;
    padding-right: 20rpx;
  }
  button {
    width: 26%;
    height: 62rpx;
    line-height: 62rpx;
    background-color: $maincolor;
    font-size: 32rpx;
    border-radius: 31rpx;
    color: #fff;
    margin: 0;
  }
  .btnhover {
    background-color: rgb(138, 0, 0);
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
.none {
  display: flex;
  flex-direction: column;
  justify-content: center;
  i.iconfont {
    font-size: 200rpx;
    color: #b3b3b3;
    text-align: center;
  }
  div {
    font-size: 50rpx;
    text-align: center;
    color: #b3b3b3;
  }
}

.modal{
  width: 750rpx;
  height: 100vh;
  background: rgba(0, 0, 0, .4);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  .contain{
    background: #fff;
    border: 1rpx solid #ccc;
    border-radius: 16rpx;
    width: 700rpx;
    margin: 0 auto;
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
    .footer{
      padding: 16rpx 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .btn{
        width: 38%;
        height: 60rpx;
        line-height: 60rpx;
        font-size: 36rpx;
        border-radius: 30rpx; 
      }
      .cancelbtn{
        background: #fff;
        border: 1rpx solid $maincolor;
        color: $maincolor;
      }
      .confirmbtn{
        background: $maincolor;
        border: 1rpx solid $maincolor;
        color: #fff ;
      }
      .confirmhover{
        background: rgb(136, 1, 1);
        border: 1rpx solid rgb(136, 1, 1);
        color: rgb(192, 192, 192) ;
      }
    }
  }
}

</style>
