<template>
  <div class="page">
    <swiper 
    indicator-dots='true'
    autoplay='true'
    interval='3000'
    duration='700'
    circular='true'>
    <block v-for="(x,i) in imgUrls" :key='i'>
      <swiper-item>
        <a :href="x.url">
          <img  :src="x.src" class="slide-image"/>
        </a>
      </swiper-item>
    </block>  
    </swiper>

    <div class="types">
      <div class="item" v-for="(x,i) in types" :key="i">
        <a :href="'/pages/course/main?coursecate='+x.enname">
          <div><i :class="x.icon" :style="'color:'+x.color"></i></div>
          <div>{{x.name}}</div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      imgUrls:[{
        id:0,
        src:'https://guanli.jiajiao114.com/admin/img/banner.png',
        url:"/pages/stu_detail/main"
      },{
        id:0,
        src:'https://guanli.jiajiao114.com/admin/img/2.png',
        url:"/pages/tech_detail/main"
      }],
      types:[{
        id:0,
        name:'语文',
        icon:'iconfont icon-yuwen',
        color:'red',
        enname:'yuwen'
      },{
        id:0,
        name:'数学',
        icon:'iconfont icon-shuxue',
        color:'blue',
        enname:'shuxue'
      },{
        id:0,
        name:'英语',
        icon:'iconfont icon-yingyu',
        color:'orange',
        enname:'yingyu'
      },{
        id:0,
        name:'物理',
        icon:'iconfont icon-wuli',
        color:'#74c13c',
        enname:'wuli'
      },{
        id:0,
        name:'化学',
        icon:'iconfont icon-huaxue',
        color:'orange',
        enname:'huaxue'
      },{
        id:0,
        name:'生物',
        icon:'iconfont icon-shengwu',
        color:'#8d38e0',
        enname:'shengwu'
        
      },{
        id:0,
        name:'艺术',
        icon:'iconfont icon-gangqin-yuanwenjian',
        enname:'yishu',
        color:'#2c2c32'
      },{
        id:0,
        name:'更多',
        icon:'iconfont icon-ziyuan',//icon-qita
        enname:'gengduo',
        color:'#f38433'//'#2A8956'//'#1A6FC8'
      },]
    };
  },

  components: {

  },

  methods: {
    
  },

  created() {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  }
};
</script>

<style lang='scss' scoped>
swiper{
  width: 750rpx;
  height: 300rpx;
  a{
    display: block;
    width:100%;
    height:100%;
    img{
      width:100%;
      height:100%;
    }
  }
}
.types{
  padding: 10rpx;
  display: flex;
  flex-flow: row  wrap;
  // x对齐
  justify-content: space-around;
  // y对齐
  align-items: center;
  .item{
    width: 25%;
    height: 120rpx;
    margin-bottom: 15rpx;
    // background: red;
    a{
      display: block;
      width: 100%;
      height: 100%;
      div:first-child{
        // background: blue;
        height: 90rpx;
        text-align: center;
        font-size: 80rpx;
        i{
          color:red;
          font-size: 80rpx;
        }
      }
      div:last-child{
        margin-top: 10rpx;
        text-align: center;
      }
    }
  }
}
</style>
