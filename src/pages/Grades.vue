<template>
<div class="bg-white border-b border-gray-300 shadow-lg text-xl py-3 font-sans font-semibold text-center">Личный кабинет 2.0</div>
<div class="bg-gray-200 pb-5 min-h-screen">
  <div class="text-center grid grid-cols-2 gap-4 max-w-2xl mx-auto">
    <button @click="toLk" class="inline-block text-center sm:text-xl font-semibold py-5 text-gray-500 hover:text-black outline-none">Общие сведения</button>
    <button class="inline-block text-center sm:text-xl font-semibold py-5 text-black-500 hover:text-black outline-none">Успеваемость</button>
  </div>
  <div class="bg-white mx-auto max-w-2xl rounded-lg border border-gray-300 shadow-lg">
  <div v-if="isLoading" class="my-10 flex flex-col content-center items-center justify-center">
    <div class="loader ease-linear rounded-full border-2 border-t-4 border-black w-10 h-10"></div>
  </div>
    <div v-if="!isLoading">
    <div class="hover:bg-gray-300 pt-5 border-b border-gray-300">
      <p class="mx-5 mb-5 text-lg font-semibold">Средний балл: {{ grades['GPA'] }}</p>
    </div>
    <div class="flex flex-col">
      <my-list-nested v-for="(year, indexYear) in grades['years']"
      :key="indexYear" :opened="indexYear == lastYear">
      <template #name>
        {{ indexYear }} курс
      </template>
      <template #grade>
        {{ year['GPA'] }}
      </template>
      <template #list>
        <my-list-nested v-for="(semester, indexSemester) in year['semesters']"
      :key="indexSemester" :opened="indexSemester == lastSemester">
      <template #name>
        {{ indexSemester}} семестр
      </template>
      <template #grade>
        {{ semester['GPA'] }}
      </template>
      <template #list>
          <my-list v-for="(discipline, indexDiscipline) in semester['disciplines']"
      :key="indexDiscipline">
      <template #name>
        {{ discipline['discipline_name']}} 
      </template>
      <template #grade>
        {{ discipline['grade'] }}
      </template>
      <template #content>
        <div class="hover:bg-gray-300 grid grid-cols-2 gap-4 border-b border-gray-300">
          <p class="my-5 mx-3">Группа</p>
          <p class="my-5 mx-3">{{ discipline['group'] }}</p>
        </div>
        <div class="hover:bg-gray-300 grid grid-cols-2 gap-4 border-b border-gray-300">
        <p class="my-5 mx-3">Форма оценивания</p>
        <p class="my-5 mx-3">{{ discipline['ranking'] }}</p>
        </div>
        <div class="hover:bg-gray-300 grid grid-cols-2 gap-4 border-b border-gray-300">
        <p class="my-5 mx-3">Преподаватель</p>
        <p class="my-5 mx-3">{{ discipline['educator_name'] }}</p>
        </div>
        <div class="hover:bg-gray-300 grid grid-cols-2 gap-4 border-b border-gray-300">
        <p class="my-5 mx-3">Кафедра</p>
        <p class="my-5 mx-3">{{ discipline['department'] }}</p>
        </div>
        <div class="hover:bg-gray-300 grid grid-cols-2 gap-4">
        <p class="my-5 mx-3">Дата сдачи</p>
        <p class="my-5 mx-3">{{ discipline['grade_date'] }}</p>
        </div>
      </template>
      </my-list>
      </template>
      </my-list-nested>
      </template>
      </my-list-nested>
    </div>
    </div>
  </div>
  </div>
</template>

<script>
import {ref, computed, watch, onMounted} from 'vue'
import router from '@/router/router'
import { useRoute } from 'vue-router';
import useGetGrades from "@/hooks/useGetGrades"
import useAuth from "@/hooks/useAuth"
import myList from "@/components/UI/myList"
import myListNested from "@/components/UI/myListNested"
import bridge from '@vkontakte/vk-bridge'
export default {
  components: {
    myList,
    myListNested
  },
  setup() {
    const { vk_id, vk_sign, token } = useAuth()
    const isLoading = ref(true)

    const toLk = () => {
      router.push({
      name: 'lk'
      })
    }

    const { getGrades, getGradesWithVk } = useGetGrades()

    const grades = ref({})

    const lastYear = ref(0)
    const lastSemester = ref({})
   
    const getLastSemester = () => {
      lastYear.value = Object.keys(grades.value['years']).length
      for ( let item in grades.value['years'][lastYear.value]['semesters']) {
          lastSemester.value = item
      }
    }
    

    onMounted(async() => { 
      try {
        grades.value = await getGradesWithVk(vk_id.value, vk_sign.value)
      } catch (e) {
        grades.value = await getGrades(token)
      } 
      getLastSemester()
    })

    watch(grades, () => {
      isLoading.value = false
    })

    return {
      grades,
      isLoading,
      toLk,
      lastYear,
      lastSemester,

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