<template>
  <div class="">
    <!-- <slogan type='bangzhu'></slogan> -->
    <div class="toptip">
      请准确填写资料，方便平台为您匹配学员
    </div>
    <div class="container">
      <form report-submit=true @submit="formSubmit">
    <div class="item line">
      <span class="l">*</span>
      <span class="m">真实姓名：</span>
      <span class="r">
        <input type="text" name='name' v-model="form.name" placeholder="请输入姓名" confirm-type='next' focus=true>
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
      <span class="m">性别：</span>
      <span class="r">
        <!-- <input type="number" name='sex' v-model="form.sex" confirm-type='next' maxlength='11'> -->
        <radio-group name='sex' @click="sexchange">
          <radio value='男' color='#377BF0'>男老师</radio>
          <span style="display:inline-block;width:40rpx;"></span>
          <radio value='女' color='#377BF0'>女老师</radio>
        </radio-group>
      </span>
    </div>
    <div class="item line">
      <span class="l">*</span>
      <span class="m">目前身份：</span>
      <span class="r">
        <picker mode='selector' name='role' :range='rolearr' :value='role' @change='rolechange'>{{role || '点击选择身份'}}</picker>
      </span>
    </div>
    <div class="item line">
      <span class="l">*</span>
      <span class="m">最高学历：</span>
      <span class="r">
        <picker mode='selector' name='xueli' :range='xueliarr' :value='xueli' @change='xuelichange'>{{xueli || '点击选择学历'}}</picker>
      </span>
    </div>
    <div class="item line">
      <span class="l">*</span>
      <span class="m">毕业院校：</span>
      <span class="r">
        <input type="text" name='school' v-model="school" placeholder="可填写在读院校" confirm-type='next'>
      </span>
    </div>
    <div class="item line">
      <span class="l">*</span>
      <span class="m">所学专业：</span>
      <span class="r">
        <input type="text" name='major' v-model="major" placeholder="所学专业" confirm-type='next'>
      </span>
    </div>
    <div class="item line">
      <span class="l">*</span>
      <span class="m">毕业年份：</span>
      <span class="r">
        <picker mode='date' name='graduateyear' value='2008' fields='year' start='1990' end='2030' @change='graduateyearchange'>{{graduateyear || '点击选择毕业年份'}}</picker>
      </span>
    </div>
    <div class="item line">
      <span class="l">*</span>
      <span class="m">教授科目：</span>
      <span class="r">
        <picker mode='multiSelector' name='course' :range='coursese' value='[0,0]' @change='coursechange'>{{course || '点击选择教授科目'}}</picker>
      </span>
    </div>
    <div class="item line">
      <span class="l">*</span>
      <span class="m">教授费用：</span>
      <span class="r price">
        <input type="number" name="price" placeholder="每课时费用">元/小时
      </span>
    </div>
    <div class="item line">
      <span class="l">*</span>
      <span class="m">教授方式：</span>
      <span class="r">
        <checkbox-group name='teachtype' @change='teachtypechange'>
          <checkbox color='#377BF0' value='学生上老师家'>学生上老师家</checkbox>
          <checkbox color='#377BF0' value='老师上学生家'>老师上学生家</checkbox>
          <checkbox color='#377BF0' value='远程教学'>远程视频教学</checkbox>
        </checkbox-group>
      </span>
    </div>
    <div class="item line">
      <span class="l">*</span>
      <span class="m">教学经验：</span>
      <span class="r" style="display:flex;flex-direction:row;">
        <input type="number" value="1" name='teachyear' >年
      </span>
    </div>
    <div class="item block place">
      <span class="l">*</span>
      <span class="m">常住地点：</span>
      <div class="r">
        <!-- <div><button hover-class='btnhover'>选择城市</button></div> -->
        <div>
          <span class="iconfont icon-round"></span>
          <span @click='chooselocation'>{{ form.citylabel || '点击选择你的小区位置' }}</span>
          <input type="text" name='citylabel' disabled v-model="form.citylabel" hidden>
          <input type="text" name='code' disabled v-model="form.code" hidden>
        </div>
        <div class="community">
          小区：<input type="text" name="community" id="" placeholder="小区名" v-model="form.community" confirm-type='next'>
        </div>
      </div>
    </div>
    <div class="item line">
      <span class="l">*</span>
      <span class="m">教授区域：</span>
      <span class="r">
        <picker mode='region' name='teacharea' @change='teachareachange'>{{teacharea || '点击选择可教授区域'}}</picker>
      </span>
    </div>
    <div class="item line daypick">
      <span class="l">*</span>
      <span class="m">可教授日：</span>
      <span class="r">
        <checkbox-group name='teachday'>
          <checkbox color='#377BF0' value='星期一'>星期一</checkbox>
          <checkbox color='#377BF0' value='星期二'>星期二</checkbox>
          <checkbox color='#377BF0' value='星期三'>星期三</checkbox>
          <checkbox color='#377BF0' value='星期四'>星期四</checkbox>
          <checkbox color='#377BF0' value='星期五'>星期五</checkbox>
          <checkbox color='#377BF0' value='星期六'>星期六</checkbox>
          <checkbox color='#377BF0' value='星期日'>星期日</checkbox>
        </checkbox-group>
      </span>
    </div>
    <div class="item line">
      <span class="l">*</span>
      <span class="m">教授时间段：</span>
      <span class="r  timepick">
        <picker mode="time" name='teachstarttime' value='19:00' @change='starttimechange'>{{teachstarttime}}</picker>
        <span>至</span>
        <picker mode="time" name='teachendtime' value='20:00' @change='endtimechange'>{{teachendtime}}</picker>
      </span>
    </div>
    <div class="item line">
      <span class="l">*</span>
      <span class="m">身份证号码：</span>
      <span class="r">
        <input type="idcard" name='idno' v-model="form.idno" placeholder="请输入身份证号" confirm-type='next' maxlength='18'>
      </span>
    </div>
    <div class="item block">
      <span class="l">*</span>
      <span class="m">身份证正面：</span>
      <div class="r">
        <mp-uploader @upLoadSuccess="upLoadSuccess" @upLoadFail="upLoadFail0" @uploadDelete="uploadDelete" :showTip='showtip' :count='piccount' :maxLength='maxlength' which='1'></mp-uploader>
        <input type="text" name='idcard1' disabled v-model="imgurls['1']" hidden>
      </div>
    </div>
    <div class="item block">
      <span class="l">*</span>
      <span class="m">身份证反面：</span>
      <div class="r">
        <mp-uploader @upLoadSuccess="upLoadSuccess" @upLoadFail="upLoadFail1" @uploadDelete="uploadDelete" :showTip='showtip' :count='piccount' :maxLength='maxlength' which='2'></mp-uploader>
        <input type="text" name='idcard2' disabled v-model="imgurls['2']" hidden>
      </div>
    </div>
    <div class="textarea">
      <span class="l">*</span>
      <span class="m">个人介绍：</span>
      <span class="r">
        <textarea name='applydesc' type="text" v-model="form.desc" placeholder="突出优势、经验与强项..." />
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

