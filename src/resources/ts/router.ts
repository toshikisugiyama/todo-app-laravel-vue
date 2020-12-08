import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import store from './store'
import Auth from './pages/Auth.vue'
import TaskIndex from './pages/TaskIndex.vue'
import TaskItem from './pages/TaskItem.vue'
import TaskEdit from './pages/TaskEdit.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'TaskIndex',
    component: TaskIndex,
    children: [
      {name: 'FinishedTaskIndex', path: 'done', component: TaskIndex},
    ],
  },
  { path: '/login', name: 'Auth', component: Auth, },
  { name: 'TaskItem', path: '/:taskId', component: TaskItem, },
  { name: 'TaskEdit', path: '/:taskId/edit', component: TaskEdit, },
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
