import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import reviewApi from '../../api/ReviewApi';
import Pagination from './Pagination';
import '../../App.css';
function ReviewProduct(props) {
    const productId = props.productId;
    // const [param, setParam] = useState({
    //     page: 1
    // })
    const reviews = props.reviews;
    console.log("bb", reviews);
    // const [reviews, setReviews] = useState([]);
    const [addReviewRequest, setAddReviewRequest] = useState({});
    const handlePage = (action) => props.handlePage(action);

    // useEffect(() => {

    //     const fetchProductReviews = async () => {
    //         try {
    //             const response = await reviewApi.getProductReviews(productId, param);
    //             console.log(param);

    //             setReviews(response);
    //             console.log("a", reviews);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     // window.scrollTo(0, 0);
    //     fetchProductReviews();
    // }, []);


    const handleChangeRating = (e) => {
        console.log(e.target.value);
        setAddReviewRequest({ ...addReviewRequest, reviewScore: e.target.value });
    }

    const handleChangeComment = (e) => {
        setAddReviewRequest({ ...addReviewRequest, comment: e.target.value });
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        // const response = reviewApi.addReview(addReviewRequest);
        console.log(addReviewRequest);
        setAddReviewRequest({});
        document.getElementById('myTextarea').value = '';
    }
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
                                                    <div className="star"></div>
                                                    <div className="star"></div>
                                                    <div className="star"></div>
                                                    <div className="star"></div>
                                                    <div className="star"></div>
                                                    {
                                                        Array.apply(1, Array(5)).map((score, index) => {

                                                            return <div class={`fa fa-star ${index + 1 <= review.reviewScore ? 'checked' : ''} `} ></div>
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
                <form method="post" className="new-review-form" onSubmit={handleOnSubmit}>
                    <input type="hidden" name="review[rating]" value="3" />
                    <input type="hidden" name="product_id" />
                    <h3 className="spr-form-title">Write a review</h3>
                    <fieldset>
                        <div className="spr-form-review-rating">
                            <label className="spr-form-label">Your Rating</label>
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
                    <fieldset className="spr-form-contact">
                        <div className="spr-form-contact-name">
                            <input className="spr-form-input spr-form-input-text form-control" value="" placeholder="Enter your name" />
                        </div>
                        <div className="spr-form-contact-email">
                            <input className="spr-form-input spr-form-input-email form-control" value="" placeholder="Enter your email" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="spr-form-review-body">
                            <div className="spr-form-input">
                                <textarea id='myTextarea' className="spr-form-input-textarea" rows="10" placeholder="Write your comments here" value={addReviewRequest.comment} onChange={handleChangeComment}></textarea>
                            </div>
                        </div>
                    </fieldset>
                    <div className="submit">
                        <input type="submit" name="addComment" id="submitComment" className="btn btn-default" value="Submit Review" />
                    </div>
                </form>
            </div>
        </>
    );
}

export default ReviewProduct;