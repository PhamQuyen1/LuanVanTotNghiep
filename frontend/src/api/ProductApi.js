import axiosClient from "./AxiosClient";

class ProductApi {

    // getAll = (params) => {
    //     const url = '/api/v1/product/public';
    //     return axiosClient.get(url, { params });
    // }

    getAll = (body) => {
        const url = '/api/v1/product/public';
        return axiosClient.post(url, body);
    }

    getProductById = (productId) => {
        const url = `/api/v1/product/public/${productId}`;
        return axiosClient.get(url);
    }

    getProductWithCategory = (categoryId) => {
        const url = `/api/v1/product/public/list/${categoryId}`;
        return axiosClient.get(url);
    }

    getTopSaleProducts = () => {
        const url = '/api/v1/product/public/topSaleProduct';
        return axiosClient.get(url);
    }

    getTopReviewProducts = () => {
        const url = '/api/v1/review/public/topReviewProduct';
        return axiosClient.get(url);
    }

}
const productApi = new ProductApi();
export default productApi;