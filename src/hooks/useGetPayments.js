import axios from "axios";
import {ref} from 'vue';
import { BASE_URL } from '../config'

export default function useGetPayments() {

    const getPayments = async (token) => {
        try {
            const response = await axios.get(BASE_URL + '/api/payments', {
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
            return e.message
        } 
    }

    const getPaymentsWithVk = async (vk_id, vk_sign) => {
        if(vk_id) {
            try {
                const response = await axios.get(BASE_URL + '/api/payments', {
                    params: {
                        vk_id: vk_id,
                        vk_sign: vk_sign
                    }
                });
                if(response.data.error) {
                    return await response.data.error
                } else {
                    return await response.data
                }
            } catch (e) {
                return e.message
            } 
        } else {
            throw new Error('Invalid data')
        }
    }

    return {
        getPayments, getPaymentsWithVk
    }
}