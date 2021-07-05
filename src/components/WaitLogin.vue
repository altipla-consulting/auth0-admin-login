
<template>
  <div v-show="!loading">
    <slot></slot>
  </div>
  <div v-show="loading" class="a0-throbber">
    <ac-icon duotone spin>spinner-third</ac-icon>
  </div>
</template>

<script>
import { loadedPromise } from '../auth.js'


export default {
  name: 'ac-wait-login',

  data() {
    return {
      loading: true,
    }
  },

  async mounted() {
    await loadedPromise
    this.loading = false
  },
}
</script>
