<template>
  <div class="app">
    <router-view :key="router.fullPath"></router-view>
  </div>
</template>
<script>
import router from '@/router/router'
import bridge from '@vkontakte/vk-bridge';

export default {
  components: {

  },
  setup() {
    // Sends event to client
    bridge.send('VKWebAppInit');

    return {
      router
    }
  },
}
</script>
<style>
</style>
