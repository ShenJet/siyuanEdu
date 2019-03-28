<template>
  <div class="app-container">
    <h3>老师录入：</h3>
    <hr>
    <el-form :model="info">
      <!-- <el-form-item label="微信头像" :label-width="formLabelWidth">
        <img :src="info.avatar" alt="" width='70'>
      </el-form-item> -->
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
        <el-radio-group v-model="xueli" size="medium" @change='rolechange'>
          <el-radio-button v-for="(x,i) in rolearr" :key='i' :label="x"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="最高学历" :label-width="formLabelWidth">
        <el-radio-group v-model="xueli" size="medium" @change='xuelichange'>
          <el-radio-button label="大专"></el-radio-button>
          <el-radio-button label="本科"></el-radio-button>
          <el-radio-button label="硕士"></el-radio-button>
          <el-radio-button label="博士"></el-radio-button>
        </el-radio-group>
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
        <el-checkbox-group v-model="course" size="small">
          <div v-for="(x,i) in coursese" :key="i">
            <div><span style="font-size:20px;background:#000;color:#fff;">{{x.key}}</span></div>
            <div style="padding-left:20px;">
              <el-checkbox-button v-for="(y,k) in x.value" :label="x.key+'-'+y"  :key="i+'-'+k" :aaa="i+'-'+k">
                {{y}}
              </el-checkbox-button>
            </div>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="教授费用(元/时)" :label-width="formLabelWidth">
        <el-input v-model="info.price" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="教授方式" :label-width="formLabelWidth">
        <el-checkbox-group v-model="teachtype" size="small">
          <el-checkbox-button label="学生上老师家">学生上老师家</el-checkbox-button>
          <el-checkbox-button label="老师上学生家">老师上学生家</el-checkbox-button>
          <el-checkbox-button label="远程视频教学">远程视频教学</el-checkbox-button>
        </el-checkbox-group>
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
      </el-form-item>
      <el-form-item label="可教授日" :label-width="formLabelWidth">
        <el-checkbox-group v-model="teachday" size="small">
          <el-checkbox-button label="星期一">星期一</el-checkbox-button>
          <el-checkbox-button label="星期二">星期二</el-checkbox-button>
          <el-checkbox-button label="星期三">星期三</el-checkbox-button>
          <el-checkbox-button label="星期四">星期四</el-checkbox-button>
          <el-checkbox-button label="星期五">星期五</el-checkbox-button>
          <el-checkbox-button label="星期六">星期六</el-checkbox-button>
          <el-checkbox-button label="星期日">星期日</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="教学时间段" :label-width="formLabelWidth">
        <el-input style="width:200px;" v-model="info.teachstarttime" auto-complete="off"></el-input>
        至 <el-input style="width:200px;" v-model="info.teachendtime" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="课时费" :label-width="formLabelWidth">
        <el-input v-model="info.price" auto-complete="off" style='width:200px'></el-input> (元/小时)
      </el-form-item>
      <el-form-item label="身份证号码" :label-width="formLabelWidth">
        <el-input v-model="info.idno" style="width:300px;" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="身份证正面" :label-width="formLabelWidth">
        <div>
          <el-upload
            class="upload-demo"
            :action="uploadurl"
            :on-preview="handlePreview(1)"
            :on-remove="handleRemove(1)"
            :on-success="handlesuccess1"
            :on-exceed="handleexceed"
            :on-error="handleerr"
            :file-list="fileList1"
            :limit="imglimit"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="身份证反面" :label-width="formLabelWidth">
        <div>
          <el-upload
            class="upload-demo"
            :action="uploadurl"
            :on-preview="handlePreview(2)"
            :on-remove="handleRemove(2)"
            :on-success="handlesuccess2"
            :on-exceed="handleexceed"
            :on-error="handleerr"
            :file-list="fileList2"
            :limit="imglimit"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="生活照" :label-width="formLabelWidth">
        <div>
          <el-upload
            class="upload-demo"
            :action="uploadurl"
            :on-preview="handlePreview(3)"
            :on-remove="handleRemove(3)"
            :on-success="handlesuccess3"
            :on-exceed="handleexceed"
            :on-error="handleerr"
            :file-list="fileList3"
            :limit="imglimit"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
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
      <el-button type="primary" @click="passmodal">确定录入</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      info: {},
      formLabelWidth: '120px',
      deg1: 0,
      deg2: 0,
      deg3: 0,
      uploadurl:'http://212.64.64.99:8888/admin/upload',
      fileList1:[],
      fileList2:[],
      fileList3:[],
      idcard1:'',
      idcard2:'',
      idcard3:'',
      imglimit: 1,
      
      xueliarr: ["大专", "本科", "硕士", "博士"],
      xueli: "",
      graduateyear: "",
      rolearr: [
        "专职幼教老师",
        "专职小学老师",
        "专职初中老师",
        "专职高中老师",
        "专职艺术老师",
        "兼职大学生",
        "其他"
      ],
      role: "",
      school: "",
      major: "",
      teachtype:[],
      teachday:[],
      course: [],
      coursese:[{
        key:'小学前',
        value:["幼教","陪读陪玩"]
      },{
        key:'小学',
        value:["语文","数学","英语"]
      },{
        key:'初一',
        value:["语文","数学","英语","物理","化学"]
      },{
        key:'初二',
        value:["语文","数学","英语","物理","化学"]
      },{
        key:'初三',
        value:["语文","数学","英语","物理","化学"]
      },{
        key:'高一',
        value:["语文","数学","英语","物理","化学"]
      },{
        key:'高二',
        value:["语文","数学","英语","物理","化学"]
      },{
        key:'高三',
        value:["语文","数学","英语","物理","化学"]
      },{
        key:'乐器',
        value:["钢琴","电子琴","古筝","吉他","尤克里里","小提琴","架子鼓","手风琴","葫芦丝","古筝","二胡","口琴","横笛","竖笛"]
      },{
        key:'美术',
        value:["毛笔书法","硬笔书法","卡通画","素描","水彩","油画","漫画"]
      },{
        key:'运动',
        value:["足球","篮球","羽毛球","乒乓球","游泳","网球"]
      },{
        key:'外语',
        value:["英语","雅思",'托福','四六级','日语','韩语','德语','西班牙语','俄语']
      },{
        key:'其他',
        value:["中国象棋","国际象棋","计算机","学习习惯","记忆力","注意力","机器人","其他"]
      },],
      teacharea: "",
      teachstarttime: "开始时间",
      teachendtime: "结束时间",
    };
  },
  created() {
    
  },
  methods: {
    rolechange(x){
      console.log(x);
      this.role = x
    },
    xuelichange(x){
      console.log(x);
      this.xueli = x
    },
    handleerr(x){
      this.$message({
        type:'error',
        message:"上传失败！"
      })
    },
    handleexceed(x){
      this.$message({
        type:'error',
        message:'只允许上传一个!'
      })
    },
    handlesuccess1(x,fileList){
      console.log(x,fileList);
      this.idcard1 = x.data.imgUrl
      this.$message({
        type:'success',
        message:"上传成功！"
      })
    },
    handlesuccess2(x,fileList){
      console.log(x,fileList);
      this.idcard1 = x.data.imgUrl
      this.$message({
        type:'success',
        message:"上传成功！"
      })
    },
    handlesuccess3(x,fileList){
      console.log(x,fileList);
      this.idcard1 = x.data.imgUrl
      this.$message({
        type:'success',
        message:"上传成功！"
      })
    },
    handlePreview(file, fileList, x){
      console.log(file, fileList, x);          
    },
    handleRemove(file, x){
      console.log(file, x);
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

