
import { axiosClient, axiosClientWithToken} from "./axiosClient";

const apiComment = {

    getAllComment: async (id,params) => {
        const res = await axiosClient.get(`/rating/${id}/product`,params)
        return res.data;
    },

    getSaveComment: async (id,params) => {
        const res = await axiosClientWithToken.post(`/rating/${id}`,params)
        return res.data;
    },
    
}
export default apiComment;