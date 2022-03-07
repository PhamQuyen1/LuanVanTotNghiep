import axiosClient from "./AxiosClient";

class CategoryApi {
    getAll = () => {
        const url = '/api/v1/category/public';
        return axiosClient.get(url);
    };

    getCategoryProducQuantity = () => {
        const url = '/api/v1/category/public/categoryAndQuantity';
        return axiosClient.get(url);
    };
}
const categoryApi = new CategoryApi();
export default categoryApi;