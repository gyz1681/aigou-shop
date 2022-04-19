/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
import qs from 'qs'
// 获取商品资料

export const RemenAPI = () => request({ url: '/products/recommend' })
export const HotAPI = () => request({ url: '/products/hot' })
// 所有商品
export const AllProAPI = () => {
  return request({
    method: 'GET',
    url: '/products'
  })
}
// 商品详情
export const productInfo = id => {
  return request({
    method: 'GET',
    url: `/products/${id}`
  })
}

// 登录
export const PhoneLoginAPI = params => request.post('/phoneRegin', qs.stringify(params))
// 获取验证码
// export const getSms = data => {
//   return request({
//     method: 'POST',
//     url: '/sendSMS',
//     data
//   })
// }

//
export const SendSMSAPI = params => request.post('/sendSMS', qs.stringify(params))

// 用户信息
export const gerUseInfo = () => {
  return request({
    method: 'GET',
    url: '/shop/userProfiles'
  })
}

// 查看购物车
export const getCart = () => {
  return request({
    method: 'get',
    url: '/shop/carts'
  })
}
// 添加商品
export const getAddCart = params => request.post('/shop/carts/add', qs.stringify(params))
//   return request({
//     method: 'post',
//     url: '/shop/carts/add',
//     qs.stringify(data)
//   })
// }

// 删除商品
export const delCart = id => {
  return request({
    method: 'DELETE',
    url: `/shop/carts?productIds=${id}`
  })
}
