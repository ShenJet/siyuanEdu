<template>
  <div class="">
    <!-- <slogan type='bangzhu'></slogan> -->
    <div class="container">
      <form report-submit=true @submit="formSubmit">
    <div class="item line">
      <span class="l">*</span>
      <span class="m">真实姓名：</span>
      <span class="r">
        <input type="text" name='name' v-model="form.name" placeholder="请输入姓名" confirm-type='next' maxlength='4' focus=true>
      </span>
    </div>
    <div class="item line">
      <span class="l">*</span>
      <span class="m">手机号：</span>
      <span class="r">
        <input type="number" name='phone' v-model="form.phone" placeholder="请输入手机号" confirm-type='next' maxlength='11'>
      </span>
    </div>
    <div class="item line">
      <span class="l">*</span>
      <span class="m">供应商类型：</span>
      <span class="r">
        <radio-group name='whoami' class="radio-group" @change="radioChange">
          <label class="radio" v-for="(item,i) in radios" :key="i">
            <radio :value="item.name" >{{item.value}}</radio>
          </label>
        </radio-group>
      </span>
    </div>
    <div class="item line">
      <span class="l">*</span>
      <span class="m">身份证号码：</span>
      <span class="r">
        <input type="idcard" name='idno' v-model="form.idno" placeholder="请输入身份证号" confirm-type='next' maxlength='18'>
      </span>
    </div>
    <div class="item line">
      <span class="l">*</span>
      <span class="m">字号：</span>
      <span class="r">
        <input type="text" name='makername' v-model="form.makername" placeholder="如：xx公司，xx批发部" confirm-type='next' maxlength='18'>
      </span>
    </div>
    <div class="item line code">
      <span class="l">*</span>
      <span class="m">企业信用标识码：<br>(营业执照编号)  </span>
      <span class="r">
        <input type="text" name='yyzhizhaocode' v-model="form.yyzhizhaocode" placeholder="请输入企业信用标识码" confirm-type='next' maxlength='18'>
      </span>
    </div>
    <div class="item block place">
      <span class="l">*</span>
      <span class="m">所在地：</span>
      <div class="r">
        <!-- <div><button hover-class='btnhover'>选择城市</button></div> -->
        <div>
          <input type="text" name='citylabel1' disabled placeholder="省市区选择" @click='showcitypicker' v-model="citylabel1">
          <input type="text" name='code' disabled v-model="code" hidden>
        </div>
        <div>
          <textarea name="citylabel2" id="" placeholder="详细地址（精确到门牌号）" v-model="citylabel2" confirm-type='next'></textarea>
        </div>
      </div>
    </div>
    <div class="item block">
      <span class="l">*</span>
      <span class="m">身份证正面：</span>
      <div class="r">
        <mp-uploader @upLoadSuccess="upLoadSuccess" @upLoadFail="upLoadFail0" @uploadDelete="uploadDelete" :showTip='showtip' :count='piccount' :maxLength='maxlength' :which='1'></mp-uploader>
          <input type="text" name='idcard1' disabled v-model="imgurls['1']" hidden>
      </div>
    </div>
    <div class="item block">
      <span class="l">*</span>
      <span class="m">身份证反面：</span>
      <div class="r">
        <mp-uploader @upLoadSuccess="upLoadSuccess" @upLoadFail="upLoadFail1" @uploadDelete="uploadDelete" :showTip='showtip' :count='piccount' :maxLength='maxlength' :which='2'></mp-uploader>
          <input type="text" name='idcard2' disabled v-model="imgurls['2']" hidden>
      </div>
    </div>
    <div class="item block">
      <span class="l">*</span>
      <span class="m">手持身份证<br>半身照：</span>
      <div class="r">
        <mp-uploader @upLoadSuccess="upLoadSuccess" @upLoadFail="upLoadFail2" @uploadDelete="uploadDelete" :showTip='showtip' :count='piccount' :maxLength='maxlength' :which='3'></mp-uploader>
        <input type="text" name='idcard3' disabled v-model="imgurls['3']" hidden>
      </div>
    </div>
    <div class="item block">
      <span class="l">*</span>
      <span class="m">营业执照：</span>
      <div class="r">
        <mp-uploader @upLoadSuccess="upLoadSuccess" @upLoadFail="upLoadFail3" @uploadDelete="uploadDelete" :showTip='showtip' :count='piccount' :maxLength='maxlength' :which='4'></mp-uploader>
        <input type="text" name='yyzhizhao' disabled v-model="imgurls['4']" hidden>
      </div>
    </div>
    <div class="textarea">
      <span class="l">*</span>
      <span class="m">商品说明：</span>
      <span class="r">
        <textarea name='applydesc' type="text" v-model="form.desc" class="desc" placeholder="简单描述一下你的商品种类"></textarea>
      </span>
    </div>
    <button class="submit" form-type='submit' hover-class='btn-hover'>提交申请</button>
    </form>
    <mp-citypicker ref="mpCityPicker" 
          :pickerValueDefault="pickerValueDefault" 
          @onChange="citychange" 
          @onCancel="citycancel" 
          @onConfirm="cityconfirm"></mp-citypicker>
    </div>
  </div>
