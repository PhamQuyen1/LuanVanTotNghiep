import axios from "axios";
import authHeader from "./AuthHeader";
import axiosClient from "./AxiosClient"


class UserApi {

    updatePassword = (data) => {
        const url = 'api/v1/user/updatePassword';
        return axiosClient.put(url, data, { headers: authHeader() });
    }

    updateInfo = (data) => {
        const url = 'api/v1/user/updateInfo';
        return axiosClient.put(url, data, { headers: authHeader() });
    }

    listAll = (params) => {
        const url = 'api/v1/user';
        return axiosClient.get(url, { params, headers: authHeader() });
    }

    modifiedUser = (data) => {
        const url = 'api/v1/user/modifiedInfo';
        return axiosClient.put(url, data, { headers: authHeader() });
    }

    getWishList = () => {
        const url = 'api/v1/wishList';
        return axiosClient.get(url, { headers: authHeader() });
    }

    addWishList = (productId) => {
        const url = `api/v1/wishList?productId=${productId}`;
        return axiosClient.post(url, { headers: authHeader() });
    }
    deleteWishList = (productId) => {
        const url = `api/v1/wishList?productId=${productId}`;
        return axiosClient.delete(url, { headers: authHeader() });
    }

}

const userApi = new UserApi();

export default userApi;