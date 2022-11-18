
import { axiosClient, axiosInstance } from "./axiosClient";

const apiProduct = {

    getProductsById: async (id) => {
        const res = await axiosClient.get(`/product/${id}`)
        return res.data;
    },
    getProductsBySlug: async (slug) => {
        const res = await axiosClient.get('/products', { params: { slug } })
        return res.data;
    },
    getProducts: async (params) => {
        const res = await axiosClient.get('/products', { params })
        return res.data;
    },
    getCategoryFilterById: async (params) => {
        const res = await axiosClient.get('/categories', { params })
        return res.data;
    },

    getProductsBySearch: async (params) => {
        const res = await axiosClient.get('/products' + params)
        return res.data
    },

    getProductsByCateId: async (params) => {
        const res = await axiosClient.get(`/product/product-category/${params.id}`, {params})
        return res.data
    }

}
export default apiProduct;