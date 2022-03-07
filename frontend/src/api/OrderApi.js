import axios from "axios";
import authHeader from "./AuthHeader";
import axiosClient from "./AxiosClient";

class OrderApi {
    listAll = (params) => {
        const url = '/api/v1/order';
        axiosClient.get(url, { params, headers: authHeader() });
    }
}

const orderApi = new OrderApi();
export default orderApi;