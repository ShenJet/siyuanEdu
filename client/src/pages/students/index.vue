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
        <picker mode='selector' :range='teachtypes' value='0' @change='teachtypechange'>
          {{teachtype || '教授方式'}}
          <span class="iconfont icon-tubiao_xiala"></span>
        </picker>
      </div>
      <!-- <div>
        <picker mode='selector' :range='roles' value='0' @change='rolechange'>
          {{ role || '身份' }}
          <span class="iconfont icon-tubiao_xiala"></span>
        </picker>
      </div> -->
      <div>
        <button class="reset" hover-class='reset-hover' @click='clear'>重置条件</button>
      </div>
    </div>
    <div class="list">
      <student-card v-for="(x,i) in studentlist" :key='i' :info='x' @studentdetail='studentdetail(x)'></student-card>
    </div>
  </div>
</template>

<script>
import qc from 'wafer2-client-sdk'
import conf from '@/config'
import studentCard from '@/components/studentCard'

export default {
  components: {
    studentCard
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
      roles:['专职教师','大学生','都可以'],
      teachtype:'',
      teachtypes:['学生上老师家','老师上学生家','远程视频教学','都可以'],
      sex:'',
      role:'',
      studentlist: [],
      pageindex:1,
      coursetype:'',
      coursename:'',
      province:'',
      city:'',
      country:'',
    }
  },
  methods:{
    getstudents(){
      var self = this
      wx.showLoading({
        title:"Loading..."
      })
      qc.request({
        data:{
          pageindex: self.pageindex,
          coursetype: self.coursetype,
          coursename: self.coursename,
          province: self.province,
          city: self.city,
          country: self.country,
          teachtype: self.teachtype
        },
        url: conf.service.getstudentlistUrl,
        success(res){
          self.studentlist = res.data.data
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
      this.getstudents()
    },
    coursechange(e){
      console.log(e.mp.detail.value);
      let arr = e.mp.detail.value
      this.coursetype = this.courses[0][arr[0]]
      this.coursename = this.courses[1][arr[1]]
      this.pageindex = 1
      this.getstudents()
    },
    teachtypechange(e){
      console.log(e.mp.detail.value);
      let index = e.mp.detail.value
      this.teachtype = this.teachtypes[index]
      this.pageindex = 1
      this.getstudents()
    },
    rolechange(e){
      console.log(e.mp.detail.value);
      let index = e.mp.detail.value
      this.role = this.roles[index]
      this.pageindex = 1
      this.getstudents()
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
      this.getstudents()
    },
    studentdetail(x){
      let loginstate = this.globalData.loginstate;
      if(loginstate === true){
        let url = `/pages/studentdetail/main?openid=${x.openid}&randomstr=${x.randomstr}`
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
    let coursename = this.$root.$mp.query.coursename
    if(coursename){
      this.coursename = coursename ;
      this.getstudents()
    }
  },
  onLoad(){
    this.getstudents()
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
      font-size: 30rpx;
    }
  }
}
</style>
