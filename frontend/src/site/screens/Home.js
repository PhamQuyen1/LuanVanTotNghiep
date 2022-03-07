import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ReactOwlCarousel from 'react-owl-carousel';

import Item from '../components/Item';
import CategoryItem from '../components/CategoryItem'
import CategoryApi from '../../api/CategoryApi';
import productApi from '../../api/ProductApi';
import ProductItem from '../components/ProductItem';
import { Link } from 'react-router-dom';

function Home() {

    const [categories, setCategories] = useState([]);
    const [topSaleProducts, setTopSaleProducts] = useState([]);
    const [topReviewProducts, setTopReviewProducts] = useState([]);
    const [categoryProductQuantity, setcategoryProductQuantity] = useState([]);
    useEffect(() => {
        const fectCategoryList = async () => {
            try {
                const response = await CategoryApi.getAll();
                console.log(response);
                setCategories(response);
            } catch (error) {
                console.log('Failed to fetch Category list: ', error);
            }

        }
        const fectCategoryProductQuantity = async () => {
            try {
                const response = await CategoryApi.getCategoryProducQuantity();
                console.log(response);
                setcategoryProductQuantity(response);
            } catch (error) {
                console.log('Failed to fetch Category list: ', error);
            }

        }

        const fetchTopSaleProduct = async () => {
            try {
                const response = await productApi.getTopSaleProducts();
                console.log("1,", response);
                setTopSaleProducts(response);
            } catch (error) {
                console.log(error);
            }
        }
        const fetchTopReviewProduct = async () => {
            try {
                const response = await productApi.getTopReviewProducts();
                console.log(response);
                setTopReviewProducts(response);
            } catch (error) {
                console.log(error);
            }
        }
        fectCategoryProductQuantity();
        fetchTopSaleProduct();
        fetchTopReviewProduct();
        fectCategoryList();
    }, []);
    return (
        <>
            <div>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="img/home/home1-banner1.jpg"
                            alt="First slide"
                        // style={{ width: '1519px', height='800px' }}
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
                                                    <div className="featured">
                                                        {
                                                            categories.length &&
                                                            (
                                                                <ReactOwlCarousel className='owl-theme' loop margin={10} nav items={5} dots={false}>
                                                                    {categories.map((category, index) => {
                                                                        return <CategoryItem item={category} key={category.categoryId} quantity={categoryProductQuantity[category.categoryId]} />
                                                                    }
                                                                    )}
                                                                </ReactOwlCarousel>
                                                            )
                                                        }
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
                                                    {
                                                        topSaleProducts.map(product => {
                                                            return <ProductItem product={product} key={product.productId} />
                                                        })
                                                    }
                                                    {/* <Item />
                                                    <Item />
                                                    <Item />
                                                    <Item />
                                                    <Item /> */}
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
                                                    {
                                                        topReviewProducts.map(product => {
                                                            return <ProductItem product={product} key={product.productId} />
                                                        })
                                                    }

                                                    <div className="content-showmore text-center has-showmore" style={{ display: 'inline' }}>
                                                        <Link className="btn btn-default novShowMore" to="/product"><span>Tất cả sản phẩm</span></Link>
                                                        {/* <a className="btn btn-default novShowMore" href="./product-grid-sidebar-right.html"><span>Tất cả sản phẩm</span></a> */}
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
            </div >

        </>
    );
}

export default Home;