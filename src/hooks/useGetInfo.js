import axios from "axios"
import { BASE_URL } from '../config'

export default function useGetInfo() {

    const getInfo = async (token) => {
        try {
            const response = await axios.get(BASE_URL + '/api/info', {
                params: {
                    token: token
                }
            });
            if(response.data.error) {
                return await response.data.error
            } else {
                return await response.data
            }
        } catch (e) {
            return await e.message
        } 
    }

    const getInfoWithVk = async (vk_id, vk_token) => {
        try {
            const response = await axios.get(BASE_URL + '/api/info', {
                params: {
                    vk_id: vk_id,
                    vk_token: vk_token
                }
            });
            if(response.data.error) {
                return await response.data.error
            } else {
                return await response.data
            }
        } catch (e) {
            return await e.message
        } 
    }

    return {
        getInfo, getInfoWithVk
    }
}