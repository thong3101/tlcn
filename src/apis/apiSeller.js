
import { axiosClient, axiosClientWithToken } from "./axiosClient";


const apiSeller = {
    EnableProduct: async (id, params) => {
        const res = await axiosClientWithToken.patch(`/seller/prodcut/enable/${id}`,params);
        return res.data;
    },

    DisableProduct: async (id, params) => {
        const res = await axiosClientWithToken.patch(`/seller/prodcut/disable/${id}`,params);
        return res.data;
    },

    CreateLicense: async (params) => {
        const res = await axiosClientWithToken.get(`/license`,params);
        return res.data;
    },
}

export default apiSeller;