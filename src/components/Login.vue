
<template>
  Cargando autenticación...
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'ac-auth0-login',

  async navigate() {
    let u = new URL(window.location.href)
    u.pathname = u.searchParams.get('return') || '/'
    this.router.navigate(u.pathname)
  },
})
</script>
