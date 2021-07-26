import axios from "axios";
import {ref} from 'vue';
import { BASE_URL } from '../config'

export default function useGetGrades() {

    const getGrades = async (token) => {
        try {
            const response = await axios.get(BASE_URL + '/api/grades', {
                params: {
                    token: token
                }
            });
            if(response.data.error) {
                return await response.data.error
            } else {
                return JSON.parse(await response.data)
            }
        } catch (e) {
            return e.message
        } 
    }

    const getGradesWithVk = async (vk_id, vk_sign) => {
        try {
            const response = await axios.get(BASE_URL + '/api/grades', {
                params: {
                    vk_id: vk_id,
                    vk_sign: vk_sign
                }
            });
            if(response.data.error) {
                return await response.data.error
            } else {
                return JSON.parse(await response.data)
            }
        } catch (e) {
            return e.message
        } 
    }

    return {
        getGrades, getGradesWithVk
    }
}