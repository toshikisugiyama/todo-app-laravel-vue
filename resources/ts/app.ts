import './bootstrap'
import Vue from 'vue'
import router from './router'
import store from './store'
import App from './pages/App.vue'

const createApp = async () => {
  await store.dispatch('auth/checkCurrentUser')
  new Vue({
    el: '#app',
    components: { App },
    template: '<App/>',
    router,
    store
  })
}
createApp()
