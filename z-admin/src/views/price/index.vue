<template>
  <div class="app-container">
    <h3>
      老师信息价格：
    </h3>
    <el-input type='number' v-model="teacherprice" placeholder="老师价格" style="width:200px;"></el-input>（元/条）
    <el-button type='primary' @click="modifyteacherpricemodal">确定修改</el-button>
    <h3>
      学生信息价格：
    </h3>
    <el-input type='number' v-model="studentprice" placeholder="学生价格" style="width:200px;"></el-input>（元/条）
    <el-button type='primary' @click="modifystudentpricemodal">确定修改</el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      teacherprice:50,
      studentprice:50
    }
  },
  created(){
    this.getprice() // 212.64.64.99
  },
  methods: {
    getprice(){
      var self = this
      axios.get('http://212.64.64.99:8888/admin/price')
      .then(function(res){
        console.log(res);
        if(res.data.success){
          self.studentprice = res.data.data.student
          self.teacherprice = res.data.data.teacher
        }
      })
      .catch(function(err){
        console.log(err);
        
      })
    },
    modifyteacherpricemodal(){
      this.$confirm("确定修改老师信息价格?", "提示", {
        confirmButtonText: "确定修改",
        cancelButtonText: "取消修改",
        type: "warning"
      })
        .then(() => {
          // console.log('444');
          
          this.modifyteacherprice()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    modifystudentpricemodal(){
      this.$confirm("确定修改学生信息价格?", "提示", {
        confirmButtonText: "确定修改",
        cancelButtonText: "取消修改",
        type: "warning"
      })
        .then(() => {
          // console.log('444');
          
          this.modifystudentprice()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    modifyteacherprice(){
      axios.get(
        `http://212.64.64.99:8888/admin/pricemodify?role=teacher&price=${this.teacherprice}`
      )
      .then(res => {
        console.log(res);
        if(res.data.success){
          this.$message({
            type: "success",
            message: "修改成功!"
          });
        }else{
          this.$message({
            type: "warning",
            message: "操作失败!"
          });
        }
        
      })
      .catch( err =>{
        console.log(err);
        this.$message({
          type: "warning",
          message: "操作失败!请检查网络"
        });
      })
    },
    modifystudentprice(){
      axios.get(
        `http://212.64.64.99:8888/admin/pricemodify?role=student&price=${this.studentprice}`
      )
      .then(res => {
        console.log(res);
        if(res.data.success){
          this.$message({
            type: "success",
            message: "修改成功!"
          });
        }else{
          this.$message({
            type: "warning",
            message: "操作失败!"
          });
        }
        
      })
      .catch( err =>{
        console.log(err);
        this.$message({
          type: "warning",
          message: "操作失败!请检查网络"
        });
      })
    },
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

