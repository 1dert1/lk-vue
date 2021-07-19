import axios from "axios";
import {ref} from 'vue';

const years = ref([])
const GPAYears = ref([])
const lastYear = ref('')

const semesters = ref([])
const GPASemesters = ref([])
const lastSemester = ref('')


export default function useValidateGrades() {

    const validateGrades = (grades) => {
        try {
            
        } catch (e) {
            return e.message
        } 
    }

    return {
        getGrades
    }
}