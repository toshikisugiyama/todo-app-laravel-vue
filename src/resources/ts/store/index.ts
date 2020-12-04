import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import task from './task'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    task,
  }
})

export default store
