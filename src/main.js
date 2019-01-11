import Vue from 'vue'
import App from './App'

// 全局样式
import '../static/weui/style/weui.wxss'
import '../static/iconfont.css'


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
