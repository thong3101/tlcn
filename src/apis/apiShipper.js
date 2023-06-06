
import { axiosClient, axiosClientWithToken } from "./axiosClient";


const apiShipper = {
    postRegister: async (params) => {
        const register = await axiosClient.post('/auth/register-shipper', params)
        return register.data
    },

    postLogin: async (params) => {
        const myLogin = await axiosClient.post('/auth/login', params)
        return myLogin.data;
    },

    getOrdersShipper: async (params) => {
        const res = await axiosClientWithToken.get('/shipper/order', params)
        return res.data;
    },
}

export default apiShipper;