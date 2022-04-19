import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

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
