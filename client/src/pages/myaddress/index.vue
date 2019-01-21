<template>
  <div class="con">
    <!-- <div> -->
    <!-- <address-card v-for='(x,i) in list' :key='i' :info.sync='x' :index='i' @setdefault='setdefault'></address-card> -->
    <div class="card" v-for="(x,i) in list" :key="i">
      <div class="t main">
        <span>收件人：{{x.userName}}</span>
        <span>&nbsp;&nbsp; 手机号：{{x.telNumber}}</span>
      </div>
      <div class="m main">
        地址：{{x.provinceName}} {{x.cityName}} {{x.countyName}}
        {{x.detailInfo}}
      </div>
      <div class="b main">
        <!-- :class="x.isdefault?'focus':'btn-edit'" -->
        <div :class="x.isdefault?'focus':'btn-edit'" @click="setdefault(i)">
          <div class="btn1"></div>
          <span>{{x.isdefault?'默认地址':'设为默认'}}</span>
        </div>
        <div class="btn-edit" @click="edit(i)">编辑</div>
        <div class="btn-edit" @click="del(i)">删除</div>
      </div>
    </div>
    <i-divider content="已经到底啦" ></i-divider>
    <!-- </div> -->
    <div class="importwx">
      <button @click="getwxaddress" hover-class="btn-hover">微信导入</button>
      <button @click="addaddress" hover-class="btn-hover">手动添加</button>
    </div>
    <div class="modalcon" v-if="showedit">
      <div class="title">{{title}}</div>
      <div>
        <form @submit="confirmedit">
          <div>
            <span>收件人:</span>
            <input type="text" v-model="form.userName" name="userName" placeholder="请输入收件人姓名">
          </div>
          <div>
            <span>手机号:</span>
            <input type="number" v-model="form.telNumber" name="telNumber" placeholder="请输入收件人手机号">
          </div>
          <div>
            <span>省市区:</span>
            <input
              type="text"
              name="citylabel1"
              v-model="citylabel1"
              disabled
              @click="showcitypicker"
              placeholder="点击选择省市区"
            >
          </div>
          <div class="textarea">
            <span>详细地址:</span>
            <textarea type="text" v-model="form.detailInfo" name="citylabel2" placeholder="请输入详细地址"></textarea>
          </div>
          <div class="btncon">
            <button class="canceledit" @click="canceledit">取消</button>
            <button class="confirmedit" form-type="submit">确定</button>
          </div>
        </form>
      </div>
    </div>
    <mp-citypicker
      ref="mpCityPicker"
      :pickerValueDefault="pickerValueDefault"
      @onChange="citychange"
      @onCancel="citycancel"
      @onConfirm="cityconfirm"
    ></mp-citypicker>
  </div>
</template>

<script>
import qc from "wafer2-client-sdk";
import conf from "@/config";

import checkscope from "@/wxapis/check_scope";
import authorize from "@/wxapis/authorize";
import mpCitypicker from "mpvue-weui/src/city-picker";

