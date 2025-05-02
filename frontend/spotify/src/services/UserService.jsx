import api from "../api/axios";
import { apiRequest } from "../api/ApiRequest";

const UserService = {
    checkUserStatus : async ($id) => {
        return await apiRequest (() => {
            return api.get(`users/$id/`);
        });
    },
}

export default UserService;