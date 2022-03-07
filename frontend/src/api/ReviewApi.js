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

    addReview = (data) => {
        const url = `/api/v1/review/public`;
        return axiosClient.post(url, { data });
    }
}
const reviewApi = new ReviewApi();
export default reviewApi; 