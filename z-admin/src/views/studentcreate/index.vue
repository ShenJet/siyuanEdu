<template>
  <div class="app-container">
    <h3>学生录入：</h3>
    <hr>
    <el-form :model="info" ref="info" :rules='rules'>
      <el-form-item label="头像" :label-width="formLabelWidth" prop="name">
        <div>
          <el-upload
            class="upload-demo"
            :action="uploadurl"
            :on-preview="handlePreview3"
            :on-remove="handleRemove3"
            :on-success="handlesuccess3"
            :on-exceed="handleexceed"
            :on-error="handleerr"
            :file-list="fileList3"
            :limit="imglimit"
            accept='image/*'
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="虚构openId" :label-width="formLabelWidth" prop="openid">
        <el-input v-model="info.openid" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
        <el-input v-model="info.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="info.phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
        <el-radio-group v-model="info.sex" size="medium" @change='sexchange'>
          <el-radio-button label="男"></el-radio-button>
          <el-radio-button label="女"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="目前年级" :label-width="formLabelWidth" prop="grade">
        <el-radio-group v-model="info.grade" size="small" @change='gradechange'>
          <el-radio-button  v-for="(x,k) in coursese" :key="k" :label="x.key" >{{x.key}}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="补课科目" :label-width="formLabelWidth" prop="course">
        <el-radio-group v-model="info.course" size="small" @change='coursechange'>
          <div v-for="(x,i) in coursese" :key="i">
            <div style="margin:5px 0"><span style="font-size:20px;background:#000;color:#fff;">{{x.key}}</span></div>
            <div style="padding-left:20px;">
              <el-radio-button v-for="(y,k) in x.value" :label="x.key+'-'+y"  :key="i+'-'+k" :aaa="i+'-'+k">
                {{y}}
              </el-radio-button>
            </div>
          </div>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="补课方式" :label-width="formLabelWidth" prop="teachtype">
        <el-checkbox-group v-model="info.teachtype" size="small" @change='teachtypechange'>
          <el-checkbox-button label="学生上老师家">学生上老师家</el-checkbox-button>
          <el-checkbox-button label="老师上学生家">老师上学生家</el-checkbox-button>
          <el-checkbox-button label="远程视频教学">远程视频教学</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="老师性别要求" :label-width="formLabelWidth" prop="teachersex">
        <el-radio-group v-model="info.teachersex" size="small" @change='teachersexchange'>
          <el-radio-button label="男">只找男老师</el-radio-button>
          <el-radio-button label="女">只找女老师</el-radio-button>
          <el-radio-button label="男或女">男女都可以</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="教龄要求(年)" :label-width="formLabelWidth" prop="teachyear">
        <el-input v-model="info.teachyear" auto-complete="off" style="width:80px"></el-input> 年
      </el-form-item>
      <el-form-item label="常住地点" :label-width="formLabelWidth" prop="citylabel">
        <el-input v-model="info.citylabel" auto-complete="off"></el-input>
        <a style="color:#409EFF" href="http://api.map.baidu.com/lbsapi/getpoint/index.html" target="_blank">>点击前往百度地图坐标拾取系统<</a>
      </el-form-item>
      <el-form-item label="常住地点经度" :label-width="formLabelWidth" prop="longitude">
        <el-input v-model="info.longitude" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="常住地点纬度" :label-width="formLabelWidth" prop="latitude">
        <el-input v-model="info.latitude" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="常住地点区域" :label-width="formLabelWidth" prop="province">
        <el-input v-model="info.province" auto-complete="off" style="width:100px" prop="province" placeholder="江苏省"></el-input> , 
        <el-input v-model="info.city" auto-complete="off" style="width:100px" prop="city" placeholder="苏州市"></el-input>  , 
        <el-input v-model="info.country" auto-complete="off" style="width:100px" prop="country" placeholder="工业园区"></el-input> 
      </el-form-item>
      <el-form-item label="可补课日" :label-width="formLabelWidth" prop="teachday">
        <el-checkbox-group v-model="info.teachday" size="small" @change='teachdaychange'>
          <el-checkbox-button label="星期一">星期一</el-checkbox-button>
          <el-checkbox-button label="星期二">星期二</el-checkbox-button>
          <el-checkbox-button label="星期三">星期三</el-checkbox-button>
          <el-checkbox-button label="星期四">星期四</el-checkbox-button>
          <el-checkbox-button label="星期五">星期五</el-checkbox-button>
          <el-checkbox-button label="星期六">星期六</el-checkbox-button>
          <el-checkbox-button label="星期日">星期日</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="补课时间段" :label-width="formLabelWidth" prop="teachstarttime">
        <!-- <el-input style="width:200px;" v-model="info.teachstarttime" auto-complete="off" prop="teachstarttime"></el-input>
        至 
        <el-input style="width:200px;" v-model="info.teachendtime" auto-complete="off" prop="teachendtime"></el-input> -->
        <el-time-select
          placeholder="起始时间"
          v-model="info.teachstarttime"
          :picker-options="{
            start: '01:00',
            step: '01:00',
            end: '24:00'
          }">
        </el-time-select>
        至
        <el-time-select
          placeholder="结束时间"
          v-model="info.teachendtime"
          :picker-options="{
            start: '01:00',
            step: '01:00',
            end: '24:00',
            minTime: info.teachstarttime
          }">
        </el-time-select>

      </el-form-item>
      
      <el-form-item label="身份证号码" :label-width="formLabelWidth" prop="idno">
        <el-input v-model="info.idno" style="width:300px;" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="身份证正面" :label-width="formLabelWidth">
        <div>
          <el-upload
            class="upload-demo"
            :action="uploadurl"
            :on-preview="handlePreview1"
            :on-remove="handleRemove1"
            :on-success="handlesuccess1"
            :on-exceed="handleexceed"
            :on-error="handleerr"
            :file-list="fileList1"
            :limit="imglimit"
            accept='image/*'
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
            :on-preview="handlePreview2"
            :on-remove="handleRemove2"
            :on-success="handlesuccess2"
            :on-exceed="handleexceed"
            :on-error="handleerr"
            :file-list="fileList2"
            :limit="imglimit"
            accept='image/*'
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="目前学习概况" :label-width="formLabelWidth" prop="gaikuang">
        <textarea name="" id="" cols="100" rows="10" v-model='info.gaikuang'></textarea>
      </el-form-item>
      <el-form-item label="个人介绍" :label-width="formLabelWidth" prop="applydesc">
        <textarea name="" id="" cols="100" rows="10" v-model='info.applydesc'></textarea>
      </el-form-item>
      <div class="footer">
        <el-form-item prop="name">
        <el-button type="primary" @click="addconfirmmodal('info')">确定录入</el-button>
        </el-form-item>
      </div>
    </el-form>
    <hr>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      info: {
        openid:'以xuni开头',
        name:"",
        phone:"",
        sex:"",
        grade:'',
        course: [],
        teachtype:[],
        teachyear:'',
        citylabel:'', // 地址
        longitude:'',
        latitude:'',
        teachersex:'',
        teachday:[],
        teachstarttime:'01:00',
        teachendtime:'02:00', 
        province:'',
        city:'',
        country:'',
        idno:'',
        avatar:'',
        applydesc:'',
        gaikuang: ''
      },
      rules:{
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        xueli: [
          { required: true, message: '请选择学历', trigger: 'change' }
        ],
        school: [
          { required: true, message: '请填写毕业院校', trigger: 'blur' }
        ],
        major: [
          { required: true, message: '请填写所学专业', trigger: 'blur' }
        ],
        graduateyear: [
          { required: true, message: '请填写毕业年份', trigger: 'blur' }
        ],
        course: [
          { required: true, message: '请选择教授课程', trigger: 'change' }
        ],
        teachtype: [
          { required: true, message: '请选择教授方式', trigger: 'blur' }
        ],
        teachyear: [
          { required: true, message: '请填写教龄', trigger: 'blur' }
        ],
        citylabel: [
          { required: true, message: '请填写常住地点', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '请填写地点经度', trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '请填写地点纬度', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '请填写省份', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请填写城市', trigger: 'blur' }
        ],
        country: [
          { required: true, message: '请填写区县', trigger: 'blur' }
        ],
        teachday: [
          { required: true, message: '请选择教学时间', trigger: 'change' }
        ],
        teachstarttime :[
          { required: true, message: '请填写开始时间', trigger: 'blur' }
        ],
        teachendtime :[
          { required: true, message: '请填写结束时间', trigger: 'blur' }
        ],
        idno: [
          { required: true, message: '请填写身份证号码', trigger: 'blur' }
        ],
        comment: [
          { required: true, message: '请选择学员评价', trigger: 'change' }
        ],
      },
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
      sex:'',
      xueliarr: ["大专", "本科", "硕士", "博士"],
      xueli: "",
      graduateyear: "",
      rolearr: [
        "专职幼教老师",
        "专职小学老师",
        "专职初中老师",
        "专职高中老师",
        "专职艺术老师",
        "兼职大学生"
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
      comment:['认真负责','幽默风趣','低调内敛','耐心指导','一丝不苟','宽容大度','教学大咖','内容丰富',
      '知识新颖','很有成效','平易近人','和善可亲','还想找Ta补课'],
      
    };
  },
  created() {
    
  },
  methods: {
    gradechange(x){
      console.log(x);
      
    },
    coursechange(x){
      console.log(x);
      
    },
    teachtypechange(x){
      console.log(x);
      
    },
    teachersexchange(x){
      console.log(x);
    },
    teachdaychange(x){
      console.log(x);
      
    },
    sexchange(x){
      console.log(x);
      this.sex = x
    },
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
      this.info.idcard1 = x.data.imgUrl
      this.$message({
        type:'success',
        message:"上传成功！"
      })
    },
    handlesuccess2(x,fileList){
      console.log(x,fileList);
      this.idcard2 = x.data.imgUrl
      this.info.idcard2 = x.data.imgUrl

      this.$message({
        type:'success',
        message:"上传成功！"
      })
    },
    handlesuccess3(x,fileList){
      console.log(x,fileList);
      this.avatar = x.data.imgUrl
      this.info.avatar = x.data.imgUrl
      this.$message({
        type:'success',
        message:"上传成功！"
      })
    },
    handlePreview1(file, fileList, x){
      console.log(file, fileList, x);          
    },
    handlePreview2(file, fileList, x){
      console.log(file, fileList, x);          
    },
    handlePreview3(file, fileList, x){
      console.log(file, fileList, x);          
    },
    handleRemove1(file, x){
      console.log(file, x);
    },
    handleRemove2(file, x){
      console.log(file, x);
    },
    handleRemove3(file, x){
      console.log(file, x);
    },
    addconfirmmodal(x) {
      this.$confirm("确定添加该学生?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.formvalidate(x)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消通过"
          });
        });
    },
    formvalidate(x){
      console.log(x);
      
      // 校验数据
      this.$refs[x].validate((valid) => {
        if (valid) {
          this.add()
        } else {
          console.log('error submit!!');
          return this.$message({
            type: "info",
            message: "表单不完整，请检查"
          }); 
        }
      })
    },
    add(){
      console.log(this.info);
      // return 
      axios.post(
        `http://212.64.64.99:8888/admin/adminaddstudent`,
        {...this.info}
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

