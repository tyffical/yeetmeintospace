import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App
  }
  // ,
  // {
  //   path: '/settings',
  //   name: 'Settings',
  //   component: Settings
  // },
]

const router = new VueRouter({
  routes
})

export default router
