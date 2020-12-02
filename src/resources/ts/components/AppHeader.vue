<template lang="pug">
  header.container-fluid.bg-primary.py-1.px-auto.px-sm-5
    .row.row-cols-2.align-items-center
      .col
        h1.m-0.text-light ToDo App
      .col.d-flex.justify-content-end
        .col-auto.p-0.rounded.bg-light(v-if="currentUser")
          button.btn.btn-outline-primary.btn-sm(@click.prevent="logout") ログアウト
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    currentUser () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('auth/logout')
      if (!this.currentUser) {
        this.$router.push('/login')
      }
    }
  }
})
</script>
