import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import store from './store'
import Auth from './pages/Auth.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Auth
  },
  {
    path: '/',
    beforeEnter: (to: Route, from: Route, next: Function) => {
      if (!store.getters['auth/isLogin']) {
        next('/login')
      } else {
        next()
      }
    }
  }
]
const router = new VueRouter({
  mode: 'history',
  routes
})
export default router
