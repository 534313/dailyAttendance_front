import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/main.vue'
import Home from '../components/home.vue'
import Attendance from '../components/attendance.vue'
import makePlan from '../components/makePlan.vue'
import attendanceStataistics from '../components/attendanceStatistics.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/home',
    children: [{
      path: '/home', component: Home
    }, {
      path: '/attendance', component: Attendance
    }, {
      path: '/makePlan', component: makePlan
    }, {
      path: '/attendanceStatistics', component: attendanceStataistics
    }]
  },

]

const router = new VueRouter({
  routes
})

export default router
