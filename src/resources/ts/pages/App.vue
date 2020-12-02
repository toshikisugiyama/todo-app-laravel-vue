<template lang="pug">
  #app
    app-header
    main
      router-view
    app-footer
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import Vue from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
export default Vue.extend({
  components: {
    AppHeader,
    AppFooter
  }
})
</script>
