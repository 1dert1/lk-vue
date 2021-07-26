<template>
<div class="bg-white border-b border-gray-300 shadow-lg text-center text-xl py-3 font-sans font-semibold">Личный кабинет 2.0</div>
<div class="bg-gray-200 py-20 min-h-screen">
    <div class="bg-white mx-auto rounded-xl border border-gray-300  max-w-lg shadow-lg">
      <div class="border-b border-gray-300 shadow-sm min-w-full">
      <p class="text-center text-xl font-semibold py-5">Авторизация</p>
      </div>
      <div class="mt-5 max-w-lg px-5 flex flex-col content-center items-center justify-center">
      <input v-model="input" class="ring-1 ring-gray-300 focus:outline-none min-w-full focus:ring-1 focus:ring-black focus:border-transparent rounded-sm py-1 px-2" type="text" placeholder="Email, логин или телефон в формате 79270123456" />
      <input v-model="password" class="ring-1 ring-gray-300  focus:outline-none min-w-full focus:ring-1 focus:ring-black focus:border-transparent rounded-sm py-1 px-2 mt-3" type="password" placeholder="Пароль" />
      <p v-if="isError" class="bg-red-200 rounded-3xl text-center my-3 min-w-full mx-5">Неверный логин или пароль</p>
      <button v-if="!isLoading" 
      @click="auth(input, password, vk_id, vk_sign), isLoading=true" 
      class="bg-black rounded-3xl text-sm font-bold mt-5 mb-5 mx-10 py-3 px-8 text-white">Войти</button>
      <button v-if="isLoading" class="bg-black rounded-3xl mt-5 mb-5 mx-10 py-3 px-10"><div class="loader ease-linear rounded-full border-2 border-t-4 border-white w-6 h-6"></div></button>
      </div>
    </div>
  </div>

</template>
<script>
import {ref, computed, watch, onMounted} from 'vue'
import router from '@/router/router'
import useAuth from "@/hooks/useAuth"
import bridge from '@vkontakte/vk-bridge'
import { APP_ID } from '../config'
import qs from 'querystring'
export default {
  components: {

  },

  setup() {
    const isLoading = ref(false)
    const isError = ref(false)
    const vk_id = ref()
    const vk_sign = ref()

    const { input, password, auth, authWithVk, token, isAuth } = useAuth()

    onMounted(async() => { 
      try {
        vk_id.value = (await bridge.send('VKWebAppGetUserInfo')).id
        vk_sign.value = window.location.search.slice(1);
        await authWithVk(vk_id.value, vk_sign.value)
      } catch (e) {
      }
    })

    watch(token, () => {
      if(token.value['error']) {
        isError.value = true
        isLoading.value = false
      }
    })

    watch(input, () => {
      isError.value = false
    })

    watch(password, () => {
      isError.value = false
    })
    
    watch(isAuth, () => {
      router.push({
      name: 'lk', 
      params: {
         token: token.value, 
         vk_sign: vk_sign.value, 
        }
      })
      input.value = ''
      password.value = ''
      isAuth.value = false
    })
    return {
      input,
      password,
      auth,
      token,
      isAuth,
      isLoading,
      isError,
      vk_id, 
      vk_sign
    }
  },
}
</script>
<style>
.loader {
  border-top-color: solid white;
  -webkit-animation: spinner 1s linear infinite;
  animation: spinner 1s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>