import authHeader from "./AuthHeader";
import axiosClient from "./AxiosClient";


class ReviewApi {
    getReviewScore = (productId) => {

        const url = `api/v1/review/public/score/${productId}`;
        return axiosClient.get(url);
    }

    getProductReviews = (productId, params) => {
        const url = `/api/v1/review/public/${productId}`;
        return axiosClient.get(url, { params });
    }

    geAllReviews = (filter) => {
        const url = `/api/v1/review/public?page=${filter.page}`;
        return axiosClient.get(url);
    }

    addReview = (data) => {
        const url = `/api/v1/review`;
        return axiosClient.post(url, data);
    }

    deleteReview = (reviewId) => {
        const url = `/api/v1/review/${reviewId}`;
        return axiosClient.delete(url, { headers: authHeader() });
    }


    checkUserBuyProduct = (productId) => {
        const url = `/api/v1/review/check`;
        return axiosClient.get(url, {
            params: {
                productId: productId
            },
            headers: authHeader()
        });
    }
}
const reviewApi = new ReviewApi();
export default reviewApi; 