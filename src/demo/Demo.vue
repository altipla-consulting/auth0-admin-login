
<template>
  <h1>Auth0 Admin Login</h1>

  <div>
    <button @click="userinfo" style="margin-right: 15px">userinfo</button>
    <button @click="token" style="margin-right: 15px">token</button>
    <button @click="logout" style="margin-right: 15px">logout</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { userinfo, bearerToken, logout } from '../lib'


export default defineComponent({
  methods: {
    async userinfo() {
      console.log(await userinfo())
    },

    token() {
      console.log(bearerToken())
    },

    async logout() {
      await logout()
    },
  },
})
</script>
