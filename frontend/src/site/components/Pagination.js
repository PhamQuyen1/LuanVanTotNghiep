import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function Pagination(props) {
    const page = props.page;
    const totalPage = props.totalPage;
    console.log("totalPage", totalPage);
    return (
        <>
            <div id="product-sidebar-left" className="product-grid-sidebar-left">
                <div className="main-content">
                    <div id="wrapper-site">
                        <div id="content-wrapper" className="full-width">
                            <div id="main">
                                <div className="page-home">
                                    <div className="container" id="product-detail">
                                        <div className="content">
                                            <div className="row">
                                                <div className="col-sm-12 col-lg-12 col-md-12 product-container">
                                                    <div className="pagination">
                                                        <div className="js-product-list-top ">
                                                            <div className="d-flex justify-content-around row">
                                                                <div className="showing col col-xs-12">
                                                                    <span>Đang hiển thị trang {page} trong {totalPage} trang</span>
                                                                    {/* <span>Đang hiển thị trang {productList.currentPage} trong {productList.totalPage} trang</span> */}
                                                                </div>
                                                                <div className="page-list col col-xs-12">
                                                                    {/* <li>
                                                                        <a rel="prev" href="#" className="previous disabled js-search-link">
                                                                            Trước
                                                                        </a>
                                                                    </li> */}
                                                                    <ul>
                                                                        {
                                                                            page != 1 &&
                                                                            <li className="previous disabled js-search-link" style={{ cursor: "pointer" }}
                                                                                onClick={() => props.handlePage("previous")}
                                                                            >
                                                                                <span> &lt; </span>
                                                                            </li>
                                                                        }







                                                                        <li className="current active">
                                                                            <span>{(page)}</span>
                                                                        </li>

                                                                        {
                                                                            page < totalPage &&
                                                                            <li className="next disabled js-search-link" style={{ cursor: "pointer" }}
                                                                                onClick={() => props.handlePage("next")}
                                                                            >
                                                                                <span> &gt; </span>
                                                                            </li>
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default Pagination;