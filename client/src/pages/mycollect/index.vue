<template>
  <div class="container">
    <div class="nav">
      <nav-bar :tabs="tabs" :activeIndex="index" @tabClick="tabClick"></nav-bar>
    </div>
    <div class="main">
      <!-- <orderlist-item></orderlist-item> -->
      <div class="ordercon" v-for="(x,i) in which" :key="i">
        <div class="header main">
          <div class="m">
            <div
              class="l"
              @click="tocollectdetail(x)"
            >{{ x.name }} {{ x.coursetype }} {{ x.coursename }}</div>
            <div class="r">
              <div class="cancelcollect" @click="cancelcollect(x)">取消收藏</div>
            </div>
          </div>
          <div class="round" @click="tocollectdetail(x)">
            <span class="iconfont icon-round"></span>
            {{ x.citylabel }}
          </div>
        </div>
      </div>
      <!-- <div class="nothing" v-if='!which.length'>
      <i class="iconfont icon-quanbudingdan01"></i>
      <div>您还没有相关订单</div>
      </div>-->
    </div>
  </div>
</template>

<script>
import checkscope from "@/wxapis/check_scope";
import authorize from "@/wxapis/authorize";
import openSetting from "@/wxapis/openSetting";
import modal from "@/wxapis/modal";

import navBar from "@/components/navbar";

export default {
  data() {
    return {
      tabs: ["老师", "学员"],
      tabstate: ["teacher", "student"],
      teacher: [],
      student: [],
      which: [],
      index: 0
    };
  },
  components: {
    navBar
  },
  methods: {
    cancelcollect(x) {
      var self = this;
      // 删除收藏
      console.log(x);
      if (x.usertype == "teacher") {
        this.teacher.map(function(v, i) {
          if (v.openid == x.openid) {
            self.teacher.splice(i, 1);
          }
        });
        wx.setStorage({
          key: "teacher_collect",
          data: this.teacher
        });
      } else {
        this.student.map(function(v, i) {
          if (v.openid == x.openid && v.randomstr == x.randomstr) {
            self.student.splice(i, 1);
          }
        });
        wx.setStorage({
          key: "student_collect",
          data: this.student
        });
      }
    },
    tocollectdetail(x) {
      console.log(x);
      if (x.usertype == "teacher") {
        var url = `/pages/teacherdetail/main?openid=${x.openid}`;
      } else {
        var url = `/pages/studentdetail/main?openid=${x.openid}&randomstr=${
          x.randomstr
        }`;
      }
      wx.navigateTo({
        url
      });
    },
    tabClick: function(x) {
      // console.log(x);
      this.index = x;
      this.which = this[this.tabstate[x]];
      // console.log('which:',this.which);
    },
    getcollect() {
      var teacher_collect = wx.getStorageSync("teacher_collect") || [];
      var student_collect = wx.getStorageSync("student_collect") || [];
      this.teacher = teacher_collect;
      this.student = student_collect;
      this.which = teacher_collect;
      console.log(this.teacher);
      console.log(this.student);
    }
  },
  onShow() {
    this.getcollect();
  },
  onPullDownRefresh() {
    this.getcollect();
  }
};
</script>

<style lang='scss'>
$maincolor: #377bf0;
.weui-navbar__item.weui-bar__item_on {
  color: $maincolor !important;
}
.weui-navbar-slider-on.data-v-79639602 {
  background-color: #377bf0 !important;
}
</style>
<style scoped lang='scss'>
$maincolor: #377bf0;
.nav {
  position: fixed;
  top: 0;
  width: 100%;
  height: 106rpx;
  background-color: #fff;
  z-index: 999;
}
.main {
  padding-top: 106rpx;
}
.nothing {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 50rpx;
  i {
    font-size: 200rpx;
    line-height: 200rpx;
    text-align: center;
    color: #ccc;
  }
  div {
    font-size: 34rpx;
    text-align: center;
  }
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
        .cancelcollect {
          text-align: center;
          color: red;
          border: 1rpx solid red;
          border-radius: 30rpx;
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
    }
  }
}
</style>
