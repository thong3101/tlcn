import {  axiosClientWithToken} from "./axiosClient";

const apiProfile = {

    ///authentication
    putChangeEmail: async (params) => {
        const res = await axiosClientWithToken.patch('/user/profile/changeEmail', params)
        return res.data;
    },
    putChangePassword: async (params) => {
        const res = await axiosClientWithToken.patch('/user/profile/changePassword', params)
        return res.data;
    },
    putUploadAvatar: async (params) => {
        const res = await axiosClientWithToken.post('/user/profile/uploadAvatar', params,{headers: {
            'Content-Type': 'multipart/form-data'
          }})
        return res.data;
    },
    putChangeInfo: async (params) => {
        const res = await axiosClientWithToken.patch('/user/profile/changeInfo', params)
        return res.data;
    },
    getUserbyID: async (params) => {
        const res = await axiosClientWithToken.get(`/user/${params}`)
        return res.data;
    },
    getUserProfile: async () => {
        const res = await axiosClientWithToken.get(`/user/profile`)
        return res.data;
    },
    putChangePhone: async (params) => {
        const res = await axiosClientWithToken.patch('/user/profile/changePhone', params)
        return res.data;
    },

    getAllUser: async (params) => {
        const res = await axiosClientWithToken.get('admin/user', params)
        return res.data;
    },

    deleteUser: async (id) => {
        const res = await axiosClientWithToken.delete(`/admin/user/${id}`)
        return res.data;
    },
    

}
    
export default apiProfile;