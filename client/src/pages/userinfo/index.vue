<template>
  <div class="main">
    <div class="head">请先完善联络信息，预约后系统会第一时间通知您</div>
    <div class="space"></div>
    <form report-submit=true @submit="formSubmit">
      <div class="item line">
        <span class="l"></span>
        <span class="m b">称呼：</span>
        <span class="r">
          <radio-group name=chenghu @change='chenghuchange'>
            <radio color='#377BF0' value='先生' checked>先生</radio>
            <radio color='#377BF0' value='女士'>女士</radio>
          </radio-group>
        </span>
      </div>
      <div class="item line">
        <span class="l"></span>
        <span class="m b">手机号：</span>
        <div class="r phonenumber">
          
          <input type="number" name='phone' placeholder="请输入手机号" v-model='phone' confirm-type='next' maxlength='11'>
          <button type="primary" size=mini open-type="getPhoneNumber"  
                  @getphonenumber='getphonenumber'>一键填写</button>
        </div>
      </div>
      <div class="space"></div>
      <button class='subbtn' form-type='submit' hover-class='btn-hover'>提交</button>
    </form>
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
      phone:''
    }
  },
  methods:{
    getphonenumber(e){
      console.log(e.mp.detail);
      let detail = e.mp.detail
      let msg = detail.errMsg
      if(msg != "getPhoneNumber:ok"){
        return wx.showToast({
          title:"获取不成功，请手动输入",
          icon:'none',
          duration:1800
        })
      }

      // 解密
      var self = this
      wx.showLoading({
        title:'自动填写中...'
      })
      qc.request({
        // login:true,
        url: conf.service.decryptwxinfo,
        method:"POST",
        data: detail,
        success:function(res) {
          wx.hideLoading();
          // console.log(res.data.msg);
          if(res.data.success){
            self.phone = res.data.data.purePhoneNumber //phoneNumber可能带区号
          }
          wx.showToast({
              title: res.data.msg, 
              duration: 1700,
              icon:'none',
              mask:true
          })
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
        },
        complete:function(){
          
        }
      });
    },
    phoneauth(){
      console.log('phoneauth');
    },
    formSubmit(e){
      console.log(e.mp.detail.value);
      var formdata = e.mp.detail.value
      // 校验
      
      if(!formdata.chenghu || !formdata.phone ){
        return wx.showToast({
          title:"信息填写不完整，请填写完整",
          icon:'none',
          duration:1500
        })
      }
      if( formdata.phone.length != 11 ){
        return wx.showToast({
          title:"手机号填写错误，请重新填写",
          icon:'none',
          duration:1500
        })
      }
      var self = this
      wx.showLoading({
        title:'信息提交中...'
      })
      qc.request({
        // login:true,
        url: conf.service.userphoneupload,
        method:"POST",
        data: formdata,
        success:function(res) {
          wx.hideLoading();
          // console.log(res.data.msg);
          
          wx.showToast({
              title: res.data.msg, 
              duration: 1500,
              icon:'none',
              mask:true
          })
          self.getrelease()
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
        },
        complete:function(){
          
        }
      });
    },
  },
  created () {

  },
  onShow() {
    
  },
  onLoad(){
    
  }
}
</script>

<style lang='scss' scoped>
$maincolor: #377BF0;
.main {
  // padding-top: 106rpx;
  padding: 40rpx 40rpx 20rpx;
}
.head{
  text-align: center;
  font-size: 30rpx;
  color: $maincolor;
  font-weight: 700;
  margin-bottom: 40rpx;
}
.item{
  font-size: 30rpx;
  .r{
    padding-left: 25rpx;
  }
  .b{
    font-weight: 700;
  }
  .phonenumber{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
.subbtn{
  background-color: $maincolor;
  color: #fff;
  width: 300rpx;
}
.btn-hover{
  background-color: rgb(28, 15, 218);

}
.space{
  border-bottom: 1rpx solid #e5e5e5;
  margin-bottom: 30rpx;
  margin-top: 30rpx;
}
</style>