export default {
  components: {
    mpCitypicker
  },
  data() {
    return {
      clas: "btn-edit",
      defaulttext: "设为默认",
      showedit: false,
      modaltype: "add",
      edititem: {},
      pickerValueDefault: [0, 0, 0],
      citylabel1: "",
      form: {
        cityName: "",
        countyName: "",
        detailInfo: "",
        nationalCode: "",
        postalCode: "",
        provinceName: "",
        telNumber: "",
        userName: "",
        isdefault: false
      },
      list: [],
      list1: [],
      edittype: "",
      editindex: ""
    };
  },
  computed: {
    title: function() {
      if (this.modaltype == "add") {
        return "新增收货地址";
      } else if (this.modaltype == "edit") {
        return "编辑收货地址";
      }
    }
  },
  created() {},
  methods: {
    async getwxaddress() {
      var self = this;
      let checkres = await checkscope("scope.address");
      console.log(checkres);
      if (!checkres) {
        let authres = await authorize("scope.address");
        console.log(authres);
        if (authres.errMsg == "authorize:ok") {
          // 授权了
          wx.chooseAddress({
            success(res) {
              // res:
              //cityName:"广州市",
              //countyName:"海珠区",
              //detailInfo:"新港中路397号",
              //errMsg:"chooseAddress:ok",
              //nationalCode:"510000",
              //postalCode:"510000",
              //provinceName:"广东省",
              //telNumber:"020-81167888",
              //userName:"张三",
              console.log(res);
              delete res.errMsg;
              console.log(res);
              self.list1.push(res);
              self.edittype = "importwx";
              self.confirmedit();
            },
            fail(err) {
              console.log("err:", err);
            },
            complete() {}
          });
        } else {
          // 拒绝了
        }
      } else {
        wx.chooseAddress({
          success(res) {
            // res:
            //cityName:"广州市",
            //countyName:"海珠区",
            //detailInfo:"新港中路397号",
            //errMsg:"chooseAddress:ok",
            //nationalCode:"510000",
            //postalCode:"510000",
            //provinceName:"广东省",
            //telNumber:"020-81167888",
            //userName:"张三",
            console.log(res);
            delete res.errMsg;
            console.log(res);
            self.list1.push(res);
            self.edittype = "importwx";
            self.confirmedit();
          },
          fail(err) {
            console.log("err:", err);
          },
          complete() {}
        });
      }
    },
    addaddress() {
      this.edittype = "add";
      // 手动新增地址
      this.form = {
        userName: "",
        telNumber: "",
        provinceName: "",
        cityName: "",
        countyName: "",
        detailInfo: "",
        nationalCode: ""
      };
      (this.pickerValueDefault = [0, 0, 0]), (this.showedit = true);
    },
    getmyaddress() {
      let self = this;
      wx.showLoading({
        title: "地址获取中..."
      });
      qc.request({
        url: conf.service.addresslistUrl,
        // method:"GET",
        data: {},
        success(res) {
          wx.hideLoading();
          wx.showToast({
            title: "地址刷新成功",
            duration: 1000,
            icon: "success"
          });
          console.log(res.data.data);
          self.list = res.data.data;
          self.list1 = res.data.data;
          try {
            wx.setStorageSync("address", res.data.data);
          } catch (e) {
            console.log(e);
            
          }
        },
        fail(err) {
          wx.showToast({
            title: "网络貌似在开小差",
            duration: 1000,
            icon: "none"
          });
        }
      });
    },
    setdefault(index) {
      var self = this;
      console.log(index);
      this.list.map(function(v, i) {
        console.log(i);
        self.list[i].isdefault = false;
      });
      // setTimeout(function(){
      self.list[index].isdefault = true;
      // },300)
      console.log(this.list);
      this.edittype = "setdefault";
      this.confirmedit();
    },

    del(x) {
      let self = this;
      wx.showModal({
        title: "提示",
        content: "真的要删除该地址？",
        showCancel: true,
        success(res) {
          console.log(res);
          if (res) {
            self.edittype = "del";
            self.list1.splice(x, 1);
            self.confirmedit();
          } else {
          }
        }
      });
    },
    edit(x) {
      // this.$refs.mpCityPicker.show();
      this.edittype = "edit";
      this.editindex = x;

      this.showedit = true;
      console.log(this.list[x]);
      // cityName: "",
      // countyName: "",
      // detailInfo: "",
      // nationalCode: "",
      // postalCode: "",
      // provinceName: "",
      // telNumber: "",
      // userName: "",
      // isdefault: false
      this.form.cityName = this.list[x].cityName;
      this.form.countyName = this.list[x].countyName;
      this.form.detailInfo = this.list[x].detailInfo;
      this.form.isdefault = this.list[x].isdefault;
      this.form.nationalCode = this.list[x].nationalCode;
      this.form.postalCode = this.list[x].postalCode;
      this.form.provinceName = this.list[x].provinceName;
      this.form.telNumber = this.list[x].telNumber;
      this.form.userName = this.list[x].userName;

      this.citylabel1 =
        this.list[x].provinceName +
        "-" +
        this.list[x].cityName +
        "-" +
        this.list[x].countyName;
      console.log(this.form);
    },
    citychange({ label, value, cityCode }) {
      console.log(label, value, cityCode);
    },
    cityconfirm({ label, value, cityCode }) {
      console.log(label, value, cityCode);
      let arr = label.split("-");
      this.form.provinceName = arr[0];
      this.form.cityName = arr[1];
      this.form.countyName = arr[2];
      this.form.nationalCode = cityCode;
      this.citylabel1 = label;
      this.code = cityCode;
    },
    citycancel({ label, value, cityCode }) {
      console.log(label, value, cityCode);
    },
    showcitypicker() {
      console.log("show");
      this.$refs.mpCityPicker.show();
    },
    canceledit() {
      this.showedit = false;
    },
    confirmedit(x) {
      let self = this;

      if (self.edittype == "add") {
        console.log(x);
        // citylabel1:"江苏省-苏州市-吴中区",
        // citylabel2:"45456456",
        // telNumber:"23",
        // userName:"12"
        let formdata = x.mp.detail.value;
        console.log(formdata);
        this.form.detailInfo = formdata.citylabel2;
        this.form.telNumber = formdata.telNumber;
        this.form.userName = formdata.userName;

        this.list1.push(this.form);
        var string = JSON.stringify(this.list1);
        console.log(this.form);
      } else if (self.edittype == "edit") {
        let formdata = x.mp.detail.value;
        this.form.detailInfo = formdata.citylabel2;
        this.form.telNumber = formdata.telNumber;
        this.form.userName = formdata.userName;
        console.log(this.form);
        this.list[this.editindex] = this.form;
        this.list1[this.editindex] = this.form;
        var string = JSON.stringify(this.list);
      } else if (self.edittype == "del") {
        var string = JSON.stringify(this.list1);
      } else if (self.edittype == "importwx") {
        var string = JSON.stringify(this.list1);
      } else if (self.edittype == "setdefault") {
        var string = JSON.stringify(this.list);
      }
      wx.showLoading({
        title: "地址更新中..."
      });
      qc.request({
        url: conf.service.addresseditUrl,
        method: "POST",
        data: {
          address: string
        },
        success(res) {
          wx.hideLoading();
          wx.showToast({
            title: "地址更新中...",
            duration: 1200,
            icon: "success"
          });
          self.showedit = false;
          self.form = {
            userName: "",
            telNumber: "",
            provinceName: "",
            cityName: "",
            countyName: "",
            detailInfo: "",
            nationalCode: ""
          };
        },
        fail(err) {},
        complete() {
          self.getmyaddress();
        }
      });
    }
  },
  onLoad() {
    this.getmyaddress();
  }
};
</script>

