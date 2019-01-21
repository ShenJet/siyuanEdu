<template>
  <div v-show='show'>
    <img :src="src" mode='widthFix' alt="">
    <i class="iconfont icon-tubiao_guanbi off" @click='hide'></i>
  </div>
</template>

<script>
export default {
    props:['type'],
    data: function(){
      return {
        show: true
      }
    },
    computed: {
    src: function(){
      if(this.type == 'index'){
        return '/static/img/slogan.jpg'
      }else if(this.type == 'bangzhu'){
        return '/static/img/slogan1.jpg'
      }
    }
  },
    methods:{
      hide(){
        this.show = false
        // console.log(this.show );
        
      }
    }
}
</script>

<style lang='scss' scoped>
  div{
    width: 750rpx;
    background: pink;
    position: relative;
    overflow: hidden;
    img{
      width: 100%;
      float:left;
    }
    .off{
      display: block;
      position: absolute;
      right: 8rpx;
      top: 8rpx;
      color: #fff;
    }
  }
</style>
