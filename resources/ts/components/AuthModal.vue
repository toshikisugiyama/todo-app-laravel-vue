<template lang="pug">
#authModal.modal.d-flex.justify-content-center.align-items-center(tabindex="-1" data-show="true" aria-labelledby="authModalLabel" aria-hidden="false")
  .modal-dialog
    .spinner-border(role="status")
      .visually-hidden Loading...
</template>

<style lang="scss" scoped>
#authModal {
  background-color: rgba($color: #000000, $alpha: .3);
}
</style>