</template>

<script>
import qc from 'wafer2-client-sdk'
import conf from '@/config'

import checkscope from "@/wxapis/check_scope";
import authorize from "@/wxapis/authorize";
import openSetting from "@/wxapis/openSetting";
import modal from "@/wxapis/modal";

import mpSwitch from 'mpvue-weui/src/switch';
import mpCitypicker from 'mpvue-weui/src/city-picker';
import mpUploader from '@/components/mpuploader.vue';
import slogan from "@/components/slogan";

export default {
  data() {
    return {
      userInfo: {},
      location: "尚未获取定位",
      form:{
        name:'',
        phone:'',
        area:'',
        fulltime:true,
        currentjob:'',
        idno:'',
        idcardurl1:'',
        idcardurl2:'',
        idcardurl3:'',
        desc:'',
        phone:'',
        makername:'',
        yyzhizhaocode:''
      },
      radios:[{
        name:"制造商",
        value:'制造商',
        checked:true
      },{
        name:"批发商",
        value:'批发商'
      }],
      whoami:'',
      // uploader配置项
      piccount:1,
      showtip:true,
      maxlength:1,
      // city picker 配置项
      pickerValueDefault:[0,0,0],
      citylabel1:'',
      citylabel2:'',
      code:'',
      // 上传的三张照片
      imgurls:{
        1:'',
        2:'',
        3:'',
        4:''
      }

    };
  },
  components: {
    mpSwitch,mpUploader,mpCitypicker,slogan
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
    getUserInfo() {
      // console.log("getuserinfo");

      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: res => {
              this.userInfo = res.userInfo;
            }
          });
        }
      });
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
    citychange({label, value, cityCode}){
      // console.log(label, value, cityCode);
      
    },
    cityconfirm({label, value, cityCode}){
      // console.log(label, value, cityCode);
      this.citylabel1 = label
      this.code = cityCode
    },
    citycancel({label, value, cityCode}){
      // console.log(label, value, cityCode);

    },
    showcitypicker(){
      this.$refs.mpCityPicker.show();
    },
    upLoadSuccess(res, which){
      var self = this
      // console.log(which);
      var keys = wx.getStorageInfoSync().keys
      // console.log('keys: %s',keys);
      var skey = ''
      keys.map(function(v,i){
        if(v.indexOf('session') != -1){
          // console.log(v);
          skey = wx.getStorageSync(v).skey
        }
      })
      // console.log(skey);
      
      var filePath = res.tempFilePaths[0]
      // console.log(filePath)
      wx.uploadFile({
        url: conf.service.uploadUrl,
        header:{
          'X-WX-Skey': skey
        },
        filePath: filePath,
        name: 'file',
        success: function(res){
          // console.log(res);
          
          let format = JSON.parse(res.data)
          
          // console.log(format.data);
          // console.log(format.data.imgUrl);
          
          if(format.data.imgUrl){
            self.imgurls[which]= format.data.imgUrl
            self.showSuccess('图片上传成功')
          }else{
            self.imgurls[which]= ''
            self.showModel('提示','图片上传失败')
          }
        },
        fail: function(e) {
          console.error(e)
        }
      })
    },
    uploadDelete(which){
      this.imgurls[which] = ''
    },
    formSubmit(data){
      let obj = data.mp.detail
      // console.log(obj.value);
      var self = this
      // 数据校验
      for (const key in obj.value) {
        if (obj.value.hasOwnProperty(key)) {
          const element = obj.value[key];
          if(!element.toString().trim()){
            return wx.showToast({
              title: '信息不完整！',
              mask:true,
              icon:'none',
              duration:1000
            })
          }
        }
      }

      let {formId, value} = obj
      let arr = value.code.split('')     // 110201
      value.provincecode = arr[0]+arr[1] // 11
      value.citycode = arr[2]+arr[3]     // 02
      value.countrycode = arr[4]+arr[5]  // 01


      
      // console.log(formId , value);
      if(self.globalData.loginstate !== true){
        return wx.showToast({
          title:'请先登录',
          icon:"none",
          duration:1000,
          success(){
            setTimeout(function(){
              wx.navigateTo({
                url:'/pages/my/main'
              })
            },1000)
          }
        })
      }

      wx.showLoading({
        title: '提交中...',
        mask:true,
      })

      qc.request({
        // login:true,
        method:"POST",
        data:{formId , ...value},
        url: conf.service.gysapplyUrl,
        success(res){
          // console.log(res);
          wx.hideLoading()
          wx.showToast({
            title:res.data.msg,
            icon:'none',
            duration:1400
          })
          setTimeout(function(){
            wx.hideToast()
            wx.switchTab({
              url:'/pages/index/main'
            })
          },1600)
        },
        fail(){
          
        },
        complete(){
          
        }
      })

    },
    radioChange(e) {
      // console.log("whoami:", e.mp.detail.value);
      this.whoami = e.mp.detail.value
    },
    
  },

  async onShow() {

  }
};
</script>

