import React from 'react';
import ReactDOM from 'react-dom';

function Item() {
    return (
        <>
            <div className="item text-center col-20">
                <div className="product-miniature js-product-miniature item-one first-item">
                    <div className="thumbnail-container">
                        <a href="product-detail.html">
                            <img className="img-fluid image-cover" src="img/product/1.jpg" alt="img" />
                            <img className="img-fluid image-secondary" src="img/product/1.jpg" alt="img" />
                        </a>
                        <div className="highlighted-informations">
                            <div className="variant-links">
                                <a href="#" className="color beige" title="Beige"></a>
                                <a href="#" className="color orange" title="Orange"></a>
                                <a href="#" className="color green" title="Green"></a>
                            </div>
                        </div>
                    </div>
                    <div className="product-description">
                        <div className="product-groups">
                            <div className="product-title">
                                <a href="product-detail.html">Đồng hồ</a>
                            </div>
                            <div className="rating">
                                <div className="star-content">
                                    <div className="star"> </div>
                                    <div className="star"></div>
                                    <div className="star"></div>
                                    <div className="star"></div>
                                    <div className="star"></div>
                                </div>
                                <></>
                            </div>
                            <div className="product-group-price">
                                <div className="product-price-and-shipping">
                                    <span className="price">£28.08</span>
                                </div>
                            </div>
                        </div>
                        <div className="product-buttons d-flex justify-content-center">
                            <form action="#" method="post" className="formAddToCart">
                                <input type="hidden" name="id_product" value="1" />
                                <a className="add-to-cart" href="#" data-button-action="add-to-cart">
                                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                </a>
                            </form>
                            <a className="addToWishlist" href="#" data-rel="1" onclick="">
                                <i className="fa fa-heart" aria-hidden="true"></i>
                            </a>
                            <a href="#" className="quick-view hidden-sm-down" data-link-action="quickview">
                                <i className="fa fa-eye" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Item;