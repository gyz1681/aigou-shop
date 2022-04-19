import Vue from 'vue'
import Vuex from 'vuex'
import car from './modules/car'
import getters from './getter'
import shopcar from './modules/shopCar'
import { setItem } from '@/utils/storage'
Vue.use(Vuex)
const myPlugin = store => {
  store.subscribe((mutations, state) => {
    if (mutations.type.startsWith('shopcar/')) {
      setItem('shop-car', state.shopcar.shopCar)
    }
  })
}
const store = new Vuex.Store({
  modules: {
    car, shopcar
  },
  getters,
  plugins: [myPlugin]
})

export default store
