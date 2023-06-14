import axios from 'axios';
import queryString from 'query-string';



const baseURL='localhost:5000'
const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});


const apiChat = {
    postChatbox: async (params) => {
        const res = await axiosClient.post('/predict', params)
        return res.data;
    },
}

export default apiChat;