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
    <div class="ruzhu">
      <div class="tech">
        <div class="l">
          <img src="/static/image/tech.png" alt="老师">
           <span>我是老师</span>
        </div>
        <div class="r">
           <span @click="ruzhu('teacher')">立即入驻</span>
        </div>
      </div>
      <div class="stu">
        <div class="l">
          <img src="/static/image/stu.png" alt="学生">
           <span>我是学生</span>
        </div>
        <div class="r">
           <span @click="ruzhu('student')">完善资料</span>
        </div>
      </div>
    </div>
    <div class="list">
      <tech-card v-for="(x,i) in teacherlist" :key='i' :info='x'></tech-card>
    </div>
  </div>
</template>
<script>
import qc from 'wafer2-client-sdk'
import conf from '@/config'
import teacherCard from '@/components/teacherCard'
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
      types:[
        {
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
    ruzhu(x){
      let url = `/pages/apply${x}/main`;
      let self = this
      wx.showLoading({
        title: '信息查询中...',
        mask:true,
      })
      qc.request({
        url: conf.service.rolecheckUrl,
        data:{},
        success(res){
          console.log(res);
          console.log(res.data.data , JSON.stringify(res.data.data) == '{}');
          wx.setStorage({
            key:'role',
            data: {
              name: res.data.data.name,
              status: res.data.data.status
            }
          })
          if(res.data.data == null || JSON.stringify(res.data.data) == '{}'){
            return wx.navigateTo({ url })
          }
          if(res.data.data == 'teacher' || res.data.data == 'student'){
            return wx.showToast({
              title:res.data.msg,
              icon:'none',
              duration:1800
            })
          }
        },
        fail(){
          
        },
        complete(){
          wx.hideLoading()
        }
      })
    }
  },

  created() {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  }
};
</script>

<style lang='scss' scoped>
$maincolor: #377BF0;
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
    // height: 120rpx;
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
.ruzhu{
  width: 750rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: space-between;
  padding: 0 20rpx;
  
  &>div{
    width: 340rpx;
    // height: 120rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    // background: pink;
    padding: 14rpx 0;
    border-radius: 12rpx;
    box-shadow: 1px 1px 2px 2px rgb(206, 206, 206);
    .l{
      img{
        width: 110rpx;
        height: 110rpx;
        margin: 0 auto;
      }
      display: flex;
      flex-direction: column;
      font-size: 30rpx;
    }
    .r{
      padding-left: 16rpx;
      span{
        color: $maincolor;
        font-size: 32rpx;
        text-decoration: underline;
        font-weight: 600;
      }
    }
  }
  .stu{
    margin-left: 30rpx;
  }
}
</style>
