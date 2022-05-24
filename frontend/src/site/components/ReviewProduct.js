import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import reviewApi from '../../api/ReviewApi';
import Pagination from './Pagination';
import '../../App.css';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
function ReviewProduct(props) {
    const productId = props.productId;
    const reviews = props.reviews;
    const checkReview = props.checkReview;
    const user = useSelector(state => state.todoUser) || [];
    console.log("user", user);
    console.log("productId", +productId);
    console.log("bb", checkReview);
    const history = useHistory()
    const [addReviewRequest, setAddReviewRequest] = useState({
        reviewScore: 5,
        comment: null
    });
    const handlePage = (action) => props.handlePage(action);
    const handleChangeRating = (e) => {
        console.log(e.target.value);
        setAddReviewRequest({ ...addReviewRequest, reviewScore: e.target.value });
    }

    const handleChangeComment = (e) => {
        setAddReviewRequest({ ...addReviewRequest, comment: e.target.value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log(addReviewRequest);
        setAddReviewRequest({});
        document.getElementById('myTextarea').value = '';

        const reviewRequest = {
            productId: +productId,
            comment: addReviewRequest.comment,
            reviewScore: +addReviewRequest.reviewScore
        }
        console.log(reviewRequest);
        const response = await reviewApi.addReview(reviewRequest);
        toast.success("Bạn đã đánh giá sản phẩm");
        props.handleAddReview();
        // return <Redirect to={`product/${productId}`} />
        // history.push(`/product/${productId}`)
    }
    // console.log(addReviewSuccess, "aaaaaaaaa")
    // useEffect(() => {
    //     window.scroll(0, 0);
    // }, [addReviewSuccess])
    return (
        <>
            <div id="review" className=" tab-pane fade">
                <div className="spr-form">
                    <div className="user-comment">
                        {reviews.reviews &&
                            (
                                reviews.reviews.map(review => {
                                    return <div className="spr-review">
                                        <div className="spr-review-header">
                                            <span className="spr-review-header-byline">
                                                <strong>{review.fullname}</strong> <span> - </span>
                                                <span>{new Date(review.createAt).toISOString().replace('T', ' ').split(".")[0]}</span>

                                                {/* <span>{Date.now().toLocaleString()}</span>
                                                <span>{new Intl.DateTimeFormat("en-GB", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "2-digit"
                                                }).format(review.fullname)}</span> */}
                                            </span>
                                            <div className="rating">
                                                <div className="star-content">

                                                    {
                                                        Array.apply(1, Array(5)).map((score, index) => {

                                                            return <div key={index} className={`fa fa-star ${index + 1 <= review.reviewScore ? 'checked' : ''} `} ></div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="spr-review-content">
                                            <p className="spr-review-content-body">{review.comment}</p>
                                        </div>
                                    </div>
                                })
                            )
                        }

                    </div>
                </div>

                <Pagination page={reviews.currentPage} totalPage={reviews.totalPage} handlePage={handlePage} />

                {
                    (user.user != null && checkReview) && (
                        <form className="new-review-form" onSubmit={handleOnSubmit}>
                            <input type="hidden" name="review[rating]" value="3" />
                            <input type="hidden" name="product_id" />
                            <h3 className="spr-form-title">Viết đánh giá</h3>
                            <fieldset>
                                <div className="spr-form-review-rating">
                                    <label className="spr-form-label">Số điểm</label>
                                    <fieldset className="ratings">
                                        <input type="radio" id="star5" name="rating" value="5" onChange={handleChangeRating} checked={addReviewRequest.reviewScore == 5} />
                                        <label className="full" for="star5" title="Awesome - 5 stars"></label>

                                        <input type="radio" id="star4" name="rating" value="4" onChange={handleChangeRating} checked={addReviewRequest.reviewScore == 4} />
                                        <label className="full" for="star4" title="Pretty good - 4 stars"></label>

                                        <input type="radio" id="star3" name="rating" value="3" onChange={handleChangeRating} checked={addReviewRequest.reviewScore == 3} />
                                        <label className="full" for="star3" title="Meh - 3 stars"></label>

                                        <input type="radio" id="star2" name="rating" value="2" onChange={handleChangeRating} checked={addReviewRequest.reviewScore == 2} />
                                        <label className="full" for="star2" title="Kinda bad - 2 stars"></label>

                                        <input type="radio" id="star1" name="rating" value="1" onChange={handleChangeRating} checked={addReviewRequest.reviewScore == 1} />
                                        <label className="full" for="star1" title="Sucks big time - 1 star"></label>

                                    </fieldset>
                                </div>
                            </fieldset>

                            <fieldset>
                                <div className="spr-form-review-body">
                                    <div className="spr-form-input">
                                        <textarea id='myTextarea' required className="spr-form-input-textarea" rows="10" placeholder="Đánh giá của bạn về sản phẩm" value={addReviewRequest.comment} onChange={handleChangeComment}></textarea>
                                    </div>
                                </div>
                            </fieldset>
                            <div className="submit">
                                <input type="submit" name="addComment" id="submitComment" className="btn btn-default" value="Submit Review" />
                            </div>
                        </form>
                    )
                }

            </div>
        </>
    );
}

export default ReviewProduct;