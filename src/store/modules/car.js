import { getItem, setItem, removeItem } from '@/utils/storage'
import { gerUseInfo } from '@/api/user'
const TOKEN = 'x-auth-token'
const USER = 'userInfo'
const state = {
  token: getItem(TOKEN), // 获取token
  user: getItem(USER)
}

const mutations = {
  setToken (state, payload) {
    state.token = payload
    setItem(TOKEN, state.token)
  },
  removeToken (state) {
    state.token = null
    removeItem(TOKEN)
  },
  setUser (state, data) {
    state.user = data
    setItem(USER, data)
  },
  removeUser (state) {
    state.user = {}
    removeItem(USER)
  }
}

const actions = {
  async getUser (context) {
    try {
      const { data: { userInfo } } = await gerUseInfo()
      context.commit('setUser', userInfo)
    } catch (error) {
      console.log(error)
    }
  },
  loginOut (context) {
    context.commit('removeToken')
    context.commit('removeUser')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
