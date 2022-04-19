/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Toast } from 'vant'

export const baseURL = 'http://kumanxuan1.f3322.net:8881/cms'
const instance = axios.create({
  baseURL,
  timeout: 5000
})
// 请求拦截器

instance.interceptors.request.use(config => {
  // 后台要求发送验证码需要添加请求头
  if (config.url === '/sendSMS' || config.url === '/wechatUsers/PCLogin') {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  // 拦截业务逻辑
  // 请求配置的修改
  // 如果本地有token就在头部携带
  // 获取token
  const token = store.getters.token
  // 判断是否有token
  if (token) {
    // 设置token
    config.headers['x-auth-token'] = token
  }
  // console.log(config)
  return config
}, err => {
  return Promise.reject(err)
})
// 响应拦截器
// instance.interceptors.response.use(response => {
//   const data = response.data
//   return data
// }, err => {
//   return Promise.reject(err)
// })

instance.interceptors.response.use(res => {
  const result = res.data
  if (result.code !== 0 && result.code !== 400 && result.code !== 407) {
    Toast('数据获取失败')
    return false
  }
  return result
}, err => {
  if (err.response && err.response.status === 401) {
    // 清空无效用户信息
    // 跳转到登录页
    // 跳转需要传参
    store.commit('user/removeUser')
    const fullPath = encodeURIComponent(router.currentRoute.fullPath) // encodeURIComponent转换url编码，防止解析地址出错
    console.log(fullPath)
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
