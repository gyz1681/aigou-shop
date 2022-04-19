import { getAddCart, deleteCar } from '@/api/user'
import { getItem } from '@/utils/storage'
const state = {
  shopCar: getItem('shop-car') || []
}
const mutations = {
  addCar (state, product) {
    const prod = state.shopCar.find(item => item.id === product.id)
    if (prod) {
      prod.total++
      prod.isChecked = true
      prod.totalPrice = prod.coin * prod.total
    } else {
      state.shopCar.push({
        ...product,
        total: 1,
        isChecked: true,
        totalPrice: product.coin
      })
    }
  },
  deleteFromCart (state, prodId) {
    const index = state.shopCar.findIndex(item => item.id === prodId)
    console.log(index)
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
    console.log(checked, prodId)
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
  async addCars (context, payload) {
    // console.log(payload)
    const { data } = await getAddCart(payload)
    // console.log(data)
    context.commit('addCar', data)
  },
  async delete (context, payload) {
    const data = await deleteCar(payload)
    context.commit('deleteCar', data)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
