<template>
  <div class="page">
    
  </div>
</template>

<script>



export default {
  components: {

  },

  data () {
    return {
      logs: []
    }
  },

  created () {

  },
  onShow() {
    // 判断是否已登录
    // wx.getSetting({
    //   success(res) {
    //     console.log(res);
    //     if (!res.authSetting["scope.userInfo"]) {
    //       // 未授权或拒绝授权的情况
    //       wx.showModal({
    //         title: '提示',
    //         content: '登录后才能查看哦~',
    //         showCancel: true,
    //         cancelText: '取消',
    //         cancelColor: '#eee',
    //         confirmText: '前去登录',
    //         confirmColor: '#3CC51F',
    //         success: (result) => {
    //           if(result.confirm){
    //             wx.switchTab({
    //               url: "/pages/profile/main"
    //             });
    //           }
    //         },
    //         fail: ()=>{},
    //         complete: ()=>{}
    //       });
    //     }
    //   }
    // });
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
