import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Link, Route, Switch } from 'react-router-dom';
import categoryApi from '../../api/CategoryApi';
import productApi from '../../api/ProductApi';
import ProductItem from '../components/ProductItem';
import SlideBar from '../components/SlideBar';
import ProductDetail from './ProductDetail';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import Pagination from '../components/Pagination';
function Product(props) {

    const [productList, setProductList] = useState([]);
    const { search } = useLocation();
    const { categoryId } = useParams();
    const searchParam = new URLSearchParams(search);
    const productName = searchParam.get('name');
    const [totalPages, setTotalPages] = useState();
    const [filter, setFilter] = useState({
        productName: productName || null,
        categoryId: categoryId || null,
        page: 1,
        sortDir: 'asc',
        sortField: 'productId'
    });

    if (filter.categoryId != categoryId) setFilter({ ...filter, categoryId: categoryId });
    if (filter.productName != productName) setFilter({ ...filter, productName: productName });

    console.log(searchParam.get('name'));
    const { products, totalItem } = productList;
    const handlePage = (action) => {
        if (action === "next") {
            setFilter({ ...filter, page: productList.currentPage += 1 }
            );
        }

        else {
            setFilter({ ...filter, page: productList.currentPage -= 1 });
        }

        console.log(productList);
    }

    const handleSort = (e) => {
        console.log(e.target.value);
        switch (e.target.value) {
            case "1":
                setFilter({ ...filter, sortDir: "asc", sortField: "productName" });
                console.log(filter);
                break;
            case "2": setFilter({ ...filter, sortDir: "desc", sortField: "productName" });
                break;
            case "3": setFilter({ ...filter, sortDir: "asc", sortField: "price" });
                break;
            case "4": setFilter({ ...filter, sortDir: "desc", sortField: "price" });
                break;
            default: setFilter({ ...filter, sortDir: "asc", sortField: "productId" });
        }
    }
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const body = filter;
                body.page = productList.totalPage < body.page ? body.page = 1 : body.page = body.page;
                const response = await productApi.getAll(body);
                console.log(response);

                setTotalPages(response.totalPage);
                setProductList(response);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProductList();
        window.scrollTo(0, 0);
    }, [categoryId, search, filter, totalPages])

    return (
        <>
            <div id="product-sidebar-left" className="product-grid-sidebar-left">
                <div className="main-content">
                    <div id="wrapper-site">
                        <div id="content-wrapper" className="full-width">
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

                                    <div className="container" id="product-detail">
                                        <div className="content">
                                            <div className="row">
                                                <SlideBar />

                                                <div className="col-sm-8 col-lg-9 col-md-8 product-container">
                                                    <h1>Tất cả sản phẩm</h1>
                                                    <div className="js-product-list-top firt nav-top">
                                                        <div className="d-flex justify-content-around row">
                                                            <div className="col col-xs-12">
                                                                <ul className="nav nav-tabs">
                                                                    <li>
                                                                        <a href="#grid" data-toggle="tab" className="active show fa fa-th-large"></a>
                                                                    </li>

                                                                </ul>
                                                                <div className="hidden-sm-down total-products">
                                                                    <p>Có 12 sản phẩm tất cả</p>
                                                                </div>
                                                            </div>
                                                            <div className="col col-xs-12">
                                                                <div className="d-flex sort-by-row justify-content-lg-end justify-content-md-end">

                                                                    <div className="products-sort-order dropdown">
                                                                        <select className="select-title" onChange={handleSort}>
                                                                            <option value="0">Không sắp xếp</option>
                                                                            <option value="1">Tên, từ A đến Z</option>
                                                                            <option value="2">Tên, từ Z đến A</option>
                                                                            <option value="3">Giá, từ thấp đến cao</option>
                                                                            <option value="4">Giá, từ cao đến thấp</option>
                                                                        </select>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tab-content product-items">
                                                        <div id="grid" className="related tab-pane fade in active show">
                                                            <div className="row">
                                                                {products &&
                                                                    (products.map(product => {
                                                                        return <ProductItem product={product} key={product.productId} />
                                                                    })
                                                                    )
                                                                }

                                                            </div>
                                                        </div>

                                                    </div>



                                                    {
                                                        productList &&
                                                        (<Pagination page={filter.page} totalPage={productList.totalPage
                                                        } handlePage={handlePage} />)
                                                    }
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
        </>
    );
}

export default Product;