import authHeader from "./AuthHeader";
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

    getCategoryById = (categoryId) => {
        const url = `/api/v1/category/${categoryId}`;
        return axiosClient.get(url, { headers: authHeader() });
    }
    updateCategory = (data) => {
        const url = `/api/v1/category`;
        return axiosClient.put(url, data, { headers: authHeader(), "Content-Type": "multipart/form-data" });
    }

    addCategory = (data) => {
        const url = `/api/v1/category`;
        return axiosClient.post(url, data, { headers: authHeader(), "Content-Type": "multipart/form-data" });
    }

    deleteCategory = (categoryId) => {
        const url = `/api/v1/category/${categoryId}`;
        return axiosClient.delete(url, { headers: authHeader() });
    }
}
const categoryApi = new CategoryApi();
export default categoryApi;