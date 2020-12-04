<template lang="pug">
  #app
    app-header
    main
      auth-modal(v-if="isLoading")
      router-view
    app-footer
</template>

<script lang="ts">
import Vue from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import AuthModal from '../components/AuthModal.vue'
export default Vue.extend({
  components: {
    AppHeader,
    AppFooter,
    AuthModal
  },
  computed: {
    isLoading() {
      return this.$store.state.auth.isLoading
    }
  }
})
</script>
