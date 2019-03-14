<template>
  <div class="container">
    
    <div class="head">【隐私保护】</div>
    <div class="content">
      <div>1、用户隐私制度</div>
      <div>尊重用户个人隐私是92家教的一项基本政策。所以，92家教一定不会公开、编辑或透露用户的注册资料及保存在92家教各项服务中的非公开内容，除非92家教在诚信的基础上认为透露这些信息在以下几种情况是必要的：</div>
      <div>（1）遵守有关法律规定，包括在国家有关机关查询时，提供用户在92家教的网页上发布的信息内容及其发布时间、互联网地址或者域名。</div>
      <div>（2）遵从92家教产品服务程序。</div>
      <div>（3）保持维护92家教的商标所有权。</div>
      <div>（4）在紧急情况下竭力维护用户个人和社会大众的隐私安全。</div>
      <div>（5）92家教认为必要的其他情况下。</div>
      <div>用户在此授权92家教可以向其电子邮箱发送商业信息。</div>
      <div>2、用户的帐号、密码和安全性</div>
      <div>您一旦注册成功成为用户，您将得到一个密码和帐号。如果您未保管好自己的帐号和密码而对您、92家教或第三方造成的损害，您将负全部责任。另外，每个用户都要对其帐户中的所有活动和事件负全责。您可随时改变您的密码或帐号等信息，也可以结束旧的帐户重开一个新帐户。用户同意若发现任何非法使用用户帐号或安全漏洞的情况，立即通告92家教。</div>
    </div>
    <div class=space></div>
    

    <i-load-more tip="已经到底了" :loading="false" />

  </div>
</template>
<script>


export default {
  data() {
    return {
      
    };
  },
  components: {
  },
  methods: {
  },
  onLoad(){
  },
  onShow(){
  },
};
</script>

<style scoped lang='scss'>
$maincolor: #377BF0;
.container{
  padding: 10rpx 20rpx 20rpx;
  background-color: rgba(255, 251, 230, 0.171)
}
.head{
  text-align: center;
  font-size: 36rpx;
  flex-wrap: 600;
}
.content{
  font-size: 28rpx;
  // color: rgba(48, 47, 47, 0.829);
  .title{
    color: #000;
    font-size: 32rpx;
  }
}

.space{
  height: 20rpx;
  background: #fff;
}

</style>