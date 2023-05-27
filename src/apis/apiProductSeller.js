import {
  axiosClient,
  axiosClientWithFile,
  axiosClientWithToken,
} from "./axiosClient";

const apiProductSeller = {
  getSellerProduct: async (params) => {
    const res = await axiosClientWithToken.get(`/seller/product`, { params });
    return res.data;
  },

  insertProductSeller: async (params) => {
    const res = await axiosClientWithToken.post(`/seller/product`, params);
    return res.data;
  },

  updateProduct: async (params, id) => {
    const res = await axiosClientWithToken.put(`/seller/product/${id}`, params);
    return res.data;
  },

  showCategory: async (params) => {
    const res = await axiosClient.get("/category", params);
    return res.data;
  },
};

export default apiProductSeller;
