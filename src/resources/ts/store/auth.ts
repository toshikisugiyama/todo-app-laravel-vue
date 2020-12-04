import axios, { AxiosResponse } from 'axios'
interface State {
  user: User | null,
  isLoading: boolean,
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
  isLoading: false,
  errorMessages: null
}
const getters = {
  isLogin: (state: State) => !!state.user,
}
const mutations = {
  setUser (state: State, user: User) {
    state.user = user
  },
  setLoading (state: State, isLoading: boolean) {
    state.isLoading = isLoading
  },
  setErrorMessages(state: State, errorMessages: Object | null) {
    state.errorMessages= errorMessages
  }
}
const actions = {
  resetAuthErrors({commit}: {commit: any}) {
    commit('setErrorMessages', null)
  },
  async register({commit}: {commit: any}, user: User) {
    try {
      commit('setLoading', true)
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('/api/register', user)
      commit('setErrorMessages', null)
      commit('setLoading', false)
    } catch ({response}) {
      commit('setErrorMessages', response.data.errors)
      commit('setLoading', false)
    }
  },
  async login({commit}: {commit: any}, user: User) {
    try {
      commit('setLoading', true)
      await axios.get('/sanctum/csrf-cookie')
      const {data} = await axios.post('/api/login', user)
      commit('setUser', data)
      commit('setErrorMessages', null)
      commit('setLoading', false)
    } catch ({response}) {
      commit('setErrorMessages', response.data.errors)
      commit('setLoading', false)
    }
  },
  async logout({commit}: {commit: any}) {
    try {
      commit('setLoading', true)
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('/api/logout')
      commit('setUser', null)
      commit('setErrorMessages', null)
      commit('setLoading', false)
    } catch ({response}) {
      commit('setErrorMessages', response.data.errors)
      commit('setLoading', false)
    }
  },
  async checkCurrentUser({commit}: {commit: any}) {
    try {
      commit('setLoading', true)
      const {data} = await axios.get('/api/user')
      const user = data || null
      commit('setUser', user)
      commit('setLoading', false)
    } catch ({response}) {
      commit('setErrorMessages', response.data)
      commit('setLoading', false)
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
