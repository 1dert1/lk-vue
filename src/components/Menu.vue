<template>
<div class="max-w-2xl mx-auto pb-5">
<div class="md:flex md:flex-row md:gap-x-10 grid grid-cols-2 gap-y-3 justify-center">
    <button @click=changePage(1) 
    class="text-center text-xl font-semibold hover:text-black outline-none" :class="[page == 1 ? activeCSS : inActiveCSS]">Общие сведения</button>
    <button @click=changePage(2) 
    class="text-center text-xl font-semibold hover:text-black outline-none" :class="[page == 2 ? activeCSS : inActiveCSS]">Успеваемость</button>
    <button @click=changePage(3) 
    class="text-center text-xl font-semibold hover:text-black outline-none" :class="[page == 3 ? activeCSS : inActiveCSS]">Выплаты</button>
    <button @click=changePage(4) 
    class="text-center text-xl font-semibold hover:text-black outline-none" :class="[page == 4 ? activeCSS : inActiveCSS]">Общежитие</button>
</div>
</div>
</template>

<script>
import { ref } from 'vue'
import useChangePage from "@/hooks/useChangePage"
export default {
    name: 'Menu',
    
    setup() {
        const { page, changePage } = useChangePage()
        const activeCSS = 'text-black-500'
        const inActiveCSS = 'text-gray-500'

        return {
            activeCSS, inActiveCSS, page, changePage
        }
    }
}
</script>   