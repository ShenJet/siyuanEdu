<template>
  <div class>
    <!-- <slogan type='bangzhu'></slogan> -->
    <div class="container">
      <form report-submit="true" @submit="formSubmit">
        <div class="item line">
          <span class="l">*</span>
          <span class="m">手机号：</span>
          <span class="r">
            <input
              type="number"
              name="phone"
              v-model="form.phone"
              placeholder="请输入手机号"
              confirm-type="next"
              maxlength="11"
              focus="true"
            >
          </span>
        </div>
        <div class="item line">
          <span class="l">*</span>
          <span class="m">商品名称：</span>
          <span class="r">
            <input
              type="text"
              name="name"
              v-model="form.name"
              placeholder="请输入品名"
              confirm-type="next"
              maxlength="20"
            >
          </span>
        </div>
        <div class="item line">
          <span class="l">*</span>
          <span class="m">商品组团价：</span>
          <span class="r">
            <input
              type="digit"
              name="currentPrice"
              v-model="form.currentPrice"
              placeholder="请输入价格，单位：元"
              confirm-type="next"
              maxlength="10"
            >
          </span>
        </div>
        <div class="item line">
          <span class="l">*</span>
          <span class="m">商品市场价：</span>
          <span class="r">
            <input
              type="digit"
              name="oldPrice"
              v-model="form.oldPrice"
              placeholder="需高于组团价，单位：元"
              confirm-type="next"
              maxlength="10"
            >
          </span>
        </div>
        <div class="item tip">
          通过微信支付须扣除0.6%的手续费，因此定价须根据该因素适当调整，本平台不会收取任何费用。
          例如：原组团价100元的商品，除以0.994=100.61，100.61再扣除0.6%的手续费后所得刚好是100元。
          为保证计算精确，价格请尽量设置成整数。（最多允许两位小数）
        </div>
        <div class="item line">
          <span class="l">*</span>
          <span class="m">计量单位：</span>
          <span class="r">
            <input
              type="digit"
              name="unit"
              v-model="form.unit"
              placeholder="斤,件,份,公斤..."
              confirm-type="next"
              maxlength="10"
            >
          </span>
        </div>
        <div class="item line">
          <span class="l">*</span>
          <span class="m">库存数量：</span>
          <span class="r">
            <input
              type="digit"
              name="stock"
              v-model="form.stock"
              placeholder="具体数字或'足够多'"
              confirm-type="next"
              maxlength="20"
            >
          </span>
        </div>
        <div class="item line deliveryMethods">
          <span class="l">*</span>
          <span class="m">取货方式：</span>
          <span class="r">
            <radio-group name="deliveryMethods" class="radio-group" @change="radioChange">
              <label class="radio" v-for="(item,i) in radios" :key="i">
                <radio :value="item.name">{{item.value}}</radio>
              </label>
            </radio-group>
          </span>
        </div>
        <div class="item line delivery-area">
          <span class="l">*</span>
          <span class="m">提货点：</span>
          <div class="r" @click="chooselocation" name="deliveryArea">
            <!-- <textarea
              name="deliveryArea"
              v-model=""
              placeholder="点击选择提货点"
              confirm-type="next" 
              disabled
            ></textarea> -->
            {{form.deliveryArea}}
          </div>
        </div>
        <div class="item line">
          <span class="l">*</span>
          <span class="m">具体提货点：</span>
          <span class="r">
            <input
              type="text"
              name="deliveryArea1"
              v-model="form.deliveryArea1"
              placeholder="xx栋xx单元xx号"
              confirm-type="next"
            >
          </span>
        </div>
        <div class="item tip">
          如果是快递运输或线下配送请选择发货地，如果是买家自提则选择具体提货点（需精确到楼栋和房号）。提货点精确到小区，具体提货点精确到xx栋xx单元xx号。
        </div>
        <div class="item line">
          <span class="l">*</span>
          <span class="m">组团开始时间：</span>
          <span class="r">
            <picker mode='date' value='2019-01-01' start='2019-01-01' end='2029-12-31' @change='pickerchange' @cancel='pickercancel1'>
              <input
                type="text"
                name="_start"
                v-model="form._start"
                placeholder="点击选择"
                confirm-type="next"
                disabled
              >
            </picker>
          </span>
        </div>
        <!-- <mp-datepicker ref="mpDatePicker" mode='date' defaultDate='2019-01-01' start='2019-01-01' end='2029-12-31' @onChange='pickerchange' @cancel='pickercancel'></mp-datepicker> -->
        <div class="item line">
          <span class="l">*</span>
          <span class="m">组团结束时间：</span>
          <span class="r">
            <picker mode='date' value='2019-01-01' start='2019-01-01' end='2029-12-31' @change='pickerchange1' @cancel='pickercancel1'>
              <input
                type="text"
                name="_end"
                v-model="form._end"
                placeholder="点击选择"
                confirm-type="next"
                disabled
              >
            </picker>
          </span>
        </div>
        <div class="item line">
          <span class="l">*</span>
          <span class="m">提货发货时间：</span>
          <span class="r">
            <picker mode='date' value='2019-01-01' start='2019-01-01' end='2029-12-31' @change='pickerchange2' @cancel='pickercancel2'>
              <input
                type="text"
                name="deliveryTime"
                v-model="form.deliveryTime"
                placeholder="点击选择"
                confirm-type="next"
                disabled
              >
            </picker>
          </span>
        </div>
        <div class="item block">
          <span class="l">*</span>
          <span class="m">商品实物图1：</span>
          <div class="r">
            <mp-uploader
              @upLoadSuccess="upLoadSuccess"
              @upLoadFail="upLoadFail0"
              @uploadDelete="uploadDelete"
              :showTip="showtip"
              :count="piccount"
              :maxLength="maxlength"
              :which="0"
            ></mp-uploader>
            <input type="text" name="urls0" disabled v-model="form.urls[0]" hidden>
          </div>
        </div>
        <div class="item block">
          <span class="l">*</span>
          <span class="m">商品实物图2：</span>
          <div class="r">
            <mp-uploader
              @upLoadSuccess="upLoadSuccess"
              @upLoadFail="upLoadFail1"
              @uploadDelete="uploadDelete"
              :showTip="showtip"
              :count="piccount"
              :maxLength="maxlength"
              :which="1"
            ></mp-uploader>
            <input type="text" name="urls1" disabled v-model="form.urls[1]" hidden>
          </div>
        </div>
        <div class="item block">
          <span class="l">*</span>
          <span class="m">商品实物图3：
          </span>
          <div class="r">
            <mp-uploader
              @upLoadSuccess="upLoadSuccess"
              @upLoadFail="upLoadFail2"
              @uploadDelete="uploadDelete"
              :showTip="showtip"
              :count="piccount"
              :maxLength="maxlength"
              :which="2"
            ></mp-uploader>
            <input type="text" name="urls2" disabled v-model="form.urls[2]" hidden>
          </div>
        </div>
        <div class="item tip">
          商品图请上传相机横向放置拍摄的图片，竖向拍摄的图片不利于展示。
        </div>
        <div class="textarea">
          <span class="l">*</span>
          <span class="m">商品描述：</span>
          <span class="r">
            <textarea
              name="detailDesc"
              type="text"
              v-model="form.detailDesc"
              class="desc"
              placeholder="描述一下你的商品，尽可能详细并循循善诱"
            ></textarea>
          </span>
        </div>
        <div class="textarea">
          <span class="l">*</span>
          <span class="m">卖家提示：</span>
          <span class="r">
            <textarea
              name="tips"
              type="text"
              v-model="form.tips"
              class="desc"
              placeholder="简述购买注意点，例如提货时间，提货方式，哪些区域允许购买等..."
            ></textarea>
          </span>
        </div>
        <div class="footer">
          <button class="reset"  form-type='reset'  hover-class="btn-hover1">清空表单</button>
          <button class="submit" form-type="submit" hover-class="btn-hover">确认发布</button>
        </div>
      </form>
      <mp-citypicker
        ref="mpCityPicker"
        :pickerValueDefault="pickerValueDefault"
        @onChange="citychange"
        @onCancel="citycancel"
        @onConfirm="cityconfirm"
      ></mp-citypicker>
    </div>
  </div>
