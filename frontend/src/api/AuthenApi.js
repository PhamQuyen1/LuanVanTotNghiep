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

    refreshToken = () => {
        const url = 'api-public/v1/authentication/refreshToken';
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("userabv", user.refreshToken);
        return axiosClient.post(url, user.refreshToken);
    }
    forgotPassword = (data) => {
        const url = 'api-public/v1/forgotPassword';
        return axiosClient.post(url, data);
    }
    confirmForgotPassword = (data) => {
        const url = 'api-public/v1/confirmForgotPassword';
        return axiosClient.post(url, data);
    }
}

const authenApi = new AuthenApi();
export default authenApi;