<template>
  <div class="page">
    <div class="top">
      <div>
        <picker mode='region' @change='regionchange'>
          {{ country || '地区' }}
          <span class="iconfont icon-tubiao_xiala"></span>
        </picker>
      </div>
      <div>
        <picker mode='multiSelector' :range='courses' value='[0,0]' @change='coursechange'>
          {{coursename || '科目'}}
          <span class="iconfont icon-tubiao_xiala"></span>
        </picker>
      </div>
      <div>
        <picker mode='selector' :range='sexes' value='0' @change='sexchange'>
          {{sex || '性别'}}
          <span class="iconfont icon-tubiao_xiala"></span>
        </picker>
      </div>
      <div>
        <picker mode='selector' :range='roles' value='0' @change='rolechange'>
          {{ role || '身份' }}
          <span class="iconfont icon-tubiao_xiala"></span>
        </picker>
      </div>
      <div>
        <button class="reset" hover-class='reset-hover' @click='clear'>重置条件</button>
      </div>
    </div>
    <div class="list">
      <teacher-card v-for="(x,i) in teacherlist" :key='i' :info='x' @teacherdetail='teacherdetail(x)'></teacher-card>
    </div>
  </div>
</template>

<script>
import qc from 'wafer2-client-sdk'
import conf from '@/config'
import teacherCard from '@/components/teacherCard'

export default {
  components: {
    teacherCard
  },

  data () {
    return {
      courses:[
        ['小学前','小学',"初一","初二","初三","高一","高二","高三","乐器","美术","运动","其他"], 
        ['幼教','陪读陪玩',"语文","数学","英语","物理","化学",
        "钢琴","电子琴","古筝","吉他","尤克里里","小提琴","架子鼓","手风琴","葫芦丝","古筝","二胡","口琴","横笛","竖笛",
        "卡通画","素描","水彩","油画","漫画","毛笔书法","硬笔书法",
        "足球","篮球","羽毛球","乒乓球","游泳","网球",
        "中国象棋","国际象棋","计算机","学习习惯","记忆力","注意力","机器人",
        "其他"]
      ],
      sexes:['男老师','女老师','都可以'],
      roles:['专职教师','兼职大学生','都可以'],
      sex:'',
      role:'',
      teacherlist: [],
      pageindex:1,
      coursetype:'',
      coursename:'',
      province:'',
      city:'',
      country:'',
    }
  },
  methods:{
    getteachers(){
      var self = this
      wx.showLoading({
        title:"Loading..."
      })
      // if(self.coursetype && self.coursename){
      var course = self.coursetype+'-'+self.coursename
      // }else{
      //   var course = ''
      // }
      var data = {
          pageindex: self.pageindex,
          course,
          province: self.province,
          city: self.city,
          sex: self.sex,
          country: self.country,
          role: self.role
      }
      if(self.role == '专职教师'){
        data.role = '专职'
      }
      // for (const key in data) {
      //   const element = data[key];
      //   if(!element){
      //     delete data[key]
      //   }  
      // }
      qc.request({
        data ,
        url: conf.service.getteacherlistUrl,
        success(res){
          self.teacherlist = res.data.data

          self.pageindex++
          wx.hideLoading()
          wx.showToast({
            title:res.data.msg,
            icon:'none',
            duration:1400
          })
          // setTimeout(function(){
          //   wx.switchTab({
          //     url:'/pages/index/main'
          //   })
          // },1600)
        },
        fail(){
          wx.hideLoading()
          wx.showToast({
            title:'网络连接失败',
            icon:'none',
            duration:1400
          })
        },
        complete(){
          wx.stopPullDownRefresh()
        }
      })
    },
    regionchange(e){
      console.log(e.mp.detail.value);
      let arr = e.mp.detail.value
      this.province = arr[0]
      this.city = arr[1]
      this.country = arr[2]
      this.pageindex = 1
      this.getteachers()
    },
    coursechange(e){
      console.log(e.mp.detail.value);
      let arr = e.mp.detail.value
      this.coursetype = this.courses[0][arr[0]]
      this.coursename = this.courses[1][arr[1]]
      this.pageindex = 1
      this.getteachers()
    },
    sexchange(e){
      console.log(e.mp.detail.value);
      let index = e.mp.detail.value
      this.sex = this.sexes[index]
      this.pageindex = 1
      this.getteachers()
    },
    rolechange(e){
      console.log(e.mp.detail.value);
      let index = e.mp.detail.value
      this.role = this.roles[index]
      this.pageindex = 1
      this.getteachers()
    },
    clear(){
      this.pageindex = 1 ;
      this.coursetype = '' ;
      this.coursename = '' ;
      this.province = '' ;
      this.city = '' ;
      this.sex = '' ;
      this.role = '' ;
      this.country = '' ;
      this.getteachers()
    },
    teacherdetail(x){
      let loginstate = this.globalData.loginstate;
      if(loginstate === true){
        let url = `/pages/teacherdetail/main?openid=${x.openid}`
        wx.navigateTo({
          url
        })
      }else{
        wx.showToast({
          title:'用户尚未登录，请先登录',
          duration: 1800,
          icon:'none',
          mask: true,
          complete(){
            setTimeout(function(){
              let url = `/pages/my/main`
              wx.switchTab({
                url
              })
            },1900)
          }
        })
      }
    }
  },
  created () {

  },
  onShow() {
    var coursename = this.globalData.coursename
    console.log(coursename);
    if(coursename == '艺术'){
      coursename = ''
      this.coursetype = '乐器'
    }else if(coursename == '更多'){
      this.coursetype = ''
      coursename = ''
    }else{
      this.coursetype = ''
    }
    this.coursename = coursename ;
    this.getteachers()
    
    
  },
  onLoad(){
    this.getteachers()
    wx.showShareMenu({
      withShareTicket: true
    })
  }
}
</script>

<style lang='scss' scoped>
$maincolor: #377BF0;
.page{
  
}
.top{
  padding: 8rpx 20rpx;
  background-color: rgb(236, 235, 235);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 30rpx;
  .reset{
    padding: 0rpx 12rpx;
    border: 1rpx solid $maincolor;
    color: $maincolor;
    background-color: #fff;
    height: 60rpx;
    line-height: 60rpx;
    font-size: 30rpx;
  }
  .reset-hover{
    color: rgb(21, 96, 224);
    border: 1rpx solid rgb(21, 96, 224);
    background-color: rgb(212, 212, 212);
  }
  .icon-tubiao_xiala{
    font-size: 26rpx;
  }
}
.list{
  // margin-top: 18rpx;
  .title{
    text-align: center;
    color: $maincolor;
    font-weight: 600;
    font-size: 32rpx;
    position: relative;
    .more{
      position: absolute;
      top: 0;
      right: 20rpx;
      color: rgb(173, 173, 173);
      font-size: 28rpx;
    }
  }
}
</style>
