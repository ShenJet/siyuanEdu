<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
      <el-table-column label="微信头像" align="center" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt width="70">
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="性别" width="110" align="center">
        <template slot-scope="scope">
          <span :style="scope.row.sex=='男'?'color:blue':'color:deeppink'">{{ scope.row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column label="地区" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.province }}-{{ scope.row.city }}-{{ scope.row.country }}</template>
      </el-table-column>
      <el-table-column align="center" label="年级">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"/> -->
          <span>{{scope.row.grade}}</span>
        </template>
      </el-table-column>
      <!-- coursename -->
      <el-table-column align="center" label="科目">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"/> -->
          <span>{{scope.row.coursename}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button size="mini" type="primary" @click="detail(scope.row)">查看</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import axios from "axios";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      totalcount: 0,
      pageindex: 1
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      var self = this;
      this.listLoading = true;
      // getList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
      // axios.get('https://www.suwlkj.com:8888/teacherapplylist')
      axios
        // .get("http://212.64.64.99:8888/admin/studentlist")
        .get(`http://212.64.64.99:8888/admin/studentapplylist`)
        .then(function(res) {
          console.log(res);
          self.list = res.data.data;
          self.listLoading = false;
        });
    },
    detail(x) {
      // this.dialogFormVisible = true
      if(!x.openid){
        return this.$message({
          type: "info",
          message: "老师信息有误，操作失败"
        });
      }
      // 存sessionstorage
      sessionStorage.setItem("applystudentdetail", JSON.stringify(x));
      // 跳转
      this.$router.push(`/student/studentdetail/${x.openid}/${x.randomstr}`);
    },
    passmodal(x) {
      this.$confirm("此操作将通过该老师的申请, 是否继续?", "提示", {
        confirmButtonText: "确定通过",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.pass(x)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    pass(x){
      axios.get(
        `http://212.64.64.99:8888/admin/teacherapplyaudit?openid=${x.openid}&type=pass`
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
    rejection(x){
      console.log(333);
      
      axios.get(
        `http://212.64.64.99:8888/admin/teacherapplyaudit?openid=${x.openid}&type=rejection`
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
    rejectionmodal(x) {
      this.$confirm("此操作将驳回并删除该老师申请, 是否继续?", "提示", {
        confirmButtonText: "确定驳回",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log('444');
          
          this.rejection(x)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    currentchange(i){
      console.log(i)
      this.pageindex = i
      this.fetchData()
    },
    prevclick(i){
      console.log(i);
      
    },
    nextclick(i){
      console.log(i);
      
    },
  }
};
</script>
