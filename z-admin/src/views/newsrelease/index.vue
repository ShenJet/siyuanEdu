<template>
    <div id=app>
      <h3>新建新闻</h3>
      <div style="width:300px;margin-bottom:10px;">
        <el-input v-model="title" placeholder="请输入标题..." />
      </div>
      <div style="width:300px;margin-bottom:10px;">
        <el-input v-model="time" placeholder="请输入发布时间..." />
      </div>
      <vue-editor v-model="content"></vue-editor>
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

export default {
    name:'editor',
    data:function(){
        return {
            title:'',
            content: '请输入内容...',
            time: ''
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