</template>

<script>


import qc from "wafer2-client-sdk";
import conf from "@/config";

import qqmap from "@/wxapis/qqmap.js";
var mymap = new qqmap({
  // 地图开发秘钥
  key: conf.mapkey // 必填
});


import checkscope from "@/wxapis/check_scope";
import authorize from "@/wxapis/authorize";
import openSetting from "@/wxapis/openSetting";
import chooselocation from "@/wxapis/chooselocation";
import modal from "@/wxapis/modal";

import mpDatepicker from '@/components/datePicker';
import mpCitypicker from "mpvue-weui/src/city-picker";
import mpUploader from "@/components/mpuploader.vue";


export default {
  data() {
    return {
      userInfo: {},
      location: "尚未获取定位",
      pickershow:false,
      form: {
        name: "",
        phone: "",
        deliveryArea: "点击选择提货点",
        deliveryArea1:'', // 具体位置
        longitude:'',
        latitude:'',
        deliveryTime: "",
        _start:"",
        _end:'',
        urls:[],
        detailDesc: "",
        tips: "",
        oldPrice:'',
        curentPrice:'',
        unit:'',
        stock:'',
        code:''
      },
      radios: [
        {
          name: "定点自提",
          value: "定点自提",
          checked: true
        },
        {
          name: "卖家配送",
          value: "卖家配送"
        },
        {
          name: "快递运输",
          value: "快递运输"
        }
      ],
      deliveryMethods: "",
      // uploader配置项
      piccount: 1,
      showtip: true,
      maxlength: 1,
      // city picker 配置项
      pickerValueDefault: [0, 0, 0],
      citylabel1: "",
      citylabel2: "",
      code: "",
    };
  },
  components: {
    mpUploader,
    mpCitypicker,
    mpDatepicker
  },
  methods: {
    // 显示繁忙提示
    showBusy : text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 1500
    }),

    // 显示成功提示
    showSuccess: text => wx.showToast({
    title: text,
    icon: 'success'
    }),

    // 显示失败提示
    showModel : (title, content) => {
    wx.hideToast()
    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
        })
    },
    pickerchange(x){
      let date = x.mp.detail.value
      // console.log(date);
      this.form._start = date
    },
    pickerchange1(x){
      let date = x.mp.detail.value
      // console.log(date);
      this.form._end = date
    },
    pickerchange2(x){
      let date = x.mp.detail.value
      // console.log(date);
      this.form.deliveryTime = date
    },
    pickercancel(x){
      let date = x.mp.detail.value
      // console.log(date);
    },
    pickercancel1(x){
      let date = x.mp.detail.value
      // console.log(date);
    },
    pickercancel2(x){
      let date = x.mp.detail.value
      // console.log(date);
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
        let querycode = await this.reverseGeocoder(
          location.longitude,
          location.latitude
        )
        this.form.code = querycode.result.ad_info.adcode
        // console.log( this.form.code );

      }
    },
    async chooselocation() {
      try {
        let location = (await chooselocation()) || null;
        // console.log(location);
        if(!location.address || !location.name){
          wx.showToast({
            title: '请选择提货点',
            duration: 1500,
            icon: "none"
          });
          this.form.deliveryArea =  "点击选择提货点"
          this.form.longitude = '' 
          this.form.latitude = ''
        }else{
          this.form.deliveryArea = location.address+' '+location.name ;
          this.form.longitude = location.longitude 
          this.form.latitude = location.latitude 
          let querycode = await this.reverseGeocoder(
            location.longitude,
            location.latitude
          )
          
          this.form.code = querycode.result.ad_info.adcode ;
          // console.log( this.form.code );
          
        }
      } catch (error) {
        wx.showToast({
          title: '请选择提货点',
          duration: 1500,
          icon: "none"
        });
      }
    },
    citychange({ label, value, cityCode }) {
      // console.log(label, value, cityCode);
    },
    cityconfirm({ label, value, cityCode }) {
      // console.log(label, value, cityCode);
      this.citylabel1 = label;
      this.code = cityCode;
    },
    citycancel({ label, value, cityCode }) {
      // console.log(label, value, cityCode);
    },
    showcitypicker() {
      this.$refs.mpCityPicker.show();
    },
    upLoadSuccess(res, which) {
      var self = this;
      // console.log(which);
      var keys = wx.getStorageInfoSync().keys;
      // console.log('keys: %s',keys);
      var skey = "";
      keys.map(function(v, i) {
        if (v.indexOf("session") != -1) {
          // console.log(v);
          skey = wx.getStorageSync(v).skey;
        }
      });
      // console.log(skey);

      var filePath = res.tempFilePaths[0];
      // console.log(filePath)
      wx.uploadFile({
        url: conf.service.uploadUrl,
        header: {
          "X-WX-Skey": skey
        },
        filePath: filePath,
        name: "file",
        success: function(res) {
          // console.log(res);

          let format = JSON.parse(res.data);

          // console.log(format.data);
          // console.log(format.data.imgUrl);

          if (format.data.imgUrl) {
            self.form.urls[which] = format.data.imgUrl;
            self.showSuccess("图片上传成功");
          } else {
            self.form.urls[which] = "";
            self.showModel("提示", "图片上传失败");
          }
        },
        fail: function(e) {
          console.error(e);
        }
      });
    },
    uploadDelete(which) {
      this.form.urls[which] = "";
    },
    formSubmit(data) {
      var self = this;
      if (self.globalData.loginstate !== true) {
        return wx.showToast({
          title: "请先登录",
          icon: "none",
          duration: 1000,
          success() {
            setTimeout(function() {
              wx.navigateTo({
                url: "/pages/my/main"
              });
            }, 1000);
          }
        });
      }
      
      var community = wx.getStorageSync('mycommunity')
      console.log(community);
      
      if(!community||community=={}){
        return wx.showToast({
          title:"请先选择一个小区",
          duration:1500,
          icon:'none'
        })
      }
      var communityid = community._id


      let obj = data.mp.detail;
      let { formId} = obj;
      let formvalue = obj.value
      // console.log(formvalue);

      formvalue.urls=[formvalue.urls0 ,formvalue.urls1 , formvalue.urls2 ]
      formvalue.deliveryArea = self.form.deliveryArea
      formvalue.deliveryAreaDetail = self.form.deliveryArea1
      formvalue.longitude = self.form.longitude
      formvalue.latitude = self.form.latitude
      formvalue.code = self.form.code
      
      // 数据校验
      for (const key in formvalue) {
        if (formvalue.hasOwnProperty(key)) {
          const element = formvalue[key];
          if (!element.toString().trim()) {
            return wx.showToast({
              title: "信息不完整！",
              mask: true,
              icon: "none",
              duration: 1000
            });
          }
        }
      }
      
      wx.showLoading({
        title: "提交中...",
        mask: true
      });

      qc.request({
        // login:true,
        method: "POST",
        data: { 
          formId,
          communityid,
          ...formvalue
        },
        url: conf.service.bangzhugoodsuploadUrl,
        success(res) {
          // console.log(res);
          wx.hideLoading();
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 1400
          });
          setTimeout(function() {
            wx.switchTab({
              url: "/pages/zutuan/main"
            });
          }, 1600);
        },
        fail() {
          wx.showToast({
            title: '发布失败,请检查网络',
            icon: "none",
            duration: 1400
          });
        },
        complete() {}
      });
    },
    radioChange(e) {
      // console.log("deliveryMethods:", e.mp.detail.value);
      this.deliveryMethods = e.mp.detail.value;
    },
    reverseGeocoder(longitude, latitude) {
      return new Promise(function(resolve, reject) {
        mymap.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function(res) {
            resolve(res);
          },
          fail: function(res) {
            resolve(null);
          }
        });
      });
    },
  },
  async onShow() {
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
  }
};
</script>

