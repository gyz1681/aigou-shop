import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const loginCallback = () => import('@/views/login/callback.vue')
// 路由表
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/login/callback',
    name: 'callback',
    component: loginCallback
  }, {
    path: '/products/:id',
    name: 'products',
    component: () => import('@/views/productInfo')
  }, {
    path: '/car',
    name: 'car',
    component: () => import('@/views/shopCar')
  }

]

const router = new VueRouter({
  routes
})

export default router
