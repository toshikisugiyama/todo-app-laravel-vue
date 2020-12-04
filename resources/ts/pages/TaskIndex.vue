<template lang="pug">
  .container.py-5.text-primary
    .row.row-cols-1.justify-content-center
      h2.col.text-center {{ selectedStatus === 'done' ? '完了済み' : '' }}タスク
    .row.row-cols-3.row-cols-sm-auto.justify-content-end.mb-2
      .col.d-flex.align-items-center
        select.form-select.form-select-sm.w-100(v-model="selectedStatus")
          option(v-for="taskStatus in taskStatuses" :value="taskStatus.value") {{ taskStatus.label }}
      .col.d-flex.align-items-center(v-if="!selectedTasks.length")
        button.btn.btn-sm.btn-success.w-100(@click="selectAll") 全選択
      .col.d-flex.align-items-center(v-else)
        button.btn.btn-sm.btn-primary.w-100(@click="clearAll") 選択解除
      .col.d-flex.align-items-center(v-if="selectedStatus === 'waiting'")
        button.btn.btn-sm.btn-danger.w-100(@click="finishTasks" :disabled="!selectedTasks.length") 完了
      .col.d-flex.align-items-center(v-else)
        button.btn.btn-sm.btn-danger.w-100.overflow-hidden(@click="unfinishTasks" :disabled="!selectedTasks.length") 未完了に戻す
    .row.row-cols-1(v-if="isLoading")
      .col.d-flex.justify-content-center
        .spinner-border.m-5(role="status")
          span.visually-hidden Loading...
    .row.row-cols-1(v-else)
      ul.col.list-group.px-1.px-sm-auto(v-if="selectedStatus === 'waiting' && waitingTasks.length")
        li.list-group-item.list-group-item-action.d-flex.justify-content-between.align-items-center(v-for="task in waitingTasks" :key="task.id")
          .col-1.mr-1
            input.form-check-input(:id="task.id" :name="task.id" :value="task" v-model="selectedTasks" type="checkbox")
          .col-11.d-flex.justify-content-between.align-items-center(@click="selectTask(task.id)")
            h3.m-0 {{ task.title }}
            small {{ task.date }}
      ul.col.list-group.px-1.px-sm-auto(v-if="selectedStatus === 'done' && finishedTasks.length")
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
interface Task {
  created_at: string
  date: string
  id: number
  note: string
  status: string
  title: string
  updated_at: string
  user_id: number
}
export default Vue.extend({
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
    isLoading(): boolean {
      return this.$store.state.task.isLoading
    },
    waitingTasks(): Task[] {
      return this.$store.getters['task/getWaitingTasks']
    },
    finishedTasks(): Task[] {
      return this.$store.getters['task/getFinishedTasks']
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
    finishTasks(){
      if (this.selectedTasks.length) {
        console.log(this.selectedTasks)
      }
    },
    unfinishTasks(){
      if (this.selectedTasks.length) {
        console.log(this.selectedTasks)
      }
    },
    selectTask(taskId: string){
      this.$router.push({path: `/${taskId}`, params: {taskId}})
    },
  },
  watch: {
    selectedStatus() {
      this.selectedTasks = []
      if (this.selectedStatus === 'done') {
        return this.$router.push({name: 'FinishedTaskIndex'})
      }
      return this.$router.push({name: 'TaskIndex'})
    }
  },
  mounted() {
    this.$store.dispatch('task/indexTasks')
  }
})
</script>
