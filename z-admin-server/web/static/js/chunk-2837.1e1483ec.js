(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2837"],{CCrs:function(e,t,a){},HeDi:function(e,t,a){"use strict";var i=a("CCrs");a.n(i).a},mV8p:function(e,t,a){"use strict";a.r(t);var i=a("f0Pt"),n=a.n(i),s={data:function(){return{info:null,formLabelWidth:"120px",deg1:0,deg2:0,deg3:0}},created:function(){this.fetchData()},methods:{fetchData:function(){this.listLoading=!0;var e=this.$route.params.openid;console.log(e),this.info=JSON.parse(sessionStorage.getItem("applystudentdetail")),console.log(this.info)},detail:function(e){this.$router.push("/example/detail?id="+e.openid)},passmodal:function(e){var t=this;this.$confirm("是否确定通过申请?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.pass()}).catch(function(){t.$message({type:"info",message:"已取消"})})},pass:function(){var e=this;n.a.get("http://212.64.64.99:8888/admin/studentapplyaudit?openid="+this.info.openid+"&randomstr="+this.info.randomstr+"&type=pass").then(function(t){console.log(t),t.data.success?e.$message({type:"success",message:"通过成功!"}):e.$message({type:"warning",message:"操作失败!"})}).catch(function(t){console.log(t),e.$message({type:"warning",message:"操作失败!请检查网络"})})},rejectionmodal:function(e){var t=this;this.$confirm("此操作将删除该学员的信息，是否继续?","提示",{confirmButtonText:"确定驳回",cancelButtonText:"取消",type:"warning"}).then(function(){t.rejection()}).catch(function(){t.$message({type:"info",message:"已取消"})})},rejection:function(){var e=this;n.a.get("http://212.64.64.99:8888/admin/studentapplyaudit?openid="+this.info.openid+"&randomstr="+this.info.randomstr+"&type=rejection").then(function(t){console.log(t),t.data.success?e.$message({type:"success",message:"删除成功!"}):e.$message({type:"warning",message:"操作失败!"})}).catch(function(t){console.log(t),e.$message({type:"warning",message:"操作失败!请检查网络"})})},recoverystudentmodal:function(e){var t=this;this.$confirm("此操作将恢复该学员的信息，是否继续?","提示",{confirmButtonText:"确定恢复",cancelButtonText:"取消",type:"warning"}).then(function(){t.recoverystudent()}).catch(function(){t.$message({type:"info",message:"已取消"})})},recoverystudent:function(){var e=this;n.a.get("http://212.64.64.99:8888/admin/studentrecovery?openid="+this.info.openid+"&randomstr="+this.info.randomstr).then(function(t){console.log(t),t.data.success?e.$message({type:"success",message:"恢复成功!"}):e.$message({type:"warning",message:"操作失败!"})}).catch(function(t){console.log(t),e.$message({type:"warning",message:"操作失败!请检查网络"})})},deletestudentmodal:function(e){var t=this;this.$confirm("此操作将删除该学员的信息，并且置为被驳回状态，是否继续?","提示",{confirmButtonText:"确定删除",cancelButtonText:"取消",type:"warning"}).then(function(){t.deletestudent()}).catch(function(){t.$message({type:"info",message:"已取消"})})},deletestudent:function(){var e=this;n.a.get("http://212.64.64.99:8888/admin/studentdelete?openid="+this.info.openid+"&randomstr="+this.info.randomstr).then(function(t){console.log(t),t.data.success?e.$message({type:"success",message:"删除成功!"}):e.$message({type:"warning",message:"操作失败!"})}).catch(function(t){console.log(t),e.$message({type:"warning",message:"操作失败!请检查网络"})})},rotate:function(e,t){var a=document.getElementById(e);this["deg"+t]+=90,a.style.transform="rotate( "+this["deg"+t]+"deg)"}}},o=(a("HeDi"),a("ZrdR")),l=Object(o.a)(s,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("h3",[e._v("学员信息详情：")]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:1==e.info.auditstate,expression:"info.auditstate == 1"}]},[a("span",{staticStyle:{display:"inline-block",width:"150px","padding-left":"50px"}},[e._v("是否被预约：")]),e._v(" "),a("el-tag",{staticClass:"eltag",staticStyle:{"margin-right":"12px"}},[e._v(e._s(e.info.beenordered?"已被预约":"尚未被预约"))])],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:1==e.info.auditstate,expression:"info.auditstate == 1"}],staticStyle:{"margin-top":"20px"}},[a("span",{staticStyle:{display:"inline-block",width:"150px","padding-left":"50px"}},[e._v("接单状态：")]),e._v(" "),a("el-tag",{staticClass:"eltag",staticStyle:{"margin-right":"12px"}},[e._v(e._s(e.info.recieveorder?"可被接单":"不可被接单"))])],1),e._v(" "),a("hr"),e._v(" "),a("el-form",{attrs:{model:e.info}},[a("el-form-item",{attrs:{label:"微信头像","label-width":e.formLabelWidth}},[a("img",{attrs:{src:e.info.avatar,alt:"",width:"70"}})]),e._v(" "),a("el-form-item",{attrs:{label:"姓名","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.info.name,callback:function(t){e.$set(e.info,"name",t)},expression:"info.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.info.phone,callback:function(t){e.$set(e.info,"phone",t)},expression:"info.phone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"性别","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.info.sex,callback:function(t){e.$set(e.info,"sex",t)},expression:"info.sex"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"科目","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.info.course,callback:function(t){e.$set(e.info,"course",t)},expression:"info.course"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"学习方式","label-width":e.formLabelWidth}},e._l(e.info.teachtype,function(t,i){return a("el-tag",{key:i,staticClass:"eltag",staticStyle:{"margin-right":"12px"}},[e._v(e._s(t))])})),e._v(" "),a("el-form-item",{attrs:{label:"教龄要求(年)","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.info.teachyear,callback:function(t){e.$set(e.info,"teachyear",t)},expression:"info.teachyear"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"性别要求","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.info.teachersex,callback:function(t){e.$set(e.info,"teachersex",t)},expression:"info.teachersex"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"常住地点","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.info.citylabel,callback:function(t){e.$set(e.info,"citylabel",t)},expression:"info.citylabel"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"教学时间段","label-width":e.formLabelWidth}},[a("el-tag",{staticClass:"eltag",staticStyle:{"margin-right":"12px"}},[e._v(e._s(e.info.teachstarttime))]),e._v("\n      至 "),a("el-tag",{staticClass:"eltag",staticStyle:{"margin-right":"12px"}},[e._v(e._s(e.info.teachendtime))])],1),e._v(" "),a("el-form-item",{attrs:{label:"身份证号码","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.info.idno,callback:function(t){e.$set(e.info,"idno",t)},expression:"info.idno"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"身份证正面","label-width":e.formLabelWidth}},[a("div",[a("img",{attrs:{id:"idcard1",src:e.info.idcard1,alt:"",width:"500"}})]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.rotate("idcard1",1)}}},[e._v("旋转90度")])],1),e._v(" "),a("el-form-item",{attrs:{label:"身份证反面","label-width":e.formLabelWidth}},[a("div",[a("img",{attrs:{id:"idcard2",src:e.info.idcard2,alt:"",width:"500"}})]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.rotate("idcard2",2)}}},[e._v("旋转90度")])],1),e._v(" "),a("el-form-item",{attrs:{label:"个人介绍","label-width":e.formLabelWidth}},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.info.applydesc,expression:"info.applydesc"}],attrs:{name:"",id:"",cols:"100",rows:"10"},domProps:{value:e.info.applydesc},on:{input:function(t){t.target.composing||e.$set(e.info,"applydesc",t.target.value)}}})]),e._v(" "),a("el-form-item",{attrs:{label:"学习概况","label-width":e.formLabelWidth}},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.info.gaikuang,expression:"info.gaikuang"}],attrs:{name:"",id:"",cols:"100",rows:"10"},domProps:{value:e.info.gaikuang},on:{input:function(t){t.target.composing||e.$set(e.info,"gaikuang",t.target.value)}}})])],1),e._v(" "),a("hr"),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:2==e.info.auditstate,expression:"info.auditstate == 2"}],staticClass:"footer"},[a("el-button",{attrs:{type:"success"},on:{click:e.recoverystudentmodal}},[e._v("恢复学员")])],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:1==e.info.auditstate,expression:"info.auditstate == 1"}],staticClass:"footer"},[a("el-button",{attrs:{type:"danger"},on:{click:e.deletestudentmodal}},[e._v("重新驳回")])],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:0==e.info.auditstate,expression:"info.auditstate == 0"}],staticClass:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.passmodal}},[e._v("审核通过")]),e._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:e.rejectionmodal}},[e._v("驳回申请")])],1)],1)},[],!1,null,"3d59c0fd",null);l.options.__file="index.vue";t.default=l.exports}}]);