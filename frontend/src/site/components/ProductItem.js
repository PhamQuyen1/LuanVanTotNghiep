import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
import { useDispatch } from 'react-redux';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { useHistory, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import reviewApi from '../../api/ReviewApi';
import '../../App.css';
import { addToCart } from './action';

function ProductItem(props) {

    let history = useHistory();

    const [product, setProduct] = useState(props.product);
    const [check, setCheck] = useState(props.check);
    const [reviewScore, setReviewScore] = useState(0);
    const dispatch = useDispatch();

    // console.log("ddispatch", dispatch);

    function handleAddToCart(product) {
        console.log("product", product);
        const payload = {
            product: product,
            quantity: 1
        }
        dispatch(addToCart(payload));
        history.push("/shoppingCart");
        console.log("dispatch", dispatch);

    };
    useEffect(() => {
        const fetchReviewScore = async () => {
            try {
                const response = await reviewApi.getReviewScore(product.productId);

                setReviewScore(response);

            } catch (error) {
                console.log(error);
            }
        }

        fetchReviewScore();
    }, []);
    return (
        <>
            <div
                // className="item text-center col-md-4"
                className={`${check ? "item col-md-12" : "item text-center col-md-4"}`}>
                <div
                    // className="product-miniature js-product-miniature item-one first-item"
                    className={`${check ? "product-miniature item-one first-item d-flex" : "product-miniature js-product-miniature item-one first-item"}`}
                >
                    <div className="thumbnail-container border" >
                        <Link to={`/product/${product.productId}`}>
                            <img className="img-fluid image-cover"
                                src={`/upload/${product.productImages[0].imageUrl}`}
                                alt="img" width={'253px'} height={'253px'} />
                            <img className="img-fluid image-secondary" src={`/upload/${product.productImages[0].imageUrl}`} alt="img" />
                            {/* {
                                product.productImages.map(image => {
                                    return <img className="img-fluid image-cover" src={`upload /${image.imageUrl}`} alt="img" />
                                })
                            } */}
                        </Link>
                        {!check &&

                            (<div className="highlighted-informations">

                            </div>)
                        }

                    </div>
                    <div className="product-description">
                        <div className="product-groups">
                            <div className="product-title">
                                <Link to={`/product-detail/${product.productId}`}>{product.productName}</Link>

                            </div>
                            <div className="rating">
                                <div className="star-content">
                                    {/* <div className="star"></div>
                                    <div className="star"></div>
                                    <div className="star"></div>
                                    <div className="star"></div>
                                    <div className="star"></div> */}

                                    {
                                        Array.apply(1, Array(5)).map((score, index) => {

                                            return <span class={`fa fa-star ${index + 1 <= reviewScore ? 'checked' : ''} `} ></span>
                                        })
                                    }
                                    {/* <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span> */}
                                </div>
                            </div>
                            <div className="product-group-price">
                                {
                                    product.discount != 0 && (
                                        <div className="product-price-and-shipping">
                                            <del><span className=""><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span></del>
                                        </div>
                                    )
                                }

                                <div className="product-price-and-shipping">
                                    <span className="price"><NumberFormat value={product.discount != 0 ? product.price - product.price * product.discount / 100 : product.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
                                </div>
                            </div>
                        </div>
                        {
                            !check &&
                            (<div className="product-buttons d-flex justify-content-center">
                                <span className="quick-view hidden-sm-down" onClick={() => handleAddToCart(product)}> <i className="fa fa-shopping-cart" aria-hidden="true"></i></span>
                                {/* <form action="#" method="post" className="formAddToCart">
                                    <input type="hidden" name="id_product" value="1" />
                                    <a className="add-to-cart" href="#" data-button-action="add-to-cart">
                                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                    </a>
                                </form> */}

                                <a href="#" className="quick-view hidden-sm-down" data-link-action="quickview">
                                    <i className="fa fa-eye" aria-hidden="true"></i>
                                </a>
                            </div>)}
                    </div>
                </div>
            </div>

        </>
    );
}

export default ProductItem;