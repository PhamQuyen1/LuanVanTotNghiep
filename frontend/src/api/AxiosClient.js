
import axios from 'axios';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { login, logout } from '../site/components/action/auth';
import authenApi from './AuthenApi';
import authHeader from './AuthHeader';
import store from '../site/components/store'
const { dispatch } = store;

const axiosClient = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        // if (response.data.accessToken) {
        //     localStorage.setItem("user", JSON.stringify(response.data));
        //   }
        return response.data;
    }
    return response;
}, async (error) => {

    const originalConfig = error.config;
    if (error.response) {
        // Access Token was expired
        if (error.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            try {
                const rs = await authenApi.refreshToken();
                console.log("response", rs);
                const { accessToken, refreshToken } = rs;
                const user = JSON.parse(localStorage.getItem("user"));
                user.accessToken = accessToken;
                user.refreshToken = refreshToken;
                localStorage.setItem("user", JSON.stringify(user));
                const { config: oldRequest } = error;
                // axiosClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                console.log("old", user.accessToken);
                console.log("new", accessToken);
                // return axiosClient(originalConfig);
                return axiosClient.request({ ...oldRequest, headers: authHeader() });
            } catch (_error) {
                // if (_error.response && _error.response.data) {
                //     console.log("1", _error);
                //     return Promise.reject(_error.response.data);
                // }
                console.log("2", _error);
                // return Promise.reject(_error);
                dispatch(logout());
            }
        }
        // Handle errors
        throw error;
    }
});
export default axiosClient;