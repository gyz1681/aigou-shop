/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
import qs from 'qs'
// 获取商品资料
export const RemenAPI = () => request('/products/recommend', 'get')

// 获取热门商品
export const HotAPI = () => request('/products/hot', 'get')

// 所有商品
export const AllProAPI = () => request('/products', 'get')

// 商品详情
export const productInfo = id => request(`/products/${id}`, 'get')

// 登录
export const PhoneLoginAPI = params => request('/phoneRegin', 'post', qs.stringify(params))

// 获取验证码
export const SendSMSAPI = params => request('/sendSMS', 'post', qs.stringify(params))

// 用户信息
export const gerUseInfo = () => request('/shop/userProfiles', 'get')

// 查看购物车
export const getCart = () => request('/shop/carts', 'get')

// 添加商品
export const getAddCart = params => request('/shop/carts/add', 'post', qs.stringify(params))

// 删除商品
export const delCart = id => request(`/shop/carts?productIds=${id}`, 'delete')

// 微信登录（这个接口必须用qs对数据进行格式化）
export const WeixinLoginApi = (params) => request('/wechatUsers/PCLogin', 'post', qs.stringify(params))

// 微信绑定
export const WXbangDing = params => request('/wechatUsers/binding', 'post', qs.stringify(params))
