// 权限拦截在路由跳转，导航守卫

import router from '@/router'
import store from '@/store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 定义白名单

router.beforeEach((to, from, next) => {
  // console.log('触发')
  nprogress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 没有token
    const token = store.getters.token
    if (!token && to.path.startsWith('/car')) {
      return next('/login?redirectUrl=' + encodeURIComponent(to.fullPath))
    }
    next()
  }
  nprogress.done() // 解决手动切换地址时 进度条不关闭的问题
})

// 后置守卫
router.afterEach(route => {
  nprogress.done()
})
