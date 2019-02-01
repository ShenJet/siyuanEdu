<template>
  <div class="page">
    <div class="top">
      <div>
        <picker mode='region' @change='regionchange'>
          地区
          <span class="iconfont icon-tubiao_xiala"></span>
        </picker>
      </div>
      <div>
        <picker mode='multiSelector' :range='coursese' value='[0,0]' @change='coursechange'>
          科目
          <span class="iconfont icon-tubiao_xiala"></span>
        </picker>
      </div>
      <div>
        <picker mode='selector' :range='sexes' value='0' @change='sexchange'>
          性别
          <span class="iconfont icon-tubiao_xiala"></span>
        </picker>
      </div>
      <div>
        <picker mode='selector' :range='roles' value='0' @change='rolechange'>
          身份
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
      coursese:[["小学","初中","高中","艺术","兴趣"], ["语文","数学","英语","物理","化学","钢琴","古筝","画画","舞蹈","棋类","其他"]],
      sexes:['男老师','女老师','都可以'],
      roles:['专职教师','大学生','都可以'],
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
      qc.request({
        data:{
          pageindex: self.pageindex,
          coursetype: self.coursetype,
          coursename: self.coursename,
          province: self.province,
          city: self.city,
          sex: self.sex,
          country: self.country,
        },
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
    },
    coursechange(e){
      console.log(e.mp.detail.value);
      let arr = e.mp.detail.value
      this.coursetype = this.courses[arr[0]]
      this.coursename = this.courses[arr[1]]
    },
    sexchange(e){
      console.log(e.mp.detail.value);
      let index = e.mp.detail.value
      this.sex = this.sexes[index]
    },
    rolechange(e){
      console.log(e.mp.detail.value);
      let index = e.mp.detail.value
      this.role = this.roles[index]
    },
    clear(){
      this.pageindex = 1 ;
      this.coursetype = '' ;
      this.coursename = '' ;
      this.province = '' ;
      this.city = '' ;
      this.sex = '' ;
      this.country = '' ;
      this.getteachers()
    },
    teacherdetail(x){
      let url = `/pages/teacherdetail/main?openid=${x.openid}`
      wx.navigateTo({
        url
      })
    }
  },
  created () {

  },
  onShow() {
    let coursename = this.$root.$mp.query.coursename
    if(coursename){
      this.coursename = coursename ;
    }
    this.getteachers()
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
}
.list{
  margin-top: 30rpx;
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