<style scoped lang='scss'>
$maincolor: #377BF0;
.container{
  padding: 0 20rpx 20rpx;
  .item{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20rpx 0;
    font-size: 32rpx;
    border-bottom: 1px solid #f5f5f5;
    .l{
      display: inline-block;
      color: $maincolor;
      padding-right: 6rpx;
    }
    .m{
      // background-color: yellowgreen;
      width: 220rpx;
      // text-align: right;
    }
    input[type=text]{
      // background-color: pink;
    }
  }
  .block{
    .r{
      width: 450rpx;
      display: felx;
      flex-direction: row;
    }
  }
  .code{
    .m{
      
      font-size: 26rpx;
      
    }
  }
  .place{
    .r{
      button{
        display: inline-block;
        height: 44rpx;
        color: $maincolor;
        font-size: 30rpx;
        line-height: 40rpx;
        border-color:$maincolor!important;
        border:1px solid $maincolor!important;
        padding: 0 10rpx;
        background: #fff; 
      }
      .btnhover{
        background: #ccc; 
      }
      input{
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      textarea{
        border-radius: 5px;
        border: 1px solid #ccc;
        height: 130rpx;
        width: 100%;
        box-sizing: border-box;
        margin-top: 12rpx;
      }
    }
  }
  .textarea{
    font-size: 32rpx;
    .l{
      display: inline-block;
      color: $maincolor;
      padding-right: 6rpx;
    }
    .r{
      display: block;
      // width: 90%;
      border: 1px solid #ccc;
      border-radius: 15rpx;
      min-height: 180rpx;
      padding: 8rpx;
    }
  }
  .desc{
    height: 160rpx;width: 100%;
  }
  .submit{
    background-color: $maincolor;
    width: 50%;
    height: 80rpx;
    line-height: 80rpx;
    color: #fff;
    border: none;
    margin-top: 20rpx;
    border-radius: 40rpx;
  }
  .btn-hover{
    background-color: rgb(172, 0, 0);
    color: #ccc;
  }
}
label:nth-child(2){
  padding-left: 12rpx;
}
</style>
