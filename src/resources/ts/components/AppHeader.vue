<template lang="pug">
  header.container-fluid.bg-primary.py-1.px-auto.px-sm-5
    .row.row-cols-auto.align-items-center.justify-content-between
      .col
        h1.m-0.text-light.logo(@click="toTaskIndex") ToDo App
      .col.d-flex.justify-content-end
        .col-auto.p-0.rounded.bg-light(v-if="currentUser")
          button.btn.btn-outline-primary.btn-sm(@click.prevent="logout" :disabled="isLoading") ログアウト
</template>

<style lang="scss" scoped>
.logo {
  cursor: pointer;
}
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    currentUser () {
      return this.$store.state.auth.user
    },
    isLoading(): boolean {
      return this.$store.state.task.isLoading
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout')
      if (!this.currentUser) {
        this.$router.push('/login')
      }
    },
    toTaskIndex() {
      if (!this.isLoading && this.$route.name !== 'TaskIndex') {
        this.$router.push({name: 'TaskIndex'})
      }
    },
  }
})
</script>
