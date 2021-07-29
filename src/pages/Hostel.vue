<template>
<NavBar/>
<Background>
<Menu/>
<div class="bg-white mx-auto max-w-2xl rounded-lg border border-gray-300 shadow-lg">
  <div v-if="isLoading" class="my-10 flex flex-col content-center items-center justify-center">
    <div class="loader ease-linear rounded-full border-2 border-t-4 border-black w-10 h-10"></div>
  </div>
  <div v-if="!isLoading && !hostel">
    <div class="hover:bg-gray-300 pt-5 border-b border-gray-300">
      <p class="mx-5 mb-5 font-semibold">Нет данных об общежитии</p>
    </div>
  </div>
    <div v-if="!isLoading && hostel">
    <div class="flex flex-col border-t border-gray-300">
      <div class="border-b border-gray-300 hover:bg-gray-300">
        <p class="mt-5 mx-3 font-semibold">Номер общежития</p>
        <p class="my-5 mx-3">{{ hostel.name }}</p>
      </div>
      <div class="border-b border-gray-300 hover:bg-gray-300">
        <p class="mt-5 mx-3 font-semibold">Адрес общежития</p>
        <p class="my-5 mx-3">{{ hostel.address }}</p>
      </div>
      <div class="border-b border-gray-300 hover:bg-gray-300">
        <p class="mt-5 mx-3 font-semibold">Статус заявки (договора)</p>
        <p class="my-5 mx-3">{{ hostel.status }}</p>
      </div>
      <div class="border-b border-gray-300 hover:bg-gray-300">
        <p class="mt-5 mx-3 font-semibold">Информация о заявке</p>
        <p class="my-5 mx-3">{{ hostel.status_information }}</p>
      </div>
      <div class="border-b border-gray-300 hover:bg-gray-300">
        <a :href="hostel.contract_link" target="_blank">
          <p class="underline my-5 mx-3 font-semibold">Ссылка на печать договора</p>
          </a>
      </div>        
      <my-list-nested :opened="false">
      <template #name>
        Выставленные счета
      </template>
      <template #grade>
      </template>
      <template #list>
    <my-list v-for="(bill, indexBill) in hostel.bills"
    :key="indexBill">
      <template #name>
        <div class="flex-grow grid grid-cols-2 justify-start items-center">
          <p class="my-5 mx-5 font-semibold">
            {{ bill.name  }} 
            </p>
            <p class="my-5 justify-self-end font-semibold">
            {{ bill.status  }}
            </p>
          </div>
      </template>
      <template #grade>
        {{ bill.amount }} ₽
      </template>
      <template #content>
      <div class="hover:bg-gray-300 grid grid-cols-2 gap-4 border-b border-gray-300">
          <p class="my-5 mx-5">Номер счета</p>
          <p class="my-5 mx-5">{{ bill.id }}</p>
        </div>
    <div class="hover:bg-gray-300 grid grid-cols-2 gap-4 border-b border-gray-300">
          <p class="my-5 mx-5">Дата счета</p>
          <p class="my-5 mx-5">{{ bill.date }}</p>
        </div>
    <div v-if="bill.link" class="hover:bg-gray-300 grid grid-cols-2 gap-4 border-b border-gray-300">
          <a :href="bill.link" target="_blank">
            <p class="my-5 mx-5 underline">Ссылка на счет</p>
          </a>
          <a :href="bill.linkAct" target="_blank">
            <p class="my-5 mx-5 underline">Ссылка на акт</p>
          </a>
        </div>
      </template>
      </my-list>
      </template>
      </my-list-nested>
      </div>
    </div>
    </div>
</Background>


</template>
<script>
import Navbar from "@/components/Navbar"
import Background from "@/components/Background"
import Box from "@/components/Box"
import Menu from "@/components/Menu"

import {ref, computed, watch, onMounted} from 'vue'
import router from '@/router/router'
import useAuth from "@/hooks/useAuth"
import useGetHostel from "@/hooks/useGetHostel"
import bridge from '@vkontakte/vk-bridge'
import myList from "@/components/UI/myList"
import myListNested from "@/components/UI/myListNested"
export default {
  components: {
    myList,
    myListNested,
    Navbar,
    Background,
    Box,
    Menu
  },

  setup() {
    const { vk_id, vk_sign, token } = useAuth()
    const isLoading = ref(true)

    const { getHostel, getHostelWithVk } = useGetHostel()

    const hostel = ref({})

    onMounted(async() => { 
      try {
        hostel.value = await getHostelWithVk(vk_id.value, vk_sign.value)
      } catch (e) {
        hostel.value = await getHostel(token.value)
      } 
    })

    watch(hostel, () => {
      isLoading.value = false
    })

    return {
      hostel,
      isLoading,
    }
  }
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