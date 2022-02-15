import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Link
} from "react-router-dom";
import CategoryApi from '../../api/CategoryApi';
function Header() {

  const [categories, setCategories] = useState([]);

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
    fectCategoryList();
    // axios.get("http://localhost:8080/api/v1/category/public")
    //     .then(response => {
    //         console.log(response);
    //         setCategories(response.data);
    //     })
    //     .catch(error => console.log(error));
  }, []);

  const listCategories = categories.map((category) =>
    <li className="item" key={category.categoryId}>
      <a href="product.html" title={category.categoryName}>{category.categoryName}</a>
    </li>
  );

  return (
    <>
      <header>
        <div className="header-top d-xs-none position-static">
          <div className="container">
            <div className="row">

              <div className="col-sm-2 col-md-2 d-flex align-items-center">
                <div id="logo">
                  <a href="index-2.html">
                    <img className="img-fluid" src="img/home/logo-mobie.png" alt="logo" />
                  </a>
                </div>
              </div>


              <div className="main-menu col-sm-4 col-md-5 align-items-center justify-content-center navbar-expand-md">
                <div className="menu navbar collapse navbar-collapse">
                  <ul className="menu-top navbar-nav">
                    <li className="nav-link">
                      {/* <a href="#" className="parent">Trang chủ</a> */}
                      <Link to="/" className="parent">Trang chủ</Link>

                    </li>

                    <li>
                      <a href="#" className="parent">Sản phẩm</a>
                      <div className="dropdown-menu">
                        <ul>
                          {listCategories}
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a href="#" className="parent">Giới thiệu</a>

                    </li>
                    <li>
                      <a href="contact.html" className="parent">Liên hệ</a>
                    </li>
                  </ul>
                </div>
              </div>


              <div id="search_widget" className="col-sm-6 col-md-5 align-items-center justify-content-end d-flex">
                <form method="get" action="#">
                  <input type="text" name="s" value="" placeholder="Tìm kiếm sản phẩm" className="ui-autocomplete-input" autocomplete="off" />
                  <button type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </form>


                <div id="block_myaccount_infos" className="hidden-sm-down dropdown">
                  <div className="myaccount-title">
                    <a href="#acount" data-toggle="collapse" className="acount">
                      <i className="fa fa-user" aria-hidden="true"></i>
                      <span>Tài khoản</span>
                      <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </a>
                  </div>
                  <div id="acount" className="collapse">
                    <div className="account-list-content">
                      <div>
                        <a className="login" href="user-acount.html" rel="nofollow" title="Log in to your customer account">
                          <i className="fa fa-cog"></i>
                          <span>Tài khoản của tôi</span>
                        </a>
                      </div>
                      <div>
                        <a className="login" href="user-login.html" rel="nofollow" title="Log in to your customer account">
                          <i className="fa fa-sign-in"></i>
                          <span>Đăng nhập</span>
                        </a>
                      </div>
                      <div>
                        <a className="register" href="user-register.html" rel="nofollow" title="Register Account">
                          <i className="fa fa-user"></i>
                          <span>Đăng ký</span>
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="desktop_cart">
                  <div className="blockcart block-cart cart-preview tiva-toggle">
                    <div className="header-cart tiva-toggle-btn">
                      <span className="cart-products-count">1</span>
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    </div>
                    <div className="dropdown-content">
                      <div className="cart-content">
                        <table>
                          <tbody>
                            <tr>
                              <td className="product-image">
                                <a href="product-detail.html">
                                  <img src="img/product/5.jpg" alt="Product" />
                                </a>
                              </td>
                              <td>
                                <div className="product-name">
                                  <a href="product-detail.html">Đồng hồ treo tường</a>
                                </div>
                                <div>
                                  2 x
                                  <span className="product-price">£28.98</span>
                                </div>
                              </td>
                              <td className="action">
                                <a className="remove" href="#">
                                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                                </a>
                              </td>
                            </tr>
                            <tr className="total">
                              <td colspan="2">Tổng tiền:</td>
                              <td>£92.96</td>
                            </tr>

                            <tr>
                              <td colspan="3" className="d-flex justify-content-center">
                                <div className="cart-button">
                                  <a href="product-cart.html" title="View Cart">Xem Giỏ hàng</a>
                                  <a href="product-checkout.html" title="Checkout">Thanh toán</a>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>



    </>
  );
}

export default Header;