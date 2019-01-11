<template>
  <div class='page'>
    <div class="userinfo">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>
    <div>
      <button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">微信登录</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  methods: {
    getUserInfo(e) {
      console.log(e);
      this.userInfo = e.mp.detail.userInfo;

      // 调用登录接口
      // wx.login({
      //   success: () => {
      //     wx.getUserInfo({
      //       success: (res) => {
      //         this.userInfo = res.userInfo
      //       },
      //       fail:()=>{
      //         console.log('登录失败')
      //       }
      //     })
      //   }
      // })
    }
  },
  created() {},
  onShow() {
    // 判断是否已登录
    wx.getSetting({
      success(res) {
        console.log(res);
        if (!res.authSetting["scope.userInfo"]) {
          // 未授权或拒绝授权的情况
          wx.showToast({
            title: '点击上方按钮以登录',
            icon: 'none',
            image: '',
            duration: 2500,
            mask: false,
            success: (result)=>{
              // wx.switchTab({
              //   url: "/pages/profile/main"
              // });
            },
            fail: ()=>{},
            complete: ()=>{}
          });
        }
      }
    });
  }
};
</script>

<style>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
</style>
