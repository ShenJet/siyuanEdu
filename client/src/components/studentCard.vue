<template>
  <div class="card">
    <div class="i-class i-card" :class="full ? 'i-card-full' : ''">
      <div class="i-class i-card-header">
        <div class="i-card-header-content">
          <img class="i-card-header-thumb" :src="info.avatar" mode="aspectFit" v-if="info.avatar" />
        </div>
        <div class="mid">
          <div class="t">
            <div class="name">
              <img src='/static/img/nan.png' mode='aspectFill' v-if="info.sex == '男'" />
              <img src='/static/img/nv.png' mode='aspectFill' v-if="info.sex == '女'" />
               {{ info.name }}
            </div>
            <div class="coursetype">{{info.coursetype}}</div>
            <div class="coursename">{{info.coursename}}</div>
          </div>
          <div class="m">
            希望找{{info.teachyear}}年教龄的{{info.teachersex}}老师
          </div>
          <div class="b">
            <span class="iconfont icon-yanzheng1"></span>信息核验
            <span class="iconfont icon-shenfenzheng"></span>身份认证
          </div>
        </div>
        <div class="i-card-header-extra" @click="studentdetail">
          <span>查看详情</span>
        </div>
      </div>
      <div class="i-class i-card-footer">
        <span class="iconfont icon-round"></span>
        {{info.city}} {{info.country}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: Object
  },
  data:function(){
    return {
      full:true,
    }
  },
  methods:{
    studentdetail(){
      this.$emit('studentdetail')
    }
  }
};
</script>

<style lang='scss' scoped>
$maincolor: #377BF0;
.card{
  padding: 0;
}
.i-card {
  margin: 0 16px;
  font-size: 14px;
  overflow: hidden;
  position: relative;
  background: #fff;
  border-top: 1rpx solid #dddee1;
  border-radius: 5px;
}

.i-card-full {
  margin: 0;
  border-left: none;
  border-right: none;
  border-radius: 0;
}

.i-card-header {
  display: flex;
  padding: 6px 16px;
  align-items: center;
}

.i-card-header-content {
  // flex: 1;
  text-align: left;
}
.mid{
  width: 350rpx;
  min-height: 64px ;
  padding: 0 12rpx 0 30rpx;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 34rpx;
  .t{
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    width: 100%;
    .name{
      display: flex;
      align-items: center;
      font-size: 34rpx;
      font-weight: 600;
      img{
        width: 32rpx;
        height: 40rpx;
      }
    }
    .coursetype{
      display: flex;
      align-items: center;
      font-size: 32rpx;
      padding-left: 10rpx;
    }
    .coursename{
      display: flex;
      align-items: center;
      font-size: 32rpx;
      padding-left: 10rpx;
    }
  }
  .m{
    font-size: 32rpx;
  }
  .b{
    font-size: 28rpx;
    span{
      color: $maincolor;
    }
  }
}
.i-card-header-thumb {
  display: inline-block;
  width: 64px;
  height: 64px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  background-size: cover;
  vertical-align: middle;
  border-radius: 12rpx;
}

.i-card-header-title {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  color: #1c2438;
}

.i-card-header-extra {
  // flex: 1;
  text-align: right;
  font-size: 34rpx;
  font-weight: 600;
  color: $maincolor;
  span{
    display: inline-block;
    color: $maincolor;
    border: 1rpx solid $maincolor;
    padding: 5rpx 18rpx;
    font-size: 30rpx;
    border-radius: 30rpx;
  }
}

.i-card-body {
  position: relative;
  padding: 6px 16px;
  color: #495060;
  font-size: 14px;
}

.i-card-body::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  transform: scale(0.5);
  transform-origin: 0 0;
  pointer-events: none;
  box-sizing: border-box;
  border: 0 solid #e9eaec;
  border-top-width: 1px;
}

.i-card-footer {
  position: relative;
  padding: 0px 16px 6px;
  color: #80848f;
  font-size: 12px;
  .tag{
    display: inline-block;
    padding: 0 12rpx;
    background: $maincolor;
    color: #fff;
    border-radius: 30rpx;
    margin-right: 10rpx;
  }
}
</style>
