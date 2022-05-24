import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import categoryApi from '../../api/CategoryApi';
import productApi from '../../api/ProductApi';
import ProductItem from './ProductItem';


function SlideBar() {

    // const [productList, setProductList] = useState([]);
    const [categories, setCategories] = useState([]);
    // const { products, currentPage, totalPages, totalItem } = productList;
    const [topSaleProducts, setTopSaleProducts] = useState([]);
    // console.log(products);
    useEffect(() => {
        // const fetchProductList = async () => {
        //     try {
        //         const param = {}
        //         const response = await productApi.getAll(param);
        //         console.log(response);
        //         setProductList(response);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

        const fetchCategories = async () => {
            try {
                const response = await categoryApi.getAll();
                setCategories(response);
            } catch (error) {
                console.log(error);
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
        fetchTopSaleProduct();
        // fetchProductList();
        fetchCategories();

    }, [])
    console.log("2,", topSaleProducts);
    // useEffect(() => {


    //     const fetchTopSaleProducts = async () => {
    //         try {
    //             const a = await productApi.getTopSaleProducts();
    //             setTopSaleProducts(a);
    //             console.log("1", a);
    //             console.log("2", topSaleProducts);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchTopSaleProducts();


    // }, [])
    return (
        <>


            <div className="sidebar-3 sidebar-collection col-lg-3 col-md-4 col-sm-4">


                <div className="sidebar-block">
                    <div className="title-block">Danh mục</div>
                    <div className="block-content">

                        {
                            categories.map((category, index) => {
                                return <div className="cateTitle hasSubCategory open level1" key={index}>
                                    <Link className="cateItem" to={`/product/category/${category.categoryId}`}>
                                        {category.categoryName}
                                    </Link>
                                </div>
                            })
                        }

                    </div>
                </div>



                <div className="sidebar-block">
                    <div className="title-block">
                        Bán nhiều nhất
                    </div>
                    <div className="product-content tab-content">
                        <div className="row">

                            {
                                topSaleProducts.map(product => {
                                    return <ProductItem product={product} key={product.productId} check={true} />
                                })
                            }
                        </div>
                    </div>
                </div>


            </div>


        </>
    );
}

export default SlideBar;