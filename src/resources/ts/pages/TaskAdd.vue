<template lang="pug">
  .container.py-5.text-primary
    .row.row-cols-1.justify-content-center
      h2.col.text-center.mb-4 新しいタスク追加
    .row.row-cols-1(v-if="isLoading")
      task-loading
    .row.row-cols-1(v-else)
      .col
        .row.row-cols-1.row-cols-sm-2.justify-content-center.mb-2
          label.col-sm-3.align-self-center.text-sm-center.mb-1.mb-sm-0(for="title") タイトル
          .col-12
            input.p-1.w-100#title(v-model="newTask.title" )
        .row.row-cols-1.row-cols-sm-2.justify-content-center.mb-2
          label.col-sm-3.align-self-center.text-sm-center.mb-1.mb-sm-0(for="date") 期限
          .col-12
            input.p-1.w-100#date(v-model="newTask.date" type="date")
        .row.row-cols-1.row-cols-sm-2.justify-content-center.mb-2
          label.col-sm-3.align-self-center.text-sm-center.mb-1.mb-sm-0(for="note" v-model="newTask.note") メモ
          .col-12
            textarea.p-1.w-100#note(v-model="newTask.note")
        .row.row-cols-auto.justify-content-center.align-items-center
          .col
            button.btn.btn-sm.btn-primary(@click="goBack") 戻る
          .col
            button.btn.btn-sm.btn-danger(@click="submitAdd" :disabled="!isInputted") OK
</template>

<script lang="ts">
import Vue from 'vue'
import TaskLoading from '../components/TaskLoading.vue'
export default Vue.extend({
  components: {
    TaskLoading
  },
  data() {
    return {
      newTask: {
        title: '',
        date: '',
        note: '',
      }
    }
  },
  computed: {
    isLoading(): boolean {
      return this.$store.state.task.isLoading
    },
    isInputted(): boolean {
      const {title, date, note}: {title: string, date: string, note: string} = this.newTask
      return !!title.length && !!date.length
    },
  },
  methods: {
    async submitAdd(){
      if (this.isInputted) {
        await this.$store.dispatch('task/addTask', this.newTask)
        await this.$store.dispatch('task/indexTasks')
        this.goBack()
      }
    },
    goBack(){
      this.$router.push({name: 'TaskIndex'})
    },
  },
  mounted() {
    this.$store.dispatch('task/resetErrors')
  }
})
</script>
