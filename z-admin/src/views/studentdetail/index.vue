<template>
  <div class="app-container">
    <h3>学员信息详情：</h3>
    <div v-show='info.auditstate == 1'>
      <span style="display:inline-block;width:150px;padding-left:50px;">是否被预约：</span>
      <el-tag class='eltag' style='margin-right:12px;'>{{ info.beenordered?'已被预约':'尚未被预约' }}</el-tag>
    </div>
    <div v-show='info.auditstate == 1' style="margin-top:20px">
      <span style="display:inline-block;width:150px;padding-left:50px;">接单状态：</span>
      <el-tag class='eltag' style='margin-right:12px;'>{{ info.recieveorder?'可被接单':'不可被接单' }}</el-tag>
    </div>
    <hr>
    <el-form :model="info">
      <el-form-item label="微信头像" :label-width="formLabelWidth">
        <img :src="info.avatar" alt="" width='70'>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="info.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth">
        <el-input v-model="info.phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-input v-model="info.sex" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="科目" :label-width="formLabelWidth">
        <el-input v-model="info.course" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="学习方式" :label-width="formLabelWidth">
        <el-tag class='eltag' style='margin-right:12px;' v-for="(x, k) in info.teachtype" :key='k'>{{x}}</el-tag>
        <!-- <div>{{info.teachtype}}</div> -->
      </el-form-item>
      <el-form-item label="教龄要求(年)" :label-width="formLabelWidth">
        <el-input v-model="info.teachyear" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别要求" :label-width="formLabelWidth">
        <el-input v-model="info.teachersex" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="常住地点" :label-width="formLabelWidth">
        <el-input v-model="info.citylabel" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="教学时间段" :label-width="formLabelWidth">
           <el-tag class='eltag' style='margin-right:12px;'>{{info.teachstarttime}}</el-tag>
        至 <el-tag class='eltag' style='margin-right:12px;'>{{info.teachendtime}}</el-tag>
      </el-form-item>
      <el-form-item label="身份证号码" :label-width="formLabelWidth">
        <el-input v-model="info.idno" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="身份证正面" :label-width="formLabelWidth">
        <div>
          <img id="idcard1" :src="info.idcard1" alt="" width='500'>
        </div>
        <el-button type="primary" size='small' @click="rotate('idcard1', 1)">旋转90度</el-button>
      </el-form-item>
      <el-form-item label="身份证反面" :label-width="formLabelWidth">
        <div>
          <img id="idcard2" :src="info.idcard2" alt="" width='500'>
        </div>
        <el-button type="primary" size='small' @click="rotate('idcard2', 2)">旋转90度</el-button>
      </el-form-item>
      <el-form-item label="个人介绍" :label-width="formLabelWidth">
        <textarea name="" id="" cols="100" rows="10" v-model='info.applydesc'></textarea>
      </el-form-item>
      <el-form-item label="学习概况" :label-width="formLabelWidth">
        <!-- <el-tag class='eltag' style='margin-right:12px;' v-for="(x, k) in info.comment" :key='k'>{{x}}</el-tag> -->
        <textarea name="" id="" cols="100" rows="10" v-model='info.gaikuang'></textarea>
      </el-form-item>
    </el-form>
    <hr>
    <div class="footer" v-show='info.auditstate == 2'>
      <el-button type="success"  @click="recoverystudentmodal">恢复学员</el-button>
    </div>
    <div class="footer" v-show='info.auditstate == 1'>
      <el-button type="danger"  @click="deletestudentmodal">重新驳回</el-button>
    </div>
    <div class="footer" v-show='info.auditstate == 0'>
      <el-button type="primary" @click="passmodal">审核通过</el-button>
      <el-button type="danger"  @click="rejectionmodal">驳回申请</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      info: null,
      formLabelWidth: '120px',
      deg1: 0,
      deg2: 0,
      deg3: 0,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      var self = this;
      this.listLoading = true;
      let openid = this.$route.params.openid
      console.log(openid);
      // 从session取出信息
      this.info = JSON.parse( sessionStorage.getItem("applystudentdetail") ) ;
      console.log(this.info);
    },
    detail(x) {
      // this.dialogFormVisible = true
      this.$router.push(`/example/detail?id=${x.openid}`);
    },
    passmodal(x) {
      this.$confirm("是否确定通过申请?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.pass()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    pass(){
      // 212.64.64.99
      axios.get( `http://212.64.64.99:8888/admin/studentapplyaudit?openid=${this.info.openid}&randomstr=${this.info.randomstr}&type=pass` )
      .then(res => {
        console.log(res);
        if(res.data.success){
          this.$message({
            type: "success",
            message: "通过成功!"
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
    rejectionmodal(x) {
      this.$confirm("此操作将删除该学员的信息，是否继续?", "提示", {
        confirmButtonText: "确定驳回",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.rejection()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    rejection(){
      axios.get( `http://212.64.64.99:8888/admin/studentapplyaudit?openid=${this.info.openid}&randomstr=${this.info.randomstr}&type=rejection` )
      .then(res => {
        console.log(res);
        if(res.data.success){
          this.$message({
            type: "success",
            message: "删除成功!"
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
    recoverystudentmodal(x) {
      this.$confirm("此操作将恢复该学员的信息，是否继续?", "提示", {
        confirmButtonText: "确定恢复",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.recoverystudent()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    recoverystudent(){
      axios.get( `http://212.64.64.99:8888/admin/studentrecovery?openid=${this.info.openid}&randomstr=${this.info.randomstr}` )
      .then(res => {
        console.log(res);
        if(res.data.success){
          this.$message({
            type: "success",
            message: "恢复成功!"
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
    //deletestudentmodal
    deletestudentmodal(x) {
      this.$confirm("此操作将删除该学员的信息，并且置为被驳回状态，是否继续?", "提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deletestudent()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    deletestudent(){
      axios.get( `http://212.64.64.99:8888/admin/studentdelete?openid=${this.info.openid}&randomstr=${this.info.randomstr}` )
      .then(res => {
        console.log(res);
        if(res.data.success){
          this.$message({
            type: "success",
            message: "删除成功!"
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
    rotate(el, index){
      var dom = document.getElementById(el)
      // var deg = getComputedStyle(dom, []).transform
      // console.log(deg);
      this['deg' + index] += 90
      dom.style.transform = `rotate( ${this['deg' + index] }deg)`
    }
  }
};
</script>
<style lang="scss" scoped>
.footer{
  padding-left: 260px;
  padding-bottom: 100px;
  padding-top: 50px;
}
</style>

