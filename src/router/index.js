import Vue from 'vue'
import VueRouter from 'vue-router'

// 把这段代码直接粘贴到router/index.js中的Vue.use(VueRouter)之前
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
  // eslint-disable-next-line handle-callback-err
  return originalPush.call(this, location).catch(err => { })
}

Vue.use(VueRouter)
const sumbmitOrder = () => import('@/views/submitOrder')
// 路由表
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
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
    props: route => ({ name: 'zs', age: '18', id: route.params.id }),
    component: () => import('@/views/productInfo')
  }, {
    path: '/car',
    name: 'car',
    component: () => import('@/views/shopCar')
  }, {
    path: '/order',
    name: 'order',
    component: sumbmitOrder
  },
  {
    path: '/vnode',
    component: () => import('@/views/node')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
