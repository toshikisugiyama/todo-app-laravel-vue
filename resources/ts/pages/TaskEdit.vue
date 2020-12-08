<template lang="pug">
  .container.py-5.text-primary
    .row.row-cols-1.justify-content-center
      h2.col.text-center.mb-4 タスク編集
    .row.row-cols-1(v-if="isLoading")
      task-loading
    .row.row-cols-1(v-else)
      .col
        .row.row-cols-1.row-cols-sm-2.justify-content-center.mb-2
          label.col-sm-3.align-self-center.text-sm-center.mb-1.mb-sm-0 タイトル
          .col-12
            input.p-1.w-100(:value="!editedTask.title ? task.title : editedTask.title" @input="titleInput")
        .row.row-cols-1.row-cols-sm-2.justify-content-center.mb-2
          label.col-sm-3.align-self-center.text-sm-center.mb-1.mb-sm-0 期限
          .col-12
            input.p-1.w-100(type="date" :value="!editedTask.date ? task.date : editedTask.date" @input="dateInput")
        .row.row-cols-1.row-cols-sm-2.justify-content-center.mb-2
          label.col-sm-3.align-self-center.text-sm-center.mb-1.mb-sm-0 メモ
          .col-12
            textarea.p-1.w-100(:value="!editedTask.note ? task.note : editedTask.note" @input="noteInput")
        .row.row-cols-auto.justify-content-center.align-items-center
          .col
            button.btn.btn-sm.btn-primary(@click="goBack") 戻る
          .col
            button.btn.btn-sm.btn-danger(@click="submitEdit" :disabled="!isInputted") OK
</template>

<script lang="ts">
import Vue from 'vue'
import TaskLoading from '../components/TaskLoading.vue'
interface EditedTask {
  title: string | null,
  date: string | null,
  note: string | null,
}
interface Task {
  created_at: string
  date: string
  id: string | number
  note: string
  status: string
  title: string
  updated_at: string
  user_id: string | number
}
export default Vue.extend({
  components: {
    TaskLoading
  },
  data(): {
    editedTask: EditedTask
  } {
    return {
      editedTask: {
        title: null,
        date: null,
        note: null,
      }
    }
  },
  computed: {
    isLoading(): boolean {
      return this.$store.state.task.isLoading
    },
    task(): Task {
      return this.$store.getters['task/getSelectedTask'](this.$route.params.taskId.toString())
    },
    isInputted(): boolean {
      const {title: editedTitle, date: editedDate, note: editedNote}: EditedTask = this.editedTask
      const {title, date, note}: EditedTask = this.task
      return (
        !(!editedTitle || editedTitle === title) ||
        !(!editedDate || editedDate === date) ||
        !(!editedNote || editedNote === note)
      )
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    titleInput(e: {target: HTMLInputElement}) {
      this.editedTask.title = e.target.value
    },
    dateInput(e: {target: HTMLInputElement}) {
      this.editedTask.date = e.target.value
    },
    noteInput(e: {target: HTMLInputElement}) {
      this.editedTask.note = e.target.value
    },
    async submitEdit() {
      let {title, date, note}: EditedTask = this.editedTask
      const id: number | string = this.$route.params.taskId.toString()
      const isConfirmed: boolean = confirm('変更してよろしいですか？')
      if (this.isInputted && isConfirmed) {
        title = title === null ? this.task.title : title
        date = date === null ? this.task.date : date
        note = note === null ? this.task.note : note
        const task = {id, title, date, note}
        await this.$store.dispatch('task/editTask', task)
        await this.$store.dispatch('task/indexTasks')
        this.$router.push({name: 'TaskItem', params: { taskId: id }})
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
