<template>
    <div id=app>
      <h3>新建新闻</h3>
      <div style="width:300px;margin-bottom:10px;">
        <el-input v-model="title" placeholder="请输入标题..." />
      </div>
      <div style="width:300px;margin-bottom:10px;">
        <el-input v-model="time" placeholder="请输入发布时间..." />
      </div>
      <!-- <vue-editor v-model="content" ></vue-editor> -->
      <vue-editor v-model="content" :editorToolbar="customToolbar"></vue-editor>

      <div style="margin-top:10px;">
        <el-button type="primary" size="small" @click="release">确定发布</el-button>
      </div>
      <div id="review">
        新闻预览：
        <h2>{{title}}</h2>
        <h5>{{time}}</h5>
        <div v-html="content"></div>
      </div>
    </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";

export default {
    name:'editor',
    data:function(){
        return {
            title:'',
            content: '请输入内容...',
            time: new Date().toLocaleDateString(),
            customToolbar:[
            // [{ 'font': [] }],

            // [{ 'header': [false, 1, 2, 3, 4, 5, 6, ] }],

            [{ 'size': ['small', false, 'large', 'huge'] }],

            ['bold', 'italic', 'underline', 'strike'],

            [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],

            // [{ 'header': 1 }, { 'header': 2 }],

            ['blockquote', 'code-block'],

            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],

            // [{ 'script': 'sub'}, { 'script': 'super' }],

            [{ 'indent': '-1'}, { 'indent': '+1' }],

            [{ 'color': [] }, { 'background': [] }],

            // ['link', 'image', 'video', 'formula'],

            [{ 'direction': 'rtl' }],
            ['clean'],
          ]
        }
    },
    components:{
      VueEditor
    },
    props: {
    },
    mounted() {
      
    },
    methods: {
     release(){
      console.log(this.content);
      if(!this.content){
        return this.$message({
            type: "warning",
            message: "内容不能为空!"
          });
      }
      if(!this.title){
        return this.$message({
            type: "warning",
            message: "标题不能为空!"
          });
      }
      if(!this.time){
        return this.$message({
            type: "warning",
            message: "发布时间不能为空!"
          });
      }
      axios.post(
        `http://212.64.64.99:8888/admin/newsrelease`,
        { 
          title: this.title,
          content: this.content,
          time: this.time,
        }
      )
      .then(res => {
        console.log(res);
        if(res.data.success){
          this.title = ''
          this.content = ''
          this.$message({
            type: "success",
            message: "发布成功!"
          });
        }else{
          this.$message({
            type: "warning",
            message: "发布失败!"
          });
        }
        
      })
      .catch( err =>{
        console.log(err);
        this.$message({
          type: "warning",
          message: "发布失败!请检查网络"
        });
      })
     }
    },
    destroyed() {
    }
}
</script>
<style lang="scss" scoped>
#app{
  padding: 0 30px;
}
#review{
  margin: 30px;
  padding: 10px;
  border: 1px solid #175ad6;
  border-radius: 6px;
}
</style>

