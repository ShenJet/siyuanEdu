(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-9e2a"],{"9AdA":function(t,e,a){},CYxC:function(t,e,a){"use strict";var i=a("9AdA");a.n(i).a},Dkmk:function(t,e,a){"use strict";a.r(e);var i=a("f0Pt"),l=a.n(i),o={data:function(){return{info:null,formLabelWidth:"120px",deg1:0,deg2:0,deg3:0}},created:function(){this.fetchData()},methods:{fetchData:function(){this.listLoading=!0;var t=this.$route.params.openid;console.log(t),this.info=JSON.parse(sessionStorage.getItem("applyteacherdetail")),console.log(this.info)},detail:function(t){this.$router.push("/example/detail?id="+t.openid)},passmodal:function(t){var e=this;this.$confirm("此操作将通过该老师的申请, 是否继续?","提示",{confirmButtonText:"确定通过",cancelButtonText:"取消",type:"warning"}).then(function(){e.pass()}).catch(function(){e.$message({type:"info",message:"已取消通过"})})},pass:function(){var t=this;l.a.get("http://212.64.64.99:8888/admin/teacherapplyaudit?openid="+this.info.openid+"&type=pass").then(function(e){console.log(e),e.data.success?t.$message({type:"success",message:"通过成功!"}):t.$message({type:"warning",message:"操作失败!"})}).catch(function(e){console.log(e),t.$message({type:"warning",message:"操作失败!请检查网络"})})},rejectionmodal:function(t){var e=this;this.$confirm("此操作将驳回并删除该老师的申请信息, 且不可逆,是否继续?","提示",{confirmButtonText:"确定驳回",cancelButtonText:"取消",type:"warning"}).then(function(){e.rejection()}).catch(function(){e.$message({type:"info",message:"已取消驳回"})})},rejection:function(){var t=this;l.a.get("http://212.64.64.99:8888/admin/teacherapplyaudit?openid="+this.info.openid+"&type=rejection").then(function(e){console.log(e),e.data.success?t.$message({type:"success",message:"驳回成功!"}):t.$message({type:"warning",message:"操作失败!"})}).catch(function(e){console.log(e),t.$message({type:"warning",message:"操作失败!请检查网络"})})},rotate:function(t,e){var a=document.getElementById(t);this["deg"+e]+=90,a.style.transform="rotate( "+this["deg"+e]+"deg)"}}},n=(a("CYxC"),a("ZrdR")),s=Object(n.a)(o,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("h3",[t._v("老师详情：")]),t._v(" "),a("hr"),t._v(" "),a("el-form",{attrs:{model:t.info}},[a("el-form-item",{attrs:{label:"微信头像","label-width":t.formLabelWidth}},[a("img",{attrs:{src:t.info.avatar,alt:"",width:"70"}})]),t._v(" "),a("el-form-item",{attrs:{label:"姓名","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.info.name,callback:function(e){t.$set(t.info,"name",e)},expression:"info.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"手机号","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.info.phone,callback:function(e){t.$set(t.info,"phone",e)},expression:"info.phone"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"性别","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.info.sex,callback:function(e){t.$set(t.info,"sex",e)},expression:"info.sex"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"目前身份","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.info.role,callback:function(e){t.$set(t.info,"role",e)},expression:"info.role"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"最高学历","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.info.xueli,callback:function(e){t.$set(t.info,"xueli",e)},expression:"info.xueli"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"毕业院校","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.info.school,callback:function(e){t.$set(t.info,"school",e)},expression:"info.school"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"所学专业","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.info.major,callback:function(e){t.$set(t.info,"major",e)},expression:"info.major"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"毕业年份","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.info.graduateyear,callback:function(e){t.$set(t.info,"graduateyear",e)},expression:"info.graduateyear"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"教授科目","label-width":t.formLabelWidth}},t._l(t.info.course,function(e,i){return a("el-tag",{key:i,staticClass:"eltag",staticStyle:{"margin-right":"12px"}},[t._v(t._s(e))])})),t._v(" "),a("el-form-item",{attrs:{label:"教授费用(元/时)","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.info.price,callback:function(e){t.$set(t.info,"price",e)},expression:"info.price"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"教授方式","label-width":t.formLabelWidth}},t._l(t.info.teachtype,function(e,i){return a("el-tag",{key:i,staticClass:"eltag",staticStyle:{"margin-right":"12px"}},[t._v(t._s(e))])})),t._v(" "),a("el-form-item",{attrs:{label:"教学经验(年)","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.info.teachyear,callback:function(e){t.$set(t.info,"teachyear",e)},expression:"info.teachyear"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"常住地点","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.info.citylabel,callback:function(e){t.$set(t.info,"citylabel",e)},expression:"info.citylabel"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"常住小区","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.info.community,callback:function(e){t.$set(t.info,"community",e)},expression:"info.community"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"教授区域","label-width":t.formLabelWidth}},t._l(t.info.teacharea,function(e,i){return a("el-tag",{key:i,staticClass:"eltag",staticStyle:{"margin-right":"12px"}},[t._v(t._s(e))])})),t._v(" "),a("el-form-item",{attrs:{label:"可教授日","label-width":t.formLabelWidth}},t._l(t.info.teachday,function(e,i){return a("el-tag",{key:i,staticClass:"eltag",staticStyle:{"margin-right":"12px"}},[t._v(t._s(e))])})),t._v(" "),a("el-form-item",{attrs:{label:"教学时间段","label-width":t.formLabelWidth}},[a("el-tag",{staticClass:"eltag",staticStyle:{"margin-right":"12px"}},[t._v(t._s(t.info.teachstarttime))]),t._v("\n      至 "),a("el-tag",{staticClass:"eltag",staticStyle:{"margin-right":"12px"}},[t._v(t._s(t.info.teachendtime))])],1),t._v(" "),a("el-form-item",{attrs:{label:"课时费","label-width":t.formLabelWidth}},[a("el-input",{staticStyle:{width:"200px"},attrs:{"auto-complete":"off"},model:{value:t.info.price,callback:function(e){t.$set(t.info,"price",e)},expression:"info.price"}}),t._v(" (元/小时)\n    ")],1),t._v(" "),a("el-form-item",{attrs:{label:"身份证号码","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.info.idno,callback:function(e){t.$set(t.info,"idno",e)},expression:"info.idno"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"身份证正面","label-width":t.formLabelWidth}},[a("div",[a("img",{attrs:{id:"idcard1",src:t.info.idcard1,alt:"",width:"500"}})]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){t.rotate("idcard1",1)}}},[t._v("旋转90度")])],1),t._v(" "),a("el-form-item",{attrs:{label:"身份证反面","label-width":t.formLabelWidth}},[a("div",[a("img",{attrs:{id:"idcard2",src:t.info.idcard2,alt:"",width:"500"}})]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){t.rotate("idcard2",2)}}},[t._v("旋转90度")])],1),t._v(" "),a("el-form-item",{attrs:{label:"生活照","label-width":t.formLabelWidth}},[a("div",[a("img",{attrs:{id:"idcard3",src:t.info.idcard3,alt:"",width:"500"}})]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){t.rotate("idcard3",3)}}},[t._v("旋转90度")])],1),t._v(" "),a("el-form-item",{attrs:{label:"学员评价","label-width":t.formLabelWidth}},t._l(t.info.comment,function(e,i){return a("el-tag",{key:i,staticClass:"eltag",staticStyle:{"margin-right":"12px"}},[t._v(t._s(e))])})),t._v(" "),a("el-form-item",{attrs:{label:"个人介绍","label-width":t.formLabelWidth}},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.info.applydesc,expression:"info.applydesc"}],attrs:{name:"",id:"",cols:"100",rows:"10"},domProps:{value:t.info.applydesc},on:{input:function(e){e.target.composing||t.$set(t.info,"applydesc",e.target.value)}}})])],1),t._v(" "),a("hr"),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:0==t.info.auditstate,expression:"info.auditstate == 0"}],staticClass:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:t.passmodal}},[t._v("通过申请")]),t._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:t.rejectionmodal}},[t._v("驳回申请")])],1)],1)},[],!1,null,"711742de",null);s.options.__file="index.vue";e.default=s.exports}}]);