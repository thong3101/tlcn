import { axiosClient, axiosClientWithToken } from "./axiosClient";

const apiProduct = {
  getProductsById: async (id) => {
    const res = await axiosClient.get(`/product/${id}`);
    return res.data;
  },
  getProductsBySlug: async (slug) => {
    const res = await axiosClient.get("/products", { params: { slug } });
    return res.data;
  },
  getProducts: async (params) => {
    const res = await axiosClient.get("/products", { params });
    return res.data;
  },
  getCategoryFilterById: async (params) => {
    const res = await axiosClient.get("/categories", { params });
    return res.data;
  },

  getProductsByCateId: async (params, id) => {
    const res = await axiosClient.get(`/product/${id}/category/`, { params });
    return res.data;
  },

  getProductsSearch: async (params, key) => {
    const res = await axiosClient.get(`/product/search/${key}`, { params });
    return res.data;
  },

  getAllComment: async (id, params) => {
    const res = await axiosClient.get(`/rating/${id}/product`, params);
    return res.data;
  },

  getAllProduct: async (params) => {
    const res = await axiosClient.get(`/product`, { params });
    return res.data;
  },

  insertProduct: async (params) => {
    const res = await axiosClientWithToken.post(`/admin/product`, params);
    return res.data;
  },

  updateProduct: async (params,id) => {
    const res = await axiosClientWithToken.post(`/admin/product/${id}`, params);
    return res.data;
  },

  uploadImg: async (params,id) => {
    const res = await axiosClientWithToken.post(`/admin/product/upload/${id}`, params);
    return res.data;
  },
};
export default apiProduct;
