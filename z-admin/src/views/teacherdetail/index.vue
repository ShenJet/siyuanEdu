<template>
  <div class="app-container">
    <h3>老师详情：</h3>
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
      <el-form-item label="目前身份" :label-width="formLabelWidth">
        <el-input v-model="info.role" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="最高学历" :label-width="formLabelWidth">
        <el-input v-model="info.xueli" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="毕业院校" :label-width="formLabelWidth">
        <el-input v-model="info.school" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所学专业" :label-width="formLabelWidth">
        <el-input v-model="info.major" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="毕业年份" :label-width="formLabelWidth">
        <el-input v-model="info.graduateyear" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="教授科目" :label-width="formLabelWidth">
        <!-- <el-input v-model="info.course" auto-complete="off"></el-input> -->
        <el-tag class='eltag' style='margin-right:12px;' v-for="(x, k) in info.course" :key='k'>{{x}}</el-tag>
      </el-form-item>
      <el-form-item label="教授费用(元/时)" :label-width="formLabelWidth">
        <el-input v-model="info.price" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="教授方式" :label-width="formLabelWidth">
        <el-tag class='eltag' style='margin-right:12px;' v-for="(x, k) in info.teachtype" :key='k'>{{x}}</el-tag>
        <!-- <div>{{info.teachtype}}</div> -->
      </el-form-item>
      <el-form-item label="教学经验(年)" :label-width="formLabelWidth">
        <el-input v-model="info.teachyear" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="常住地点" :label-width="formLabelWidth">
        <el-input v-model="info.citylabel" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="常住小区" :label-width="formLabelWidth">
        <el-input v-model="info.community" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="教授区域" :label-width="formLabelWidth">
        <el-tag class='eltag' style='margin-right:12px;' v-for="(x, k) in info.teacharea" :key='k'>{{x}}</el-tag>

        <!-- <span>{{ info.teacharea.join('-') }}</span> -->
      </el-form-item>
      <el-form-item label="可教授日" :label-width="formLabelWidth">
        <el-tag class='eltag' style='margin-right:12px;' v-for="(x, k) in info.teachday" :key='k'>{{x}}</el-tag>
        <!-- <div>{{info.teachday}}</div> -->
      </el-form-item>
      <el-form-item label="教学时间段" :label-width="formLabelWidth">
           <el-tag class='eltag' style='margin-right:12px;'>{{info.teachstarttime}}</el-tag>
        至 <el-tag class='eltag' style='margin-right:12px;'>{{info.teachendtime}}</el-tag>
      </el-form-item>
      <el-form-item label="课时费" :label-width="formLabelWidth">
        <el-input v-model="info.price" auto-complete="off" style='width:200px'></el-input> (元/小时)
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
      <el-form-item label="生活照" :label-width="formLabelWidth">
        <div>
          <img id="idcard3" :src="info.idcard3" alt="" width='500'>
        </div>
        <el-button type="primary" size='small' @click="rotate('idcard3', 3)">旋转90度</el-button>
      </el-form-item>
      <el-form-item label="学员评价" :label-width="formLabelWidth">
        <el-tag class='eltag' style='margin-right:12px;' v-for="(x, k) in info.comment" :key='k'>{{x}}</el-tag>
        <!-- <div>{{info.comment}}</div> -->
      </el-form-item>
      <el-form-item label="个人介绍" :label-width="formLabelWidth">
        <textarea name="" id="" cols="100" rows="10" v-model='info.applydesc'></textarea>
      </el-form-item>
    </el-form>
    <hr>
    <div class="footer" v-show="info.auditstate == 0">
      <el-button type="primary" @click="passmodal">通过申请</el-button>
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
      this.info = JSON.parse( sessionStorage.getItem("applyteacherdetail") ) ;
      console.log(this.info);
    },
    detail(x) {
      // this.dialogFormVisible = true
      this.$router.push(`/example/detail?id=${x.openid}`);
    },
    passmodal(x) {
      this.$confirm("此操作将通过该老师的申请, 是否继续?", "提示", {
        confirmButtonText: "确定通过",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.pass()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消通过"
          });
        });
    },
    pass(){
      axios.get(
        `http://212.64.64.99:8888/admin/teacherapplyaudit?openid=${this.info.openid}&type=pass`
      )
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
      this.$confirm("此操作将驳回并删除该老师的申请信息, 且不可逆,是否继续?", "提示", {
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
            message: "已取消驳回"
          });
        });
    },
    rejection(){
      axios.get(
        `http://212.64.64.99:8888/admin/teacherapplyaudit?openid=${this.info.openid}&type=rejection`
      )
      .then(res => {
        console.log(res);
        if(res.data.success){
          this.$message({
            type: "success",
            message: "驳回成功!"
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

