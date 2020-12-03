<template lang="pug">
  .container.py-5.text-primary
    .row.row-cols-1.justify-content-center
      .row.row-cols-2.justify-content-between.align-items-center
        h2.col タスク
        .col.d-flex.justify-content-end.p-0
          button.mr-1.btn.btn-sm.btn-success(v-if="!selectedTasks.length" @click="selectAll") 全選択
          button.mr-1.btn.btn-sm.btn-primary(v-else @click="clearAll") クリア
          button.btn.btn-sm.btn-danger(@click="deleteTasks") 削除
      ul.col.list-group.px-1.px-sm-auto
        li.list-group-item.list-group-item-action.d-flex.justify-content-between.align-items-center(v-for="task in tasks" :key="task.id")
          .col-1.mr-1
            input.form-check-input(:id="task.id" :name="task.id" :value="task" v-model="selectedTasks" type="checkbox")
          .col-11.d-flex.justify-content-between.align-items-center(@click="selectTask(task.id)")
            h3.m-0 {{ task.title }}
            small {{ task.date }}
</template>

<style lang="scss" scoped>
.list-group > .list-group-item-action {
  cursor: pointer;
}
</style>

<script lang="ts">
import Vue from 'vue'
interface Task {
  id: string,
  title: string,
  date: string
}
export default Vue.extend({
  data(){
    return {
      tasks: [
        {
          id: '1dfdf',
          title: 'aaa',
          date: '2100-1-1'
        },
        {
          id: '2dfdfdf',
          title: 'aaa',
          date: '2100-1-1'
        },
        {
          id: '2dddfdfdf',
          title: 'aaa',
          date: '2100-1-1'
        },
      ],
      selectedTasks: Array()
    }
  },
  methods: {
    selectAll(){
      this.tasks.map(task => {
        this.selectedTasks.push(task)
      })
    },
    clearAll(){
      this.selectedTasks = []
    },
    deleteTasks(){
      if (this.selectedTasks.length) {
        console.log(this.selectedTasks)
      }
    },
    selectTask(id: string){
      const task = this.tasks.filter(item => item.id === id)
      console.log(task[0])
    },
  }
})
</script>
