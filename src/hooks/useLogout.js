import axios from "axios";
import {ref} from 'vue';
import { BASE_URL } from '../config'

export default function useLogout() {

    const logoutVk = async (vk_id, vk_sign) => {
        try {
            const response = await axios.POST(BASE_URL + '/api/logout', null, {
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
            return await e.message
        } 
    }

    return {
        logoutVk
    }

}