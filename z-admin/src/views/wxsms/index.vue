<template>
  <div class="app-container">
    <h3>
      短信通知成员：
    </h3>
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
      <el-table-column label="姓名" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column label="角色名" align="center">
        <template slot-scope="scope" >{{ scope.row.rolename }}</template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.beizhu}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button size="mini" type="primary" @click="deletemodal(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <hr />
    <h3>
      添加通知成员：
    </h3>
    <span class="left" style="display:inline-block;width:80px"> 姓名:  </span><el-input type='text'   v-model="name" placeholder="姓名" style="width:300px;"></el-input> <br><br>
    <span class="left" style="display:inline-block;width:80px"> 手机号:</span><el-input type='number' v-model="phone" placeholder="手机号" style="width:300px;"></el-input> <br><br>
    <span class="left" style="display:inline-block;width:80px"> 角色名:</span><el-input type='text'   v-model="rolename" placeholder="角色名，如：负责人、运营人员" style="width:300px;"></el-input> <br><br>
    <span class="left" style="display:inline-block;width:80px"> 备注:  </span><el-input type='text'   v-model="beizhu" placeholder="备注..." style="width:300px;"></el-input> <br><br>
    <el-button type='primary' @click="addmodal">确定添加</el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      list:[],
      name:"",
      phone:"",
      rolename:"",
      beizhu:"",
      listLoading: true,
    }
  },
  created(){
    this.getlist() // 212.64.64.99
  },
  methods: {
    getlist(){
      this.listLoading = true
      var self = this
      axios.get('http://212.64.64.99:8888/admin/wxsmsuser')
      .then(function(res){
        console.log(res);
        self.listLoading = false
        if(res.data.success){
          self.list = res.data.data
        }
      })
      .catch(function(err){
        console.log(err);
        self.listLoading = false
      })
    },
    addmodal(){
      this.$confirm("确定添加?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log('444');
          this.add()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    add(){
      this.listLoading = true
      var self = this
      axios.post(
        `http://212.64.64.99:8888/admin/wxsmsuseradd`,
        {
          name:self.name,
          phone:self.phone,
          rolename:self.rolename,
          beizhu:self.beizhu
        }
      )
      .then(res => {
        self.listLoading = false
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
        this.getlist()
      })
      .catch( err =>{
        self.listLoading = false
        console.log(err);
        this.$message({
          type: "warning",
          message: "操作失败!请检查网络"
        });
      })
    },
    
    deletemodal(x){
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log('444');
          
          this.delete(x)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    delete(x){
      this.listLoading = true
      axios.post(
        `http://212.64.64.99:8888/admin/wxsmsuserdelete`,
        {
          name:x.name,
          phone:x.phone
        }
      )
      .then(res => {
        self.listLoading = false
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
        this.getlist()
      })
      .catch( err =>{
        self.listLoading = false
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

