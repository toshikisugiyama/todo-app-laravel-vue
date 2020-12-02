import axios, { AxiosResponse } from 'axios'
interface State {
  user: User | null,
  apiStatus: boolean | null,
  errorMessages: Object | null
}
interface User {
  id: number,
  name: string,
  email: string,
  email_verified_at?: string,
  profile_image?: string,
  created_at: string,
  updated_at: string
}
const state: State = {
  user: null,
  apiStatus: null,
  errorMessages: null
}
const getters = {
  isLogin: (state: State) => !!state.user,
}
const mutations = {
  setUser (state: State, user: User) {
    state.user = user
  },
  setApiStatus (state: State, apiStatus: boolean | null) {
    state.apiStatus = apiStatus
  },
  setErrorMessages(state: State, errorMessages: Object | null) {
    state.errorMessages= errorMessages
  }
}
const actions = {
  resetAuthErrors({commit}: {commit: any}) {
    commit('setErrorMessages', null)
    commit('setApiStatus', null)
  },
  async register({commit}: {commit: any}, user: User) {
    try {
      commit('setApiStatus', null)
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('/api/register', user)
      commit('setApiStatus', true)
      commit('setErrorMessages', null)
    } catch ({response}) {
      commit('setApiStatus', false)
      commit('setErrorMessages', response.data.errors)
    }
  },
  async login({commit}: {commit: any}, user: User) {
    try {
      commit('setApiStatus', null)
      await axios.get('/sanctum/csrf-cookie')
      const {data} = await axios.post('/api/login', user)
      commit('setApiStatus', true)
      commit('setUser', data)
      commit('setErrorMessages', null)
    } catch ({response}) {
      commit('setApiStatus', false)
      commit('setErrorMessages', response.data.errors)
    }
  },
  async logout({commit}: {commit: any}) {
    try {
      commit('setApiStatus', null)
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('/api/logout')
      commit('setApiStatus', true)
      commit('setUser', null)
      commit('setErrorMessages', null)
    } catch ({response}) {
      commit('setApiStatus', false)
      commit('setErrorMessages', response.data.errors)
    }
  },
  async checkCurrentUser({commit}: {commit: any}) {
    try {
      commit('setApiStatus', null)
      const {data} = await axios.get('/api/user')
      const user = data || null
      commit('setApiStatus', true)
      commit('setUser', user)
    } catch ({response}) {
      commit('setApiStatus', false)
      commit('setErrorMessages', response.data)
    }
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
