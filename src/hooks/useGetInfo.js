import axios from "axios"

export default function useGetInfo() {

    const getInfo = async (token) => {
        try {
            const response = await axios.get('https://mxakep.ml/api/info', {
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

    return {
        getInfo
    }
}