<template lang="pug">
  .container.py-5.text-primary
    .row.row-cols-1.justify-content-center
      h2.col.text-center.mb-4 {{ selectedStatus === 'done' ? '完了済み' : '' }}タスク一覧
    .row.row-cols-auto.justify-content-between.mb-2
      .col.px-1
        .row.row-cols-auto
          .col.d-flex.align-items-center.pr-1.pr-sm-2
            select.form-select.form-select-sm.w-100(v-model="selectedStatus" :disabled="isLoading")
              option(v-for="taskStatus in taskStatuses" :value="taskStatus.value") {{ taskStatus.label }}
          .col.d-flex.align-items-center.px-0.px-sm-2(v-if="!selectedTasks.length")
            button.btn.btn-sm.btn-success.w-100(@click="selectAll" :disabled="isLoading") 全選択
          .col.d-flex.align-items-center.px-0.px-sm-2(v-else)
            button.btn.btn-sm.btn-primary.w-100(@click="clearAll" :disabled="isLoading") 選択解除
          .col.d-flex.align-items-center.px-1.px-sm-2(v-if="selectedStatus === 'waiting'")
            button.btn.btn-sm.btn-danger.w-100(@click="finishTasks" :disabled="!selectedTasks.length || isLoading") 完了
          .col.d-flex.align-items-center.px-1.px-sm-2(v-else)
            button.btn.btn-sm.btn-danger.w-100.overflow-hidden(@click="unfinishTasks" :disabled="!selectedTasks.length || isLoading") 未完了に戻す
      .col.px-1.d-flex
        button.btn.btn-sm.btn-outline-primary.d-flex.align-items-center(@click="toAddPage" :disabled="isLoading")
          svg(width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg")
            path(fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z")
    .row.row-cols-1(v-if="isLoading")
      task-loading
    .row.row-cols-1(v-else)
      ul.col.list-group.px-1(v-if="selectedStatus === 'waiting' && waitingTasks.length")
        li.list-group-item.list-group-item-action.d-flex.justify-content-between.align-items-center(v-for="task in waitingTasks" :key="task.id")
          .col-1.mr-1
            input.form-check-input(:id="task.id" :name="task.id" :value="task" v-model="selectedTasks" type="checkbox")
          .col-11.d-flex.justify-content-between.align-items-center(@click="selectTask(task.id)")
            h3.m-0 {{ task.title }}
            small {{ task.date }}
      ul.col.list-group.px-1(v-else-if="selectedStatus === 'done' && finishedTasks.length")
        li.list-group-item.list-group-item-action.d-flex.justify-content-between.align-items-center(v-for="task in finishedTasks" :key="task.id")
          .col-1.mr-1
            input.form-check-input(:id="task.id" :name="task.id" :value="task" v-model="selectedTasks" type="checkbox")
          .col-11.d-flex.justify-content-between.align-items-center(@click="selectTask(task.id)")
            h3.m-0 {{ task.title }}
            small {{ task.date }}
      .col(v-else)
        p.py-5.m-0.text-center タスクはありません。
</template>

<style lang="scss" scoped>
.list-group > .list-group-item-action {
  cursor: pointer;
}
</style>

<script lang="ts">
import Vue from 'vue'
import TaskLoading from '../components/TaskLoading.vue'
interface Task {
  created_at?: string
  date?: string
  id?: number
  note?: string
  status?: string
  title?: string
  updated_at?: string
  user_id?: number
}
export default Vue.extend({
  components: {
    TaskLoading
  },
  data(){
    return {
      taskStatuses: [
        {value: "waiting", label: "未完了"},
        {value: "done", label: "完了済み"},
      ],
      selectedStatus: this.$route.name === "TaskIndex" ? "waiting" : "done",
      selectedTasks: Array()
    }
  },
  computed: {
    routeName(): string {
      return this.$route.name ?? 'TaskIndex'
    },
    isLoading(): boolean {
      return this.$store.state.task.isLoading
    },
    waitingTasks(): Task[] {
      return this.$store.getters['task/getWaitingTasks'] || []
    },
    finishedTasks(): Task[] {
      return this.$store.getters['task/getFinishedTasks'] || []
    },
  },
  methods: {
    selectAll(){
      const tasks: Task[] = this.selectedStatus === 'waiting' ? this.waitingTasks : this.finishedTasks
      tasks.map(task => {
        this.selectedTasks.push(task)
      })
    },
    clearAll(){
      this.selectedTasks = []
    },
    async changeStatus(status: string) {
      if (this.selectedTasks.length) {
        await this.selectedTasks.map((task:Task) => {
          task.status = status
          this.$store.dispatch('task/editTask', task)
        })
        this.$store.dispatch('task/indexTasks')
      }
    },
    async finishTasks(){
      await this.changeStatus('done')
      this.clearAll()
    },
    async unfinishTasks(){
      await this.changeStatus('waiting')
      this.clearAll()
    },
    selectTask(taskId: string){
      this.$router.push({name: 'TaskItem', params: {taskId}}).catch(() => {})
    },
    toAddPage () {
      this.$router.push({name: 'TaskAdd'}).catch(() => {})
    }
  },
  watch: {
    selectedStatus() {
      this.selectedTasks = []
      if (this.selectedStatus === 'done') {
        return this.$router.push({name: 'FinishedTaskIndex'}).catch(() => {})
      }
      return this.$router.push({name: 'TaskIndex'}).catch(() => {})
    },
    routeName () {
      if (this.routeName === 'TaskIndex') {
        this.selectedStatus = 'waiting'
      }
    }
  },
  mounted() {
    if (!this.$store.state.task.tasks.length) {
      this.$store.dispatch('task/indexTasks')
    }
  }
})
</script>
