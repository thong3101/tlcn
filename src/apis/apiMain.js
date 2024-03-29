import axios from 'axios';
import queryString from 'query-string';


// create axiosProducts to test favorite product
// const baseURL='https://www.senki.me/api'
const baseURL='https://www.senki.me/api'

export const axiosProducts = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});


const apiMain = {

    ///authentication
    getProducts: async (params) => {
        const res = await axiosProducts.get('/product', {params})
        return res.data;
    },
}


export default apiMain;