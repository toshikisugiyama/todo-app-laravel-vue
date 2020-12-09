<template lang="pug">
  .container.py-5.text-primary
    .row.row-cols-1(v-if="isLoading || !selectedTask")
      task-loading
    .row.row-cols-1(v-else)
      .col
        .row.row-cols-1.justify-content-center
          .col
            h2.text-center {{ selectedTask.title }}
          .col.d-flex.justify-content-center.mb-2
            span.badge(:class="{'bg-primary': selectedTask.status === 'waiting', 'bg-success': selectedTask.status === 'done'}") {{ selectedTask.status === 'waiting' ? '未完了' : '完了済み' }}
          .col.d-flex.justify-content-end.mb-2
            span.small.text-right {{ selectedTask.date }}
          .col.mb-2
            p.lead.border.rounded.p-5 {{ selectedTask.note }}
        .row.row-cols-auto.justify-content-between.align-items-center
          .col
            .row.row-cols-auto
              .col
                button.btn.btn-sm.btn-primary(@click="goBack") 戻る
              .col
                button.btn.btn-sm.btn-success(@click="toEdit") 編集
          .col
            button.btn.btn-sm.btn-danger(@click="deleteTask") 削除
</template>

<script lang="ts">
import Vue from 'vue'
import TaskLoading from '../components/TaskLoading.vue'
export default Vue.extend({
  components: {
    TaskLoading
  },
  computed: {
    isLoading(): boolean {
      return this.$store.state.task.isLoading
    },
    selectedTask() {
      return this.$store.getters['task/getSelectedTask'](this.$route.params.taskId.toString())
    },
  },
  methods: {
    goBack() {
      if (this.selectedTask.status === 'waiting') {
        this.$router.push({name: 'TaskIndex'})
      } else {
        this.$router.push({name: 'FinishedTaskIndex'})
      }
    },
    toEdit() {
      this.$router.push({name: 'TaskEdit'})
    },
    async deleteTask() {
      if (confirm('削除してよろしいですか？')) {
        await this.$store.dispatch('task/deleteTask', this.$route.params.taskId)
        await this.$store.dispatch('task/indexTasks')
        this.$router.push({name: 'TaskIndex'})
      }
    },
  },
  mounted() {
    if (!this.$store.state.task.tasks.length) {
      this.$store.dispatch('task/indexTasks')
    }
  }
})
</script>
