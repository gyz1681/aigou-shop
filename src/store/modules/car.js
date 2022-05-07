import { getItem, setItem, removeItem } from '@/utils/storage'
import { gerUseInfo } from '@/api/user'
const TOKEN = 'x-auth-token'
const USER = 'userInfo'
const UUID = 'uuid'
const state = {
  token: getItem(TOKEN), // 获取token
  user: getItem(USER),
  uuid: getItem(UUID)
}

const mutations = {
  setToken (state, payload) {
    state.token = payload
    setItem(TOKEN, state.token)
  },
  setUser (state, data) {
    state.user = data
    setItem(USER, data)
  },
  removeUser (state) {
    state.user = {}
    removeItem(USER)
    state.token = null
    removeItem(TOKEN)
    state.uuid = null
    removeItem(UUID)
  },
  setUuid (state, data) {
    state.uuid = data
    setItem(UUID, data)
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
