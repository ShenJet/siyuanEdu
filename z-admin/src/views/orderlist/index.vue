<template>
  <div class="app-container">
    <h4>订单搜索：</h4>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动时间">
        <el-col :span="5">
          <el-date-picker type="date" placeholder="开始日期" v-model="form.date1" style="width: 200px;" value-format='timestamp'></el-date-picker>
        </el-col>
        <el-col class="line" :span="1"> - </el-col>
        <el-col :span="5">
          <el-date-picker type="date" placeholder="结束日期" v-model="form.date2" style="width: 200px;" value-format='timestamp'></el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-button @click="search" type='primary'>搜索</el-button>
        </el-col>
      </el-form-item>
    </el-form>
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
      <el-table-column label="买家openid" align="center" width="270">
        <template slot-scope="scope">
          <span>{{scope.row.openid}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商家订单号" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="微信交易号" width="250" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.transaction_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单总金额(元)" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.total_fee/10/10 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="交易时间" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row._createtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付状态" width="100" align="center">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.status == 4?'已支付':'未支付' }}</span> -->
          <el-tag type="success">{{ scope.row.status == 4?'已支付':'未支付' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="微信通知" width="100" align="center">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.wxpayconfirmed == 1?'已通知':'未通知' }}</span> -->
          <el-tag type="success">{{ scope.row.wxpayconfirmed == 1?'已通知':'未通知' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="交易时间" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row._createtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品类型" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsinfo.usertype == 'student'?'学生信息':'老师信息' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单商品" align="center">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.goodsinfo }}</span> -->
          <el-button type="primary" size="mini" @click="goodsinfomodal(scope.row.goodsinfo)">
            点击查看
          </el-button>
        </template>
      </el-table-column>
      
      
      <!-- <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button size="mini" type="primary" @click="detail(scope.row)">查看</el-button>
          </div>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination
      style="margin-top:20px;text-align:center"
      background
      layout="prev, pager, next"
      :total="totalcount"
      :page-size="10"
      @current-change="currentchange"
      @prev-click="prevclick"
      @next-click="nextclick"
    ></el-pagination>
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
      pageindex: 1,
      form: {
        date1:'',
        date2:''
      }
    };
  },
  computed: {
    startdate() {
      return new Date();
    },
    enddate() {}
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
        .get( `http://212.64.64.99:8888/admin/orderlist?pageindex=${self.pageindex}&start=${self.form.date1}&end=${self.form.date2}` )
        .then(function(res) {
          console.log(res);
          self.list = res.data.data;
          self.totalcount = res.data.count[0].count;
          self.listLoading = false;
          console.log(self.list);
        });
    },
    search(){
      console.log(this.form);
      this.fetchData()
    },
    currentchange(i) {
      console.log(i);
      this.pageindex = i;
      this.fetchData();
    },
    prevclick(i) {
      console.log(i);
    },
    nextclick(i) {
      console.log(i);
    },
    goodsinfomodal(x){
      console.log(x);
      if(x.usertype == 'student'){
        // 存sessionstorage
        sessionStorage.setItem("applystudentdetail", JSON.stringify(x));
        // 跳转
        this.$router.push(`/student/studentdetail/${x.openid}/${x.randomstr}`);
      }else if(x.usertype == 'teacher'){
        // 存sessionstorage
        sessionStorage.setItem("applyteacherdetail", JSON.stringify(x));
        // 跳转
        this.$router.push(`/example/teacherdetail/${x.openid}`);
      }
    }
  }
};
</script>
