import axios from "axios";
import {ref} from 'vue';


export default function useGetGrades() {

    const getGrades = async (token) => {
        try {
            const response = await axios.get('https:/mxakep.ml/api/grades', {
                params: {
                    token: token
                }
            });
            if(response.data.error) {
                return await axios.response.data.error
            } else {
                return await response.data
            }
        } catch (e) {
            return e.message
        } 
    }

    return {
        getGrades
    }
}