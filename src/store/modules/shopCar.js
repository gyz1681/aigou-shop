import { getAddCart, delCart, getCart } from '@/api/user'
import { getItem } from '@/utils/storage'
import { Toast } from 'vant'
const state = {
  shopCar: getItem('shop-car') || []
}
const mutations = {
  insetCart (state, product) {
    const prod = state.shopCar.find(item => item.id === product.id)
    if (prod) {
      prod.total++
      prod.isChecked = true
      prod.totalPrice = product.coin * product.total
    } else {
      state.shopCar.push({
        ...product,
        isChecked: true,
        totalPrice: product.coin
      })
    }
  },
  getCart (state, product) {
    product.forEach(item => {
      state.shopCar.push({
        ...item,
        isChecked: true,
        totalPrice: product.coin
      })
    })
  },
  deleteFromCart (state, prodId) {
    // console.log(prodId)
    const index = state.shopCar.findIndex(item => item.id === prodId)
    // console.log(index)
    if (index !== -1) {
      state.shopCar.splice(index, 1)
    }
  },
  updateAllProductCheck (state, checked) {
    state.shopCar.forEach(item => {
      item.isChecked = checked
    })
  },
  updateProdctChecked (state, { checked, prodId }) {
    // console.log(checked, prodId)
    const prod = state.shopCar.find(prod => prod.id === prodId)
    if (prod) {
      prod.isChecked = checked
    }
  },
  updateProduct (state, { prodId, total }) {
    const prod = state.shopCar.find(prod => prod.id === prodId)
    if (prod) {
      prod.total = total
      prod.totalPrice = total * prod.coin
    }
  },
  removeProduct (state) {
    state.shopCar = []
  }

}
const getters = {
  totalPrice (state) {
    return state.shopCar.reduce((sum, prod) => sum + prod.totalPrice, 0)
  },
  totalCount (state) {
    return state.shopCar.reduce((sum, prod) => sum + prod.total, 0)
  },
  checkedCount (state) {
    return state.shopCar.reduce((sum, prod) => {
      if (prod.isChecked) {
        sum += prod.total
      }
      return sum
    }, 0)
  },
  checkedPrice (state) {
    return state.shopCar.reduce((sum, prod) => {
      if (prod.isChecked) {
        sum += prod.totalPrice
      }
      return sum
    }, 0)
  }
}
const actions = {
  async insetCart (context, payload) {
    try {
      const { data } = await getAddCart({ productId: payload.goodsId, total: payload.selectedNum })
      // console.log(data)
      context.commit('insetCart', data)
    } catch (err) {
      Toast('每款限购五个')
    }
  },
  async deleteCars (context, payload) {
    await delCart(payload)
    context.commit('deleteFromCart', payload)
  },
  async getCarts (context, Id) {
    const { data } = await getCart(Id)
    // console.log(data)
    context.commit('getCart', data)
  },
  async updateProduct (context, payload) {
    try {
      const { data } = await getAddCart({ productId: payload.productId, total: payload.total, modified: 1 })
      const { id, total } = data
      context.commit('updateProduct', { prodId: id, total: total })
    } catch (err) {
      Toast('超过限购数量')
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
