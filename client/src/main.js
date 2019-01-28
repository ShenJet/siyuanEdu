import Vue from 'vue'
import App from './App'

// 全局样式
import 'mpvue-weui/src/style/weui.css'

import '../static/iconfont.css'


Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.globalData = {
    loginstate: {},
    userInfo:{}
}

const app = new Vue(App)
app.$mount()
