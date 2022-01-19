import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import Item from '../components/Item';

function Home() {
    return (
        <>
            
                <div>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="img/home/home1-banner1.jpg"
                                alt="First slide"
                            />

                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="img/home/home1-banner2.jpg"
                                alt="Second slide"
                            />


                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="img/home/home1-banner3.jpg"
                                alt="Third slide"
                            />


                        </Carousel.Item>
                    </Carousel>

                </div>

                <div id="home4">
                    <div className="main-content">
                        <div className="wrap-banner">
                            <div className="container">

                                <div className="row">
                                    <div className="policy-home col-lg-12">
                                        <div className="row">
                                            <div className="block col-lg-4 col-md-4 col-xs-12 d-flex justify-content-center">
                                                <div className="block-content">
                                                    <div className="policy-item">
                                                        <div className="policy-content iconpolicy1">
                                                            <img src="img/home/home1-policy.png" alt="img" />
                                                            <div className="policy-name mb-5">GIAO HÀNG NHANH GỌN</div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="block tiva-html col-lg-4 col-md-4 col-xs-12 d-flex  justify-content-center">
                                                <div className="block-content">
                                                    <div className="policy-item">
                                                        <div className="policy-content iconpolicy2">
                                                            <img src="img/home/home1-policy2.png" alt="img" />
                                                            <div className="policy-name mb-5">TIẾT KIỆM THỜI GIAN</div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="block tiva-html col-lg-4 col-md-4 col-xs-12 d-flex justify-content-center">
                                                <div className="block-content">
                                                    <div className="policy-item">
                                                        <div className="policy-content iconpolicy3">
                                                            <img src="img/home/home1-policy3.png" alt="img" />
                                                            <div className="policy-name mb-5" > CHÍNH SÁCH HOÀN TIỀN</div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="wrapper-site">
                                <div id="content-wrapper" className="full-width">
                                    <div id="main">
                                        <section className="page-home">

                                            <div className="featured-category">
                                                <div className="container">
                                                    <div className="tab-content text-center">
                                                        <div className="title-product">
                                                            <h2>DANH MỤC SẢN PHẨM</h2>

                                                        </div>
                                                        <div className="featured owl-carousel owl-theme">
                                                            <div className="content-category">
                                                                <div className="content-img">
                                                                    <a href="product-grid-sidebar-left.html">
                                                                        <img className="img-fluid" src="img/product/27.jpg" alt="Side Table" title="Side Table" />
                                                                    </a>
                                                                </div>
                                                                <div className="info-category">
                                                                    <h3>
                                                                        <a href="product-grid-sidebar-left.html">Side Table</a>
                                                                    </h3>
                                                                    <p>Discover 120 Products </p>
                                                                </div>
                                                            </div>
                                                            <div className="content-category">
                                                                <div className="content-img">
                                                                    <a href="product-grid-sidebar-left.html">
                                                                        <img className="img-fluid" src="img/product/28.jpg" alt="Side Table" title="Side Table" />
                                                                    </a>
                                                                </div>
                                                                <div className="info-category">
                                                                    <h3>
                                                                        <a href="product-grid-sidebar-left.html">Arm Chair</a>
                                                                    </h3>
                                                                    <p>Discover 35 Products </p>
                                                                </div>
                                                            </div>
                                                            <div className="content-category">
                                                                <div className="content-img">
                                                                    <a href="product-grid-sidebar-left.html">
                                                                        <img className="img-fluid" src="img/product/29.jpg" alt="Side Table" title="Side Table" />
                                                                    </a>
                                                                </div>
                                                                <div className="info-category">
                                                                    <h3>
                                                                        <a href="product-grid-sidebar-left.html">Dinner Table</a>
                                                                    </h3>
                                                                    <p>Discover 127 Products </p>
                                                                </div>
                                                            </div>
                                                            <div className="content-category">
                                                                <div className="content-img">
                                                                    <a href="product-grid-sidebar-left.html">
                                                                        <img className="img-fluid" src="img/product/30.jpg" alt="Side Table" title="Side Table" />
                                                                    </a>
                                                                </div>
                                                                <div className="info-category">
                                                                    <h3>
                                                                        <a href="product-grid-sidebar-left.html">Pillow</a>
                                                                    </h3>
                                                                    <p>Discover 130 Products </p>
                                                                </div>
                                                            </div>
                                                            <div className="content-category">
                                                                <div className="content-img">
                                                                    <a href="product-grid-sidebar-left.html">
                                                                        <img className="img-fluid" src="img/product/31.jpg" alt="Side Table" title="Side Table" />
                                                                    </a>
                                                                </div>
                                                                <div className="info-category">
                                                                    <h3>
                                                                        <a href="product-grid-sidebar-left.html">Wall Clock</a>
                                                                    </h3>
                                                                    <p>Discover 47 Products </p>
                                                                </div>
                                                            </div>
                                                            <div className="content-category">
                                                                <div className="content-img">
                                                                    <a href="product-grid-sidebar-left.html">
                                                                        <img className="img-fluid" src="img/product/32.jpg" alt="Side Table" title="Side Table" />
                                                                    </a>
                                                                </div>
                                                                <div className="info-category">
                                                                    <h3>
                                                                        <a href="product-grid-sidebar-left.html">Lamp</a>
                                                                    </h3>
                                                                    <p>Discover 20 Products </p>
                                                                </div>
                                                            </div>
                                                            <div className="content-category">
                                                                <div className="content-img">
                                                                    <a href="product-grid-sidebar-left.html">
                                                                        <img className="img-fluid" src="img/product/33.jpg" alt="Side Table" title="Side Table" />
                                                                    </a>
                                                                </div>
                                                                <div className="info-category">
                                                                    <h3>
                                                                        <a href="product-grid-sidebar-left.html">Soffa</a>
                                                                    </h3>
                                                                    <p>Discover 12 Products </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="section spacing-10 group-image-special">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-4 banner1">
                                                        <div className="effect">
                                                            <a href="#">
                                                                <img className="img-fluid width-100" src="img/home/effect5.png" alt="banner-1" title="banner-1" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 banner1">
                                                        <div className="effect">
                                                            <a href="#">
                                                                <img className="img-fluid width-100" src="img/home/home1-banner-2.png" alt="banner-2" title="banner-2" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 banner1">
                                                        <div className="effect">
                                                            <a href="#">
                                                                <img className="img-fluid width-100" src="img/home/home1-banner-3.png" alt="banner-2" title="banner-2" />
                                                            </a>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="featured-product">
                                                <div className="container">
                                                    <div className="title-tab-content  text-center">
                                                        <div className="title-product justify-content-between">
                                                            <h2>SẢM PHẨM KHUYẾN MÃI</h2>
                                                            <p>Đây là những sản phẩm khuyến mãi của chúng tôi</p>
                                                        </div>
                                                    </div>
                                                    <div className="tab-content" style={{ marginTop: "0" }}>

                                                        <Item />
                                                        <Item />
                                                        <Item />
                                                        <Item />
                                                        <Item />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="featured-product">
                                                <div className="container">
                                                    <div className="title-tab-content  text-center">
                                                        <div className="title-product justify-content-between">
                                                            <h2>SẢM PHẨM MỚI NHẤT</h2>
                                                            <p>Đây là những sản phẩm mới nhất của chúng tôi</p>
                                                        </div>
                                                    </div>
                                                    <div className="tab-content" style={{ marginTop: "0" }}>
                                                        <Item />
                                                        <Item />
                                                        <Item />
                                                        <Item />
                                                        <Item />

                                                        <div className="content-showmore text-center has-showmore">

                                                            <a className="btn btn-default novShowMore" href="./product-grid-sidebar-right.html"><span>Tất cả sản phẩm</span></a>
                                                            <input type="hidden" value="0" className="count_showmore" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>





                                        </section>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                
        </>
    );
}

export default Home;