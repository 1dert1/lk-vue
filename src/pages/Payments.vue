<template>
<NavBar/>
<Background>
<Menu/>
<div class="bg-white mx-auto max-w-2xl rounded-lg border border-gray-300 shadow-lg">
  <div v-if="isLoading" class="my-10 flex flex-col content-center items-center justify-center">
    <div class="loader ease-linear rounded-full border-2 border-t-4 border-black w-10 h-10"></div>
  </div>
  <div v-if="!isLoading && !payments">
    <div class="hover:bg-gray-300 pt-5 border-b border-gray-300">
      <p class="mx-5 mb-5 font-semibold">Нет данных о выплатах</p>
    </div>
  </div>
    <div v-if="!isLoading && payments">
    <div v-if="payments.active.length" 
    class="hover:bg-gray-300 pt-5 border-b border-gray-300">
      <p class="mx-3 mb-5 font-semibold">Активные выплаты</p>
    </div>
    <my-list v-for="(payment, indexPayment) in payments.active"
    :key="indexPayment">
      <template #name>
            <p class="flex-grow my-5 mx-5 font-semibold">
            {{ payment.name }}
            </p>
      </template>
      <template #grade>
        {{ payment.amount }} ₽
      </template>
      <template #content>
        <div class="hover:bg-gray-300 grid grid-cols-2 gap-4 border-b border-gray-300">
          <p class="my-5 mx-5">Тип выплаты</p>
          <p class="my-5 mx-5">{{ payment.type }} </p>
        </div>
      <div class="hover:bg-gray-300 grid grid-cols-2 gap-4 border-b border-gray-300">
          <p class="my-5 mx-5">Дата начала</p>
          <p class="my-5 mx-5">{{ payment.start_date }}</p>
        </div>
    <div class="hover:bg-gray-300 grid grid-cols-2 gap-4 border-b border-gray-300">
          <p class="my-5 mx-5">Дата конца</p>
          <p class="my-5 mx-5">{{ payment.end_date }}</p>
        </div>
    <div class="hover:bg-gray-300 grid grid-cols-2 gap-4 border-b border-gray-300">
          <p class="my-5 mx-5">№ приказа</p>
          <p class="my-5 mx-5">{{ payment.order_number }}</p>
        </div>
    <div class="hover:bg-gray-300 grid grid-cols-2 gap-4 border-b border-gray-300">
          <p class="my-5 mx-5">Дата приказа</p>
          <p class="my-5 mx-5">{{ payment.order_date }}</p>
        </div>
    <div v-if="payment.cancel_order_number !== ''" class="hover:bg-gray-300 grid grid-cols-2 gap-4 border-b border-gray-300">
          <p class="my-5 mx-5">№ приказа отмены</p>
          <p class="my-5 mx-5">{{ payment.cancel_order_number }}</p>
        </div>
    <div v-if="payment.cancel_order_number_date !== ''" class="hover:bg-gray-300 grid grid-cols-2 gap-4 border-b border-gray-300">
          <p class="my-5 mx-5">Дата приказа отмены</p>
          <p class="my-5 mx-5">{{ payment.cancel_order_number_date }}</p>
        </div>
      </template>
      </my-list>
      <my-list-nested :opened="false" v-if="payments.inactive.length">
      <template #name>
        Истекшие выплаты
      </template>
      <template #grade>
      </template>
      <template #list>
    <my-list v-for="(payment, indexPayment) in payments.inactive"
    :key="indexPayment">
      <template #name>
          <p class="flex-grow my-5 mx-5 font-semibold">
            {{ payment.name }}
            </p>
      </template>
      <template #grade>
        {{ payment.amount }} ₽
      </template>
      <template #content>
        <div class="hover:bg-gray-300 grid grid-cols-2 gap-4 border-b border-gray-300">
          <p class="my-5 mx-5">Тип выплаты</p>
          <p class="my-5 mx-5">{{ payment.type }} </p>
        </div>
      <div class="hover:bg-gray-300 grid grid-cols-2 gap-4 border-b border-gray-300">
          <p class="my-5 mx-5">Дата начала</p>
          <p class="my-5 mx-5">{{ payment.start_date }}</p>
        </div>
    <div class="hover:bg-gray-300 grid grid-cols-2 gap-4 border-b border-gray-300">
          <p class="my-5 mx-5">Дата конца</p>
          <p class="my-5 mx-5">{{ payment.end_date }}</p>
        </div>
    <div class="hover:bg-gray-300 grid grid-cols-2 gap-4 border-b border-gray-300">
          <p class="my-5 mx-5">№ приказа</p>
          <p class="my-5 mx-5">{{ payment.order_number }}</p>
        </div>
    <div class="hover:bg-gray-300 grid grid-cols-2 gap-4 border-b border-gray-300">
          <p class="my-5 mx-5">Дата приказа</p>
          <p class="my-5 mx-5">{{ payment.order_date }}</p>
        </div>
    <div v-if="payment.cancel_order_number !== ''" class="hover:bg-gray-300 grid grid-cols-2 gap-4 border-b border-gray-300">
          <p class="my-5 mx-5">№ приказа отмены</p>
          <p class="my-5 mx-5">{{ payment.cancel_order_number }}</p>
        </div>
    <div v-if="payment.cancel_order_number_date !== ''" class="hover:bg-gray-300 grid grid-cols-2 gap-4 border-b border-gray-300">
          <p class="my-5 mx-5">Дата приказа отмены</p>
          <p class="my-5 mx-5">{{ payment.cancel_order_number_date }}</p>
        </div>
      </template>
      </my-list>
      </template>
      </my-list-nested>
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
import useGetPayments from "@/hooks/useGetPayments"
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

    const { getPayments, getPaymentsWithVk } = useGetPayments()

    const payments = ref({})

    onMounted(async() => { 
      try {
        payments.value = await getPaymentsWithVk(vk_id.value, vk_sign.value)
      } catch (e) {
        payments.value = await getPayments(token.value)
      }
      console.log(payments) 
    })

    watch(payments, () => {
      isLoading.value = false
    })

    return {
      payments,
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
