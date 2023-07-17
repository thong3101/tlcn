
import { axiosClient, axiosClientWithToken } from "./axiosClient";


const apiAdmin = {
    EnableProduct: async (id, params) => {
        const res = await axiosClientWithToken.patch(`/admin/product/enable/${id}`,params);
        return res.data;
    },

    DisableProduct: async (id, params) => {
        const res = await axiosClientWithToken.patch(`/admin/product/disable/${id}`,params);
        return res.data;
    },

    EnableUser: async (id, params) => {
        const res = await axiosClientWithToken.patch(`/admin/user/enable/${id}`,params);
        return res.data;
    },

    DisableUser: async (id, params) => {
        const res = await axiosClientWithToken.patch(`/admin/user/disable/${id}`,params);
        return res.data;
    },
}

export default apiAdmin;