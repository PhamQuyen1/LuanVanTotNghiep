
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import reviewApi from '../../api/ReviewApi';
import '../../App.css';
import Pagination from '../../site/components/Pagination';
function Review() {

    const [reviews, setReviews] = useState([])
    const [filter, setFilter] = useState({
        page: 1,
    });
    const { productId } = useParams() || null;
    const [update, setUpdate] = useState(false)
    const handlePage = (action) => {
        console.log("action", action)
        if (action === "next") {
            setFilter({ ...filter, page: filter.page += 1 });
        }

        else {
            setFilter({ ...filter, page: filter.page -= 1 });
        }


    }

    const handleDeleteReview = (reviewId) => {
        console.log("rrrrrrrrrrrrrrrrrrrr", reviewId)
        reviewApi.deleteReview(reviewId).then(
            response => {
                toast.success("Xóa đánh giá thành công")
                setUpdate(!update)
            }, error => {
                toast.error("Xóa đánh giá thất bại")
            }
        )
    }
    console.log(filter)
    useEffect(() => {
        if (productId == null) {
            reviewApi.geAllReviews(filter).then(
                response => {
                    console.log("aaaaaaaaa", response);
                    setReviews(response);
                }, error => {
                    console.log("bbbbbbbbbbb", error);
                }
            )
        } else {
            const fetchProductReviews = async () => {
                try {
                    const response = await reviewApi.getProductReviews(productId, filter);
                    setReviews(response);
                    console.log("a", reviews);
                } catch (error) {
                    console.log(error);
                }
            }
            fetchProductReviews();
        }



    }, [filter, update, productId])
    return (
        <>

            <div className="page-header">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className="title ">
                            <h4>Quản lý đánh giá</h4>
                        </div>
                        <nav aria-label="breadcrumb" role="navigation">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item "><Link to={"/dashboard/home"}>Trang chủ </Link></li>
                                <li className="breadcrumb-item active" aria-current="page"> Quản lý đánh giá</li>
                            </ol>
                        </nav>
                    </div>

                </div>
            </div>
            <div className="card-box mb-30">
                <div className="pd-20">
                    <h4 className="text-blue h4 text-center">Danh sách đánh giá</h4>

                </div>
                <div className="pb-20">
                    <table className=" table stripe hover nowrap">
                        <thead>
                            <tr>
                                <th>Ngày</th>
                                <th>Khách hàng</th>
                                <th className="table-plus datatable-nosort">Sản phẩm</th>
                                <th className="table-plus datatable-nosort">Tên sản phẩm</th>
                                <th className="table-plus datatable-nosort">Điểm</th>
                                <th className="table-plus datatable-nosort">Đánh giá</th>

                                <th className="datatable-nosort text-center">Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reviews.reviews && reviews.reviews.map((review, index) => {
                                    return <tr key={index}>
                                        <td>{new Date(review.createAt).toISOString().replace('T', ' ').split(" ")[0]}</td>
                                        <td>{review.fullname}</td>
                                        <td className="table-plus"><img src={`/upload/${review.product.productImages[0].imageUrl}`} width="70" height="70" alt="" /></td>
                                        <td>{review.product.productName}</td>
                                        <td>
                                            {
                                                Array.apply(1, Array(5)).map((score, index) => {

                                                    return <i className={`icon-copy fa fa-star ${index + 1 <= review.reviewScore ? 'checked' : ''} `} aria-hidden="true"></i>
                                                })
                                            }
                                        </td>
                                        <td>{review.comment}</td>
                                        <td className="datatable-nosort text-center"><a data-rr-ui-dropdown-item="" class="dropdown-item" role="button" tabindex="0" onClick={() => handleDeleteReview(review.reviewId)}><i class="dw dw-delete-3"></i> Xóa</a></td>

                                    </tr>
                                })
                            }
                        </tbody>

                    </table>

                    {
                        reviews &&
                        (<Pagination page={filter.page} totalPage={reviews.totalPage
                        } handlePage={handlePage} />)
                    }

                </div>

            </div>


        </>
    );
}

export default Review;