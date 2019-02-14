import Vue from 'vue'
import App from './App'

// 全局样式
import 'mpvue-weui/src/style/weui.css'

import '../static/icon2.css'
import '../static/icon.css'


Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.globalData = {
    loginstate: {},
    userInfo: {},
    coursename: '',
    editdata: {}
}

const app = new Vue(App)
app.$mount()
