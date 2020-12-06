import axios from "axios"

interface State {
  tasks: Task[] | null,
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
  tasks: null,
  isLoading: true,
  errorMessages: null
}
const getters = {
  getSelectedTask: (state: State) => (taskId: string) => state.tasks?.find(task => task.id.toString() === taskId),
  getWaitingTasks: (state: State) => state.tasks?.filter(task => task.status === 'waiting'),
  getFinishedTasks: (state: State) => state.tasks?.filter(task => task.status === 'done')
}
const mutations = {
  setLoading(state: State, isLoading: boolean) {
    state.isLoading = isLoading
  },
  setTasks(state: State, tasks: Task[] | null) {
    state.tasks = tasks
  },
  setErrorMessages(state: State, errorMessages: string[] | null) {
    state.errorMessages = errorMessages
  }
}
const actions = {
  async indexTasks({commit}: {commit: any}) {
    try {
      commit('setLoading', true)
      commit('setErrorMessages', null)
      await axios.get('sanctum/csrf-cookie')
      const {data} = await axios.get('api/tasks')
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
      const {data} = await axios.put(`api/tasks/${task.id}`, task)
      await commit('setTasks', data)
      commit('setLoading', false)
    } catch (error) {
      commit('setErrorMessages', error)
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