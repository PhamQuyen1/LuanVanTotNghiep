import axios from "axios";
import authHeader from "./AuthHeader";
import axiosClient from "./AxiosClient";

class OrderApi {
    listAll = (params) => {
        const url = '/api/v1/order';
        console.log("authHeader", authHeader());
        return axiosClient.get(url, { params, headers: authHeader() });
    }

    createOrder = data => {
        const url = '/api/v1/order';
        return axiosClient.post(url, data, { headers: authHeader() });
    }

    changeOrderStatus = (params) => {
        const url = `/api/v1/order?orderId=${params.orderId}&status=${params.status}`;
        return axiosClient.put(url, { headers: authHeader() });
    }

    getReport = () => {
        const url = `/api/v1/report/public?label=month`;
        return axiosClient.get(url, { headers: authHeader() });
    }
    getInfo = () => {
        const url = `/api/v1/report/public/info`;
        return axiosClient.get(url, { headers: authHeader() });
    }

    payMomo = () => {
        const url = "/v2/gateway/api/create";
        return axiosClient.post(url, {
            partnerCode: "MOMOEB6P20220521",
        }, {
            baseURL: "https://test-payment.momo.vn",
            'Access-Control-Allow-Origin': 'https://test-payment.momo.vn',
        });
    }
}

const orderApi = new OrderApi();
export default orderApi;