import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import store from './store'
import Auth from './pages/Auth.vue'
import TaskIndex from './pages/TaskIndex.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/',
    name: 'TaskIndex',
    component: TaskIndex,
    children: [
      {name: 'FinishedTaskIndex', path: 'done', component: TaskIndex}
    ],
  }
]
const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to: Route, from: Route, next: Function) => {
  if (to.name !== 'Auth' && !store.getters['auth/isLogin']) next({name: 'Auth'})
  else next()
})
export default router
