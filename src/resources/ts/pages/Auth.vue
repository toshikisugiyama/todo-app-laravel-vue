<template lang="pug">
  .container.py-5.text-primary
    .row.row-cols-1.justify-content-center
      h1.col.text-center.mb-4 {{ title }}
      .row.row-cols-1.justify-content-center
        .col-12.mb-4(v-for="item in items")
          .row.row-cols-1.row-cols-sm-2.justify-content-center.mb-2
            label.col-sm-3.align-self-center.text-sm-center(:key="item.id" :for="item.id") {{ item.name }}
            input.p-1.col-12(:name="item.id" :id="item.id" :type="item.type" v-model="authForm[item.id]")
          p.col-sm-9.mx-auto.justify-self-end.text-danger.text-right(v-if="errorMessages && errorMessages[item.id]") {{ errorMessages[item.id][0] }}
        .row.row-cols-auto.justify-content-center.mt-3(v-if="isLoginPage")
          button.col.btn.btn-outline-primary.mr-3(@click.prevent="toRegister") 新規登録
          button.col.btn.btn-primary(@click.prevent="login") ログイン
        .row.row-cols-auto.justify-content-center.mt-3(v-else)
          button.col.btn.btn-outline-primary.mr-3(@click.prevent="toLogin") ログイン
          button.col.btn.btn-primary(@click.prevent="register") 新規登録
</template>

<script lang="ts">
import Vue from 'vue'
interface authItems {
  id: string
  name: string
  type: string
}
interface ErrorMessages {
  name?: string[]
  email?: string[]
  password?: string[]
}
const loginItems: authItems[] = [{
  id: 'email',
  name: 'メールアドレス',
  type: 'email'
},{
  id: 'password',
  name: 'パスワード',
  type: 'password'
}]
export default Vue.extend({
  data() {
    return {
      isLoginPage: false,
      loginItems,
      registerItems: [{
        id: 'name',
        name: '名前',
        type: "text"
      },
      ...loginItems,
      {
        id: 'password_confirmation',
        name: 'パスワード（確認）',
        type: 'password'
      }],
      authForm: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  computed: {
    title (): string {
      return this.isLoginPage ? 'ログイン' : '新規登録'
    },
    items (): authItems[] {
      return this.isLoginPage ? this.loginItems : this.registerItems
    },
    errorMessages (): ErrorMessages {
      return this.$store.state.auth.errorMessages
    }
  },
  methods: {
    toRegister() {
      this.$store.dispatch('auth/resetAuthErrors')
      this.isLoginPage = false
    },
    async login() {
      await this.$store.dispatch('auth/login', this.authForm)
      if(!this.errorMessages) {
        this.$router.push({name: 'TaskIndex'})
      }
    },
    toLogin() {
      this.$store.dispatch('auth/resetAuthErrors')
      this.isLoginPage = true
    },
    async register() {
      await this.$store.dispatch('auth/register', this.authForm)
      if(!this.errorMessages) {
        this.toLogin()
      }
    },
  }
})
</script>
