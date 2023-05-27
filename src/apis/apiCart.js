import axios from 'axios';
import queryString from 'query-string';

import {  axiosClientWithToken} from "./axiosClient";

export const axiosClientWithPayment = axios.create({
    baseURL: 'https://mypayment-momo.herokuapp.com/api',
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});

const apiCart = {

    getOrdersById: async (id,params) => {
        const res = await axiosClientWithToken.get(`/order/${id}`,params)
        return res.data;
    },

    getOrders: async (params) => {
        const res = await axiosClientWithToken.get('/user/profile/orderList', {params})
        return res.data;
    },
    saveOrderCOD: async (params) => {
        const res = await axiosClientWithToken.post('/order/cod',params)
        return res.data;
    },

    saveOrderPayPal: async (params) => {
        const res = await axiosClientWithToken.post('/order/paypal',params)
        return res.data;
    },
    
    changeTypeOrder: async (params, id) => {
        const res = await axiosClientWithToken.patch(`/admin/order/${id}`,params)
        return res.data;
    },

    getOrdersByIdAmin: async (id,params) => {
        const res = await axiosClientWithToken.get(`/admin/order/${id}`,params)
        return res.data;
    },
    
    makePaymentMomo: async (params) => {
        const res = await axiosClientWithPayment.post('/create-payment',params)
        return res.data;
    },
    makePaymentPaypal:async(id)=>{
        const res = await axiosClientWithToken.post(`/order/paypal/${id}`)
        return res.data;
    },


    getOrdersAdmin: async (params) => {
        const res = await axiosClientWithToken.get('/admin/order', params)
        return res.data;
    },

    getOrdersSeller: async (params) => {
        const res = await axiosClientWithToken.get('/seller/product/order', params)
        return res.data;
    },

    

    
}
export default apiCart;