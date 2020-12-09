import axios from "axios"

interface State {
  tasks: Task[],
  isLoading: boolean,
  errorMessages: string[] | null
}
interface Task {
  created_at: string
  date: string
  id: number | string
  note: string
  status: string
  title: string
  updated_at: string
  user_id: number | string
}
const state: State = {
  tasks: [],
  isLoading: true,
  errorMessages: null
}
const getters = {
  getSelectedTask: (state: State) => (taskId: string) => (
    state.tasks.length ? state.tasks?.find(task => task.id?.toString() === taskId) : {}
  ),
  getWaitingTasks: (state: State) => (
    state.tasks.length ? state.tasks?.filter(task => task.status === 'waiting') : []
  ),
  getFinishedTasks: (state: State) => (
    state.tasks.length ? state.tasks?.filter(task => task.status === 'done') : []
  ),
}
const mutations = {
  setLoading(state: State, isLoading: boolean) {
    state.isLoading = isLoading
  },
  setTasks(state: State, tasks: Task[]) {
    state.tasks = tasks
  },
  setErrorMessages(state: State, errorMessages: string[] | null) {
    state.errorMessages = errorMessages
  }
}
const actions = {
  resetErrors({commit}: {commit: any}) {
    commit('setErrorMessages', null)
    commit('setLoading', false)
  },
  async indexTasks({commit}: {commit: any}) {
    try {
      commit('setLoading', true)
      commit('setErrorMessages', null)
      await axios.get('sanctum/csrf-cookie')
      const {data}: {data: Task[]} = await axios.get('api/tasks')
      await commit('setTasks', data)
      commit('setLoading', false)
    } catch (error) {
      commit('setErrorMessages', error)
      commit('setLoading', false)
    }
  },
  async editTask({commit}: {commit: any}, task: Task) {
    try {
      commit('setLoading', true)
      commit('setErrorMessages', null)
      await axios.get('sanctum/csrf-cookie')
      await axios.put(`api/tasks/${task.id}`, task)
      commit('setLoading', false)
    } catch (error) {
      commit('setErrorMessages', error)
      commit('setLoading', false)
    }
  },
  async addTask({commit}: {commit: any}, task: Task) {
    try {
      commit('setLoading', true)
      commit('setErrorMessages', null)
      await axios.get('sanctum/csrf-cookie')
      await axios.post('api/tasks', task)
      commit('setLoading', false)
    } catch ({message}) {
      commit('setErrorMessages', message)
      commit('setLoading', false)
    }
  },
  async deleteTask({commit}: {commit: any}, taskId: number | string) {
    try {
      commit('setLoading', true)
      commit('setErrorMessages', null)
      await axios.get('sanctum/csrf-cookie')
      await axios.delete(`api/tasks/${taskId}`)
      commit('setLoading', false)
    } catch ({message}) {
      commit('setErrorMessages', message)
      commit('setLoading', false)
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
