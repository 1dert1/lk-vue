import axios from "axios";
import {ref} from 'vue';
import { BASE_URL } from '../config'
const input = ref('')
const password = ref('')
const token = ref('')
const isAuth = ref(false)
const vk_id = ref('')
const vk_sign = ref('')

export default function useAuth() {

    const auth = async (input, password, vk_id, vk_sign) => {
        try {
            const response = await axios.post(BASE_URL + '/api/login', null, {
                params: {
                    input: input,
                    password: password,
                    vk_id: vk_id,
                    vk_sign: vk_sign
                }
            });
            if(response.data.error) {
                token.value = response.data
            } else {
                token.value = await response.data['token']
                isAuth.value = true
            }
        } catch (e) {
            token.value = e.message
        } 
    }

    const authWithVk = async (vk_id, vk_sign) => {
        try {
            const response = await axios.post(BASE_URL + '/api/login', null, {
                params: {
                    vk_id: vk_id,
                    vk_sign: vk_sign
                }
            });
            if(!response.data.error) {
                token.value = await response.data['token']
                isAuth.value = true
            }
        } catch (e) {
            token.value = e.message
        } 
    }

    return {
        input, password, vk_id, vk_sign, auth, authWithVk, token, isAuth
    }
}