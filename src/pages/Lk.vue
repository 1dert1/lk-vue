<template>
<div class="bg-white border-b border-gray-300 shadow-lg text-xl py-3 font-sans font-semibold text-center">Личный кабинет 2.0</div>
<div class="bg-gray-200 pb-5 min-h-screen">
  <div class="text-center grid grid-cols-2 gap-4 max-w-2xl mx-auto">
    <button class="inline-block text-center sm:text-xl font-semibold py-5 text-black-500 outline-none">Общие сведения</button>
    <button @click="toGrades" class="inline-block text-center sm:text-xl font-semibold py-5 text-gray-500 hover:text-black outline-none">Успеваемость</button>
  </div>
  <div class="bg-white mx-auto max-w-2xl rounded-lg border border-gray-300 shadow-lg">
  <div v-if="isLoading" class="my-10 flex flex-col content-center items-center justify-center">
    <div class="loader ease-linear rounded-full border-2 border-t-4 border-black w-10 h-10"></div>
  </div>
    <div v-if="!isLoading">
    <div class="flex flex-col content-center items-center justify-center">
      <img class="mt-5 rounded-full w-32 h-32" :src="avatar" />
      <p class="mt-5 text-center font-semibold">{{ info['surname'] + ' ' + info['name'] + ' ' + info['middlename']}}</p>
      <p class="mt-2 text-gray-700">студент гр. {{ info['study_group'] }}, {{ info['year'] }} курс</p>
      <p class="mt-2 text-gray-700">{{ info['department'] }}</p>
      <button @click="logout()" class="bg-black rounded-3xl text-sm font-bold my-5 mx-10 py-3 px-8 text-white">Выйти</button>
    </div>
    <div class="flex flex-col border-t border-gray-300">
      <div class="border-b border-gray-300 hover:bg-gray-300">
        <p class="mt-5 mx-3 font-semibold">Специальность</p>
        <p class="my-5 mx-3">{{ info['speciality_code'] + ' ' + info['speciality'] }}</p>
      </div>
      <div class="border-b border-gray-300 hover:bg-gray-300">
        <p class="mt-5 mx-3 font-semibold">Форма обучения</p>
        <p class="my-5 mx-3">{{ info['mode_of_study'] + ', ' + info['education_type'] }}</p>
      </div>
      <div class="border-b border-gray-300 hover:bg-gray-300">
        <p class="mt-5 mx-3 font-semibold">Шифр группы</p>
        <p class="my-5 mx-3">{{ info['study_group_code'] }}</p>
      </div>
      <div class="border-b border-gray-300 hover:bg-gray-300">
        <p class="mt-5 mx-3 font-semibold">Номер зачетной книжки</p>
        <p class="my-5 mx-3">{{ info['record_book_number'] }}</p>
      </div>
      <div class="hover:bg-gray-300">
        <p class="mt-5 mx-3 font-semibold">Средний балл</p>
        <p class="my-5 mx-3">{{ info['grade_point_average'] }}</p>
      </div>
    </div>
    </div>
  </div>
  </div>
</template>

<script>
import {ref, computed, watch, onMounted} from 'vue'
import router from '@/router/router'
import { useRoute } from 'vue-router';
import useGetInfo from "@/hooks/useGetInfo"
import useLogout from "@/hooks/useLogout"
import bridge from '@vkontakte/vk-bridge'
export default {
  components: {

  },
  setup() {
    const route = useRoute()
    const token = route.params.token
    const vk_sign = ref(route.params.vk_sign)
    const vk_id = ref()
    const isLoading = ref(true)
    const { getInfo, getInfoWithVk } = useGetInfo()
    const { logoutVk } = useLogout()
 
    const avatar = ref('https://ru-static.z-dn.net/files/d98/0c89727fa47728733a450510c5c83021.jpg')
    
    const logout = () => {
      if(vk_sign.value){
        logoutVk(vk_id.value, vk_sign.value).then(res => console.log(res))
      }
      router.push({
      name: 'login',
      params: {
        vk_sign: vk_sign.value 
      }
      })
    }

    const toGrades = () => {
      router.push({
      name: 'grades', 
      params: {
        token: token,
        vk_sign: vk_sign.value
      }
      })
    }

    const info = ref({})

    onMounted(async() => { 
      try {
        vk_id.value = (await bridge.send('VKWebAppGetUserInfo')).id
        info.value = await getInfoWithVk(vk_id.value, vk_sign.value)
        console.log(info.value)
        const photo = (await bridge.send('VKWebAppGetUserInfo')).photo_200
        if(photo !== '') {
          avatar.value = photo;
        } 
      } catch (e) {
        info.value = await getInfo(token)
      }
      
      console.log(avatar.value)

    })
    watch(info, () => {
      isLoading.value = false
    })
    return {
      info,
      isLoading,
      logout,
      toGrades,
      avatar
    }
  },
    data() {
    return {
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