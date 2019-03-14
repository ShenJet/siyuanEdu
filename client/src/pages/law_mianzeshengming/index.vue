<template>
  <div class="container">
    <div class="head">【免责申明】</div>
    <div class="content">
      <div>如发生以下情况，92家教网不对用户的直接或间接损失承担法律责任：</div>
      <div>1、92家教网系信息服务平台，不保证该等信息的准确性、有效性、及时性或完整性。提供信息的真实性、合法性等由信息提供者承担相关法律责任。</div>
      <div>2、不可抗力事件导致的服务中断或92家教网无法控制的原因所导致的用户损失，92家教网不承担任何责任。</div>
      <div>3、用户使用92家教网网站（包括链接到第三方网站或自第三方网站链接）而可能产生的计算机病毒、黑客入侵、系统失灵或功能紊乱等导致的用户损失，92家教网不承担任何责任。</div>
      <div>4、由于用户将个人注册账号信息告知他人或与他人共享注册帐号，由此导致的任何风险或损失，由用户自行承担。</div>
      <div>5、 教师与学员间或与任何第三人间的违约行为、侵权责任等，由有关当事人自行承担法律责任。</div>
      <div>6、92家教网对于任何信息和其他通信或其他本服务所保留或传输的内容的删除或存储失败，不承担任何责任。92家教网对于那些经过延长期限仍未重新使用的暂停帐户保留取消的权利，并可随时自主决定，发出或无须通知。</div>
      <div>7、 如因系统维护或升级而需要暂停网络服务，92家教网将尽可能事先在网站进行通知。</div>
      <div>8、 92家教网平台主张次结课时费，若教员与家长之间因协商非次结而导致的经济纠纷92家教网平台概不负责。</div>
      <div>9、92家教网仅负责提供家教信息，不承担家教信息以外的其它责任。</div>

    </div>
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