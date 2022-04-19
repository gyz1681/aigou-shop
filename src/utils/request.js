/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'

const instance = axios.create({
  baseURL: 'http://kumanxuan1.f3322.net:8881/cms', // 接口的基准路径
  timeout: 5000
})
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 请求拦截器

instance.interceptors.request.use(config => {
  if (config.url === '/sendSMS' || config.url === '/wechatUsers/PCLogin') {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  const token = store.getters.token
  if (token) {
    config.headers['x-auth-token'] = token
  }
  // console.log(config)
  return config
}, err => {
  return Promise.reject(err)
})
// 响应拦截器
instance.interceptors.response.use(response => {
  const data = response.data
  return data
}, err => {
  return Promise.reject(err)
})
export default instance
