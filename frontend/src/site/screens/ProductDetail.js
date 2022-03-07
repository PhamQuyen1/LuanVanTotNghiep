import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
import ReactOwlCarousel from 'react-owl-carousel';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import productApi from '../../api/ProductApi';
import reviewApi from '../../api/ReviewApi';
import { addToCart } from '../components/action';
import ProductItem from '../components/ProductItem';
import ReviewProduct from '../components/ReviewProduct';
import SlideBar from '../components/SlideBar';

function ProductDetail() {
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [productRelates, setProductRelates] = useState([]);
    const { productId } = useParams();
    const [productImages, setProductImages] = useState([]);
    const history = useHistory();
    const [param, setParam] = useState({
        page: 1
    })
    let [quantityAddToCart, setQuantityAddToCart] = useState(1);
    const [reviews, setReviews] = useState([]);

    const dispatch = useDispatch();
    console.log("2", productImages);
    const handleSubmitAddToCart = (e) => {
        e.preventDefault();
        console.log("e", e);
        const payload = {
            product: product,
            quantity: quantityAddToCart
        }
        dispatch(addToCart(payload));
        setQuantityAddToCart(1);
        history.push("/shoppingCart");

    }
    const handlePage = (action) => {
        if (action === "next") {
            setParam({ ...param, page: reviews.currentPage += 1 }
            );
        }

        else {
            setParam({ ...param, page: reviews.currentPage -= 1 });
        }

        console.log(reviews);
    }

    useEffect(() => {
        const fecthProduct = async () => {
            try {
                const product = await productApi.getProductById(productId);
                console.log("1", product);
                setProduct(product);
                setProductImages(product.productImages);
                setCategory(product.category);
                const productRelate = await productApi.getProductWithCategory(product.category.categoryId);

                console.log("111", productRelate);


                setProductRelates(productRelate.filter(p => p.productId != product.productId));

            } catch (error) {
                console.log(error);
            }
        }
        const fetchProductReviews = async () => {
            try {
                const response = await reviewApi.getProductReviews(productId, param);
                console.log("param", param);

                setReviews(response);
                console.log("a", reviews);
            } catch (error) {
                console.log(error);
            }
        }
        window.scrollTo(0, 0);
        fecthProduct();
        fetchProductReviews();
    }, [productId])
    // setProductRelates(
    //     productRelates = productRelates.filter(product => product.productId != this.product.productId)
    // )
    // useEffect(() => {
    //     const fecthProductWithCategory = async () => {
    //         try {
    //             const response = await productApi.getProductWithCategory(category.categoryId);
    //             console.log("111", response);
    //             setProductRelates(response);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fecthProductWithCategory();
    // }, [])

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
    return (
        <>
            <div id="product-detail">
                <div className="main-content">
                    <div id="wrapper-site">
                        <div id="content-wrapper">
                            <div id="main">
                                <div className="page-home">


                                    <nav className="breadcrumb-bg">
                                        <div className="container no-index">
                                            <div className="breadcrumb">
                                                <ol>
                                                    <li>
                                                        <a href="#">
                                                            <span>Trang chủ</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <span>Sản phẩm</span>
                                                        </a>
                                                    </li>

                                                </ol>
                                            </div>
                                        </div>
                                    </nav>
                                    <div className="container">
                                        <div className="content">
                                            <div className="row">
                                                <SlideBar />
                                                <div className="col-sm-8 col-lg-9 col-md-9">
                                                    <div className="main-product-detail" id='main-product-detail'>
                                                        <h2>{product.productName}</h2>
                                                        <div className="product-single row">
                                                            <div className="product-detail col-xs-12 col-md-5 col-sm-5">
                                                                <div className="page-content" id="content">
                                                                    <div className="images-container">
                                                                        <div className="js-qv-mask mask tab-content border">
                                                                            {
                                                                                productImages.map((image, index) => {
                                                                                    return <div key={index} id={`item${index}`}
                                                                                        className="tab-pane fade"
                                                                                        className={`tab-pane fade ${(index == 0) ? "active in show" : ""}`}
                                                                                    >
                                                                                        <img src={`/upload/${image.imageUrl}`} alt="img" />
                                                                                    </div>
                                                                                })

                                                                            }
                                                                            <div className="layer hidden-sm-down" data-toggle="modal" data-target="#product-modal">
                                                                                <i className="fa fa-expand"></i>
                                                                            </div>

                                                                        </div>
                                                                        <ul className="product-tab nav nav-tabs d-flex" >
                                                                            {
                                                                                productImages.map((image, index) => {
                                                                                    // return <div key={index} id={`item${index + 1}`} className="tab-pane fade">
                                                                                    //     <img src={`/upload/${image.imageUrl}`} alt="img" />
                                                                                    // </div>
                                                                                    return <li
                                                                                        className={`${(index == 0) ? "active" : ""}`}
                                                                                        style={{ width: '85px' }}
                                                                                    >
                                                                                        <a href={`#item${index + 0}`} data-toggle="tab" aria-expanded="true"
                                                                                        // className={`${(index == 1) ? "active show" : ""}`}
                                                                                        >
                                                                                            <img src={`/upload/${image.imageUrl}`} alt="img" />
                                                                                        </a>
                                                                                    </li>
                                                                                })

                                                                            }
                                                                        </ul>
                                                                        <div className="modal fade" id="product-modal" role="dialog">
                                                                            <div className="modal-dialog">


                                                                                <div className="modal-content">
                                                                                    <div className="modal-header">
                                                                                        <div className="modal-body">
                                                                                            <div className="product-detail">
                                                                                                <div>
                                                                                                    <div className="images-container">
                                                                                                        <div className="js-qv-mask mask tab-content">

                                                                                                            {
                                                                                                                productImages.map((image, index) => {

                                                                                                                    return <div key={index} id={`modal-item${index}`}
                                                                                                                        className={`tab-pane fade ${(index == 0) ? "active in show" : ""}`}

                                                                                                                    >
                                                                                                                        <img src={`/upload/${image.imageUrl}`} alt="img" />
                                                                                                                    </div>
                                                                                                                })
                                                                                                            }
                                                                                                        </div>
                                                                                                        <ul className="product-tab nav nav-tabs">
                                                                                                            {
                                                                                                                productImages.map((image, index) => {
                                                                                                                    return <li className={`${(index == 0) ? "active" : ""}`}>

                                                                                                                        <a href={`#modal-item${index}`} data-toggle="tab" className={`${(index == 0) ? "active show" : ""}`}>
                                                                                                                            <img src={`/upload/${image.imageUrl}`} alt="img" />
                                                                                                                        </a>
                                                                                                                    </li>
                                                                                                                })
                                                                                                            }
                                                                                                        </ul>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="product-info col-xs-12 col-md-7 col-sm-7">
                                                                <div className="detail-description">
                                                                    <div className="price-del">
                                                                        <span className="price"><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
                                                                        <span className="float-right">
                                                                            <span className="availb">Còn hàng: </span>
                                                                            <span className="check">
                                                                                {/* <i className="fa fa-check-square-o" aria-hidden="true"></i>IN STOCK</span> */}
                                                                                {product && product.quantity} kg
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                    <div className="option has-border d-lg-flex size-color">
                                                                        {/* <!-- <div className="size">
                                                                            <span className="size">size :</span>
                                                                            <select>
                                                                                <option value="">Choose your size</option>
                                                                                <option value="">M</option>
                                                                                <option value="">l</option>
                                                                                <option value="">xl</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="colors">
                                                                            <b className="title">Color : </b>
                                                                            <span className="blue"></span>
                                                                            <span className="yellow"></span>
                                                                            <span className="pink"></span>
                                                                            <span className="green"></span>
                                                                            <span className="brown"></span>
                                                                            <span className="red"></span>
                                                                        </div> --> */}
                                                                    </div>
                                                                    <div className="has-border cart-area">
                                                                        <div className="product-quantity">
                                                                            <div className="qty">
                                                                                <div className="input-group">
                                                                                    <form onSubmit={handleSubmitAddToCart}>
                                                                                        <div className="quantity">
                                                                                            <span className="control-label">QTY : </span>
                                                                                            <input type="text" name="qty" id="quantity_wanted" value={quantityAddToCart} onChange={(e) => setQuantityAddToCart(e.target.value)} className="input-group form-control" />
                                                                                            <span className="input-group-btn-vertical">
                                                                                                <button className="btn btn-touchspin js-touchspin bootstrap-touchspin-up" type="button" onClick={() => setQuantityAddToCart(quantityAddToCart += 1)}>
                                                                                                    +
                                                                                                </button>
                                                                                                <button className="btn btn-touchspin js-touchspin bootstrap-touchspin-down" type="button" onClick={() => setQuantityAddToCart(quantityAddToCart -= 1)}>
                                                                                                    -
                                                                                                </button>
                                                                                            </span>
                                                                                        </div>


                                                                                        <span className="add">
                                                                                            <button className="btn btn-primary add-to-cart add-item" data-button-action="add-to-cart" type="submit">
                                                                                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                                                                                <span>Add to cart</span>
                                                                                            </button>
                                                                                            <a className="addToWishlist" href="#">
                                                                                                <i className="fa fa-heart" aria-hidden="true"></i>
                                                                                            </a>
                                                                                        </span>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="clearfix"></div>
                                                                        <p className="product-minimal-quantity">
                                                                        </p>
                                                                    </div>

                                                                    <div className="rating-comment has-border d-flex">
                                                                        <div className="review-description d-flex">
                                                                            <span>Đánh giá :</span>
                                                                            {/* <!-- <div className="rating">
                                                                                <div className="star-content">
                                                                                    <div className="star"></div>
                                                                                    <div className="star"></div>
                                                                                    <div className="star"></div>
                                                                                    <div className="star"></div>
                                                                                    <div className="star"></div>
                                                                                </div>
                                                                            </div> --> */}
                                                                        </div>
                                                                        <div className="read after-has-border">
                                                                            <a href="#review">
                                                                                <i className="fa fa-commenting-o color" aria-hidden="true"></i>
                                                                                <span>READ REVIEWS (3)</span>
                                                                            </a>
                                                                        </div>
                                                                        <div className="apen after-has-border">
                                                                            <a href="#review">
                                                                                <i className="fa fa-pencil color" aria-hidden="true"></i>
                                                                                <span>WRITE A REVIEW</span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">

                                                                        <p>Categories :
                                                                            <span className="content2">
                                                                                <Link to={`/category/${category.categoryId}`}>{category.categoryName}</Link>
                                                                                {/* <a href="#">Men's Jackets</a> */}
                                                                            </span>
                                                                        </p>
                                                                        {/* <p>tags :
                                                                            <span className="content2">
                                                                                <a href="#">Jacket</a>,
                                                                                <a href="#">Overcoat</a>,
                                                                                <a href="#">Luxury</a>,
                                                                                <a href="#">men</a>,
                                                                                <a href="#">summer</a>,
                                                                                <a href="#">autumn</a>
                                                                            </span>
                                                                        </p> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="review">
                                                            <ul className="nav nav-tabs">
                                                                <li className="active">
                                                                    <a data-toggle="tab" href="#description" className="active show">Description</a>
                                                                </li>

                                                                <li>
                                                                    <a data-toggle="tab" href="#review">Reviews (2)</a>
                                                                </li>
                                                            </ul>

                                                            <div className="tab-content">
                                                                <div id="description" className="tab-pane fade in active show">
                                                                    <p>{product.description}
                                                                    </p>

                                                                </div>


                                                                {
                                                                    reviews && (
                                                                        <ReviewProduct reviews={reviews} handlePage={handlePage} />
                                                                    )
                                                                }

                                                            </div >

                                                        </div >
                                                        < div className="related" >
                                                            <div className="title-tab-content  text-center">
                                                                <div className="title-product justify-content-start">
                                                                    <h2>Sản phẩm liên quan</h2>
                                                                </div>
                                                            </div>
                                                            <div className="tab-content">
                                                                <div className="row">

                                                                    {
                                                                        productRelates.map(product => {
                                                                            return <ProductItem product={product} key={product.productId} />
                                                                        })

                                                                    }

                                                                    {/* {

                                                                    productRelates.length &&
                                                                    (<ReactOwlCarousel className='owl-theme tab-content' loop margin={3} items={3} dots={false}>
                                                                        {productRelates.map(product => {
                                                                            return <ProductItem product={product} key={product.productId} />
                                                                        }
                                                                        )}
                                                                    </ReactOwlCarousel>
                                                                    )
                                                                } */}
                                                                </div>
                                                            </div>
                                                        </div >
                                                    </div >
                                                </div >
                                            </div >
                                        </div >
                                    </div >
                                </div >
                            </div >
                        </div >
                    </div >
                </div >
            </div >

        </>
    );
}

export default ProductDetail;