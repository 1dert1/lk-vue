import axios from "axios";
import {ref} from 'vue';

const email = ref('')
const password = ref('')
const token = ref('')
const isAuth = ref(false)

export default function useAuth() {

    const auth = async (email, password) => {
        try {
            const response = await axios.post('https:/mxakep.ml/api/login', null, {
                params: {
                    email: email,
                    password: password
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

    return {
        email, password, auth, token, isAuth
    }
}