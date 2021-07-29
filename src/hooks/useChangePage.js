import {ref} from 'vue'
import router from '@/router/router'
const page = ref(1)

export default function useGetGrades() {
    const changePage = (id) => {
        let name
        page.value = id
        switch(id) {
            case 1:
                name = 'lk'
                break
            case 2:
                name = 'grades'
                break
            case 3:
                name = 'payments'
                break
            case 4:
                name = 'hostel'
                break
        }
        console.log(name)
        router.push({
            name: name
        })
    }
    return {
        changePage, page
    }
}