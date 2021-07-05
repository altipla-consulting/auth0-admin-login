
<template>
  <ac-wait-login>
    <h1>Auth0 Admin Login</h1>

    <div>
      <button @click="userInfo">userInfo</button>
      <button @click="token">token</button>
      <button @click="logout">logout</button>
    </div>
  </ac-wait-login>
</template>

<script>
import { userinfo, bearerToken, logout } from '../lib.js'


export default {
  methods: {
    async userInfo() {
      console.log(userinfo())
    },

    async token() {
      console.log(bearerToken())
    },

    async logout() {
      await logout()
    },
  },
}
</script>
