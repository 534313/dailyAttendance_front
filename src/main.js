import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'; // 导入 elementUI
import 'element-ui/lib/theme-chalk/index.css'; // 导入 css
import axios from 'axios'
import './assets/global.css'
axios.defaults.baseURL = 'http://localhost:8080/'
Vue.prototype.$http = axios
Vue.config.productionTip = false


Vue.filter('dateFormat', function (originVal) {
    const dt = new Date(originVal)
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')
    return `${y} 年 ${m} 月 ${d} 日`
})

Vue.filter('timeFormat', function (originVal) {
    const dt = new Date(originVal)
    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')
    return `${hh}:${mm}:${ss} `
})
Vue.use(ElementUI)
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')