import qqmap from "@/wxapis/qqmap.js";
var mymap = new qqmap({
  // 地图开发秘钥
  key: conf.mapkey // 必填
});


import checkscope from "@/wxapis/check_scope";
import authorize from "@/wxapis/authorize";
import openSetting from "@/wxapis/openSetting";
import modal from "@/wxapis/modal";
import chooselocation from "@/wxapis/chooselocation";


import mpSwitch from 'mpvue-weui/src/switch';
import mpCitypicker from 'mpvue-weui/src/city-picker';
import mpUploader from '@/components/mpuploader.vue';
import slogan from "@/components/slogan";

export default {
  data() {
    return {
      userInfo: {},
      xueliarr:['大专','本科','硕士','博士'],
      xueli:'',
      graduateyear:'',
      rolearr:['专职小学老师','专职初中老师','专职高中老师','专职艺术老师','在读兼职大学生','其他'],
      role:'',
      school:'',
      major:'',
      course:'',
      coursese:[["小学","初中","高中","艺术","兴趣"], ["语文","数学","英语","物理","化学","钢琴","古筝","画画","舞蹈","棋类","其他"]],
      teacharea:'',
      teachstarttime:"开始时间",
      teachendtime:"结束时间",
      form:{
        name:'',
        phone:'',
        // fulltime:true,
        // currentjob:'',
        idno:'',
        idcardurl1:'',
        idcardurl2:'',
        idcardurl3:'',
        desc:'',
        phone:'',
        longitude:'',
        latitude:'',
        code:'',
        citylabel:'',
        community:'',
        province:'',
        city:'',
        country:''
      },
      // uploader配置项
      piccount:1,
      showtip:true,
      maxlength:1,
      // 上传的2张照片
      imgurls:{
        1:'',
        2:''
      }

    };
  },
  components: {
    mpSwitch,mpUploader,mpCitypicker,slogan
  },
  methods: {
    starttimechange(e){
      console.log(e.mp.detail.value);
      this.teachstarttime = e.mp.detail.value
    },
    endtimechange(e){
      console.log(e.mp.detail.value);
      this.teachendtime = e.mp.detail.value
    },
    xuelichange(e){
      console.log(e.mp.detail);
      
      this.xueli = this.xueliarr[e.mp.detail.value]
    },
    rolechange(e){
      console.log(e.mp.detail);
      this.role = this.rolearr[e.mp.detail.value]
    },
    graduateyearchange(e){
      console.log(e.mp.detail);
      
      this.graduateyear = e.mp.detail.value
    },
    coursechange(e){
      console.log(e.mp.detail);
      let type = this.coursese[0][e.mp.detail.value[0]]
      let name = this.coursese[1][e.mp.detail.value[1]]
      this.course = type + name
      this.coursetype = type
      this.coursename = name
      console.log(this.course);
      
    },
    teachtypechange(e){
      console.log(e.mp.detail.value);
      
    },
    teachareachange(e){
      console.log(e.mp.detail.value);
      this.teacharea = e.mp.detail.value.join('-')
    },
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
    
    async chooselocation() {
      try {
        let location = (await chooselocation()) || null;
        this.location = location.name || "切换位置";
        // console.log(location);
        this.form.citylabel = location.address+' '+location.name;
        this.form.longitude = location.longitude;
        this.form.latitude = location.latitude;

        let querycode = await this.reverseGeocoder(
          location.longitude,
          location.latitude
        );
        // console.log("querycode:", querycode);

        this.form.code = querycode.result.ad_info.adcode;
        

        this.form.province = querycode.result.address_component.province;
        this.form.city = querycode.result.address_component.city;
        this.form.country = querycode.result.address_component.district;
        

        // wx.setStorageSync("zutuanposition", location);
      } catch (error) {
        wx.showToast({
          title: '您没有选择定位',
          duration: 1500,
          icon: "none"
        });
      }
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
    citychange({label, value, cityCode}){
      // console.log(label, value, cityCode);
      
    },
    cityconfirm({label, value, cityCode}){
      // console.log(label, value, cityCode);
      this.citylabel = label
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
          let data = JSON.parse(res.data)
          console.log('data:');
          console.log(data);
          
          // console.log(data.data);
          // console.log(data.data.imgUrl);
          
          if(data.data.imgUrl){
            self.imgurls[which]= data.data.imgUrl
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
      wx.showLoading({
        title: '提交中...',
        mask:true
      })
      var self = this
      let {formId, value} = data.mp.detail
      // console.log(value);
      // 数据校验
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          const element = value[key];
          if(!element.toString().trim()){
            console.log(key, element);
            
            return wx.showToast({
              title: '信息不完整,请检查遗漏信息',
              mask:true,
              icon:'none',
              duration:1500
            })
          }
        }
      }
      // console.log(formId , value);
      let arr = value.code.split('')     // 110201
      value.provincecode = arr[0]+arr[1] // 11
      value.citycode =     arr[2]+arr[3] // 02
      value.countrycode =  arr[4]+arr[5] // 01

      value.province = self.form.province
      value.city = self.form.city
      value.country = self.form.country

      value.longitude = self.form.longitude
      value.latitude = self.form.latitude

      value.course = this.course
      value.coursetype = this.coursetype
      value.coursename = this.coursename

      value.course = this.course

      qc.request({
        // login:true,
        method:"POST",
        data:{formId , ...value},
        url: conf.service.teacherapplyUrl,
        success(res){
          // console.log(res);

          // if(res.data.code == ){

          // }
          wx.hideLoading()
          wx.showToast({
            title:res.data.msg,
            icon:'none',
            duration:1400
          })
          // setTimeout(function(){
          //   wx.switchTab({
          //     url:'/pages/index/main'
          //   })
          // },1600)
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
        }
      })

    }
    
  },

  async onShow() {

  }
};
</script>

<style scoped lang='scss'>
$maincolor: #377BF0;
.toptip{
  background: #efefef; 
  padding: 12rpx 0;
  text-align: center;   
  font-size: 28rpx;
}
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
    .timepick{
      display: flex;
      flex-direction: row;
      span{
        display: inline-block;
        padding: 0 12rpx;
        color: #377BF0;
      }
    }
  }
  .price{
    display: flex;
    flex-direction: row;
  }
  .block{
    .r{
      width: 450rpx;
      // display: felx;
      flex-direction: row;
    }
  }
  .daypick{
    .m{
      width: 340rpx;
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
      .community{
        margin-top: 10rpx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        input{
          width: 320rpx;
        }
      }
    }
  }
  .textarea{
    font-size: 32rpx;
    // height: ;
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

</style>