<style scoped lang='scss'>
$maincolor: #377BF0;
.container {
  padding: 0 20rpx 20rpx;
  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20rpx 0;
    font-size: 32rpx;
    border-bottom: 1px solid #f5f5f5;
    .l {
      display: inline-block;
      color: $maincolor;
      padding-right: 6rpx;
    }
    .m {
      // background-color: yellowgreen;
      width: 220rpx;
      // text-align: right;
    }
    .r {
      // background-color: pink;
      display: inline-block;
      input{
        width: 450rpx;

      }
      radio-group{
        display: flex;
        flex-direction: row;
        font-size: 25rpx;
      }
    }
  }
  .deliveryMethods{
    .m{
      width: 200rpx;
    }
    .r{
      width: 485rpx;
    }
  }
  .delivery-area{
    // textarea{
      .r{
        border: 1px solid #e5e5e5;
        min-height: 120rpx;
        width: 440rpx;
        padding: 12rpx;
        box-sizing: border-box;
      }
    // }
  }
  .tip{
    font-size: 26rpx;
    background-color: #f5f5f5;
    color: #a1a1a1;
    padding: 8rpx;
    border-radius: 8rpx;
  }
  .block {
    .r {
      width: 450rpx;
      display: felx;
      flex-direction: row;
    }
  }
  .code {
    .m {
      font-size: 26rpx;
    }
  }
  .place {
    .r {
      button {
        display: inline-block;
        height: 44rpx;
        color: $maincolor;
        font-size: 30rpx;
        line-height: 40rpx;
        border-color: $maincolor !important;
        border: 1px solid $maincolor !important;
        padding: 0 10rpx;
        background: #fff;
      }
      .btnhover {
        background: #ccc;
      }
      input {
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      textarea {
        border-radius: 5px;
        border: 1px solid #ccc;
        height: 130rpx;
        width: 100%;
        box-sizing: border-box;
        margin-top: 12rpx;
      }
    }
  }
  .textarea {
    font-size: 32rpx;
    .l {
      display: inline-block;
      color: $maincolor;
      padding-right: 6rpx;
    }
    .r {
      display: block;
      // width: 90%;
      border: 1px solid #ccc;
      border-radius: 15rpx;
      min-height: 180rpx;
      padding: 8rpx;
    }
  }
  .desc {
    height: 160rpx;
    width: 100%;
  }
  .footer{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .submit {
      background-color: $maincolor;
      width: 38%;
      height: 80rpx;
      line-height: 80rpx;
      color: #fff;
      border: none;
      margin-top: 20rpx;
      border-radius: 40rpx;
    }
    .btn-hover {
      background-color: rgb(172, 0, 0);
      color: #ccc;
    }
    .reset {
      background-color: #fff;
      width: 38%;
      height: 80rpx;
      line-height: 80rpx;
      color: $maincolor;
      border: 1px solid $maincolor;
      margin-top: 20rpx;
      border-radius: 40rpx;
    }
    .btn-hover1 {
      background-color: rgb(212, 212, 212);
      color: rgb(126, 1, 1);
    }
  }
  
}
label:nth-child(2) {
  padding-left: 12rpx;
}
</style>
