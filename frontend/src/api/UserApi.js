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

}

const userApi = new UserApi();

export default userApi;