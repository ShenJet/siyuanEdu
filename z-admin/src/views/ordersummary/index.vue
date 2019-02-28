<template>
  <div class="app-container">
    <h4>
      今日订单数：
    </h4>
    <!-- <el-input type='text' v-model="summary.daycount" disabled style="width:200px;"></el-input> 单 -->
    <h3 style='color:#00f;padding-left:50px;'>{{summary.daycount}} 单</h3>
    <h4>
      今日订单额：
    </h4>
    <!-- <el-input type='text' v-model="summary.daymoney" disabled style="width:200px;"></el-input> 元 -->
    <h3 style='color:#00f;padding-left:50px;'>{{summary.daymoney/10/10}} 元</h3>

    <h4>
      本周订单数：
    </h4>
    <!-- <el-input type='text' v-model="summary.weekcount" disabled style="width:200px;"></el-input> 单 -->
    <h3 style='color:#00f;padding-left:50px;'>{{summary.weekcount}} 单</h3>
    <h4>
      本周订单额：
    </h4>
    <!-- <el-input type='text' v-model="summary.weekmoney" disabled style="width:200px;"></el-input> 元 -->
    <h3 style='color:#00f;padding-left:50px;'>{{summary.weekmoney/10/10}} 元</h3>

    <h4>
      本月订单数：
    </h4>
    <!-- <el-input type='text' v-model="summary.monthcount" disabled style="width:200px;"></el-input> 单 -->
    <h3 style='color:#00f;padding-left:50px;'>{{summary.monthcount}} 单</h3>
    <h4>
      本月订单额：
    </h4>
    <!-- <el-input type='text' v-model="summary.monthmoney" disabled style="width:200px;"></el-input> 元 -->
    <h3 style='color:#00f;padding-left:50px;'>{{summary.monthmoney/10/10}} 元</h3>
    <hr>
    <h3>
      可以前往小程序数据中心查看更全面数据：
    </h3>
    <div>
      <a style="color:blue;text-decoration:underline;" target="_blank" href="https://mp.weixin.qq.com/wxopen/appdatacount?action=get_count_page&lang=zh_CN&type=1&token=1120444682&lang=zh_CN">>>点击前往小程序数据中心</a>
    </div>
    <img src="/static/img/analysis.png" width="800" alt="">

    <h3>
      也可以使用微信扫描二维码查看：
    </h3>
    <img src="/static/img/92code.jpg" width="250" alt="">
  </div>
  
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      summary:{
        daycount: "等待获取...",
        daymoney: "等待获取...",
        weekcount: "等待获取...",
        weekmoney: "等待获取...",
        monthcount: "等待获取...",
        monthmoney: "等待获取...",
      }
    }
  },
  created(){
    this.getordersummary()
  },
  methods: {
    getordersummary(){
      var self = this
      axios.get('http://212.64.64.99:8888/admin/ordersummary') //212.64.64.99
      .then(function(res){
        console.log(res);
        if(res.data.success){
          self.summary = res.data.data
        }
      })
      .catch(function(err){
        console.log(err);
        
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

