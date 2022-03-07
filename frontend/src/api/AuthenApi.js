import axios from "axios";
import axiosClient from "./AxiosClient";

class AuthenApi {
    login = (username, password) => {
        const url = '/api-public/v1/authentication/signin';
        return axiosClient.post(url, {
            username: username,
            password: password
        })
    };

    register = (data) => {
        const url = 'api-public/v1/registration/register';
        return axiosClient.post(url, data);
    }

    confirmToken = (token) => {
        const url = 'api-public/v1/registration/confirm';
        return axiosClient.put(url, token);
    }
}

const authenApi = new AuthenApi();
export default authenApi;