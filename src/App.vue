<template>
  <div class="app">
    <router-view :key="router.fullPath"></router-view>
  </div>
</template>
<script>
import router from '@/router/router'
export default {
  components: {

  },
  setup() {
    return {
      router
    }
  },
}
</script>
<style>
</style>
