import {  axiosClient ,axiosClientWithToken } from "./axiosClient";

const apiCategory = {
    showAllCategory: async (params) => {
        const res = await axiosClientWithToken.get('/admin/category', params)
        return res.data;
    },
    deleteCategory: async (params) => {
        const res = await axiosClientWithToken.delete(`/admin/category/${params.id}`)
        return res.data;
    },
    findCategoryById: async (id) => {
        const res = await axiosClientWithToken.get(`/admin/category/${id}`)
        return res.data;
    },
    insertCategory: async (params) => {
        const res = await axiosClientWithToken.post(`/admin/category`,params)
        return res.data;
    },
    updateCategory: async (params,id) => {
        const res = await axiosClientWithToken.put(`/admin/category/${id}`,params)
        return res.data;
    },

    showAllCategoryHeader: async (params) => {
        const res = await axiosClient.get('/category/parent', params)
        return res.data;
    }, 
}
export default apiCategory;