<style lang='scss' scoped>
$maincolor: #377BF0;
.con {
  width: 100%;
  min-height: 100%;
  background-color: #eee;
  position: absolute;
  top: 0;
  bottom: 0;
  .card {
    padding: 12rpx 20rpx;
    margin: 0 auto 12rpx;
    background-color: #fff;
    .main {
      font-size: 32rpx;
    }
    .m {
      padding-bottom: 12rpx;
    }
    .b {
      border-top: 1px solid rgb(204, 204, 204);
      padding-top: 12rpx;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      color: rgb(173, 173, 173);

      & > div {
        margin: 0 20rpx 0 0;
        height: 40rpx;
        line-height: 40rpx;
        font-size: 30rpx;
      }
      .btn-edit {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
      .btn1 {
        display: inline-block;
        border: 1px solid rgb(173, 173, 173);
        height: 30rpx;
        width: 30rpx;
        border-radius: 20rpx;
        box-sizing: border-box;
      }
      .focus {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .btn1 {
          display: inline-block;
          border: none;
          background-color: $maincolor;
          height: 30rpx;
          width: 30rpx;
          border-radius: 20rpx;
          box-sizing: border-box;
        }
        span {
          color: $maincolor;
        }
      }
    }
  }
  .importwx {
    width: 100%;
    position: fixed;
    bottom: 0rpx;
    z-index: 2;
    background-color: #fff;
    padding: 20rpx 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    button {
      width: 40%;
      background-color: $maincolor;
      height: 80rpx;
      line-height: 80rpx;
      color: #fff;
      border: none;
      border-radius: 40rpx;
      margin: 0;
      display: block;
    }
    .btn-hover {
      background-color: rgb(161, 0, 0);
    }
  }
  .btm {
    text-align: center;
    font-size: 28rpx;
    color: #ccc;
    padding-bottom: 120rpx;
    background-color: #eee;
    width: 100%;
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
    form {
      div {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 12rpx 0;
        border-bottom: 1rpx solid #ccc;
        span {
          width: 160rpx;
          // background: pink;
          font-size: 30rpx;
        }
        input {
          width: 400rpx;
          display: inline-block;
          margin-left: 15rpx;
          font-size: 30rpx;
        }
      }
      .textarea {
        align-items: flex-start;
        border: none;
        textarea {
          width: 450rpx;
          margin-left: 15rpx;
          height: 130rpx;
          border: 1px solid #e5e5e5;
          font-size: 30rpx;
        }
      }
      .btncon {
        border: none;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        button {
          width: 40%;
          height: 60rpx;
          line-height: 60rpx;
          font-size: 34rpx;
          background-color: #fff;
          margin: 0;
          padding: 0;
          border: 1px solid #ccc;
        }
        .canceledit {
        }
        .confirmedit {
          color: $maincolor;
        }
      }
    }
  }
}
</style>
