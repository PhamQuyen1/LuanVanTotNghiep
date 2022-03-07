import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
import { useDispatch, useStore } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {
  Link
} from "react-router-dom";
import authenApi from '../../api/AuthenApi';
import CategoryApi from '../../api/CategoryApi';
import { deleteItem } from './action';
import { logout } from './action/auth';
function Header(props) {
  // const [user, setUser] = useState({});
  const { user } = useSelector(state => state.todoUser);
  // const user = props.user || {};
  console.log('user 2222', user);
  const items = useSelector(state => state.todoCart.Item) || [];
  const totalAmount = useSelector(state => state.todoCart.totalAmount);
  const totalQuantity = useSelector(state => state.todoCart.totalQuantity);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [productSearch, setProductSearch] = useState(null);
  const { categoryId } = useParams();
  const history = useHistory();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    history.push({
      pathname: `/product`,
      search: `name=${productSearch}`
    })
    setProductSearch(null);
  }
  function handleDeleteItem(productId) {
    console.log("hihi");
    dispatch(deleteItem(productId));
  }

  const handleOnLogout = () => {
    dispatch(logout());
    history.push("/");
    // setUser({});
  }
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
    const fectUser = async () => {
      try {
        const response = await authenApi.login("pquyen180@gmail.com", 123456)
        console.log(response);
        // setCategories(response);
      } catch (error) {
        console.log('Failed to fetch Category list: ', error);
      }

    }
    window.scrollTo(0, 0);
    fectCategoryList();
    // fectUser();
    // axios.get("http://localhost:8080/api/v1/category/public")
    //     .then(response => {
    //         console.log(response);
    //         setCategories(response.data);
    //     })
    //     .catch(error => console.log(error));
  }, [user]);
  // useEffect(() => {
  //   if (props && props.user) setUser(props.user);
  // }, [props.user]);
  const listCategories = categories.map((category) =>
    <li className="item" key={category.categoryId}>
      {/* <a href="product.html" title={category.categoryName}>{category.categoryName}</a> */}
      <Link to={`/product/category/${category.categoryId}`}>
        {category.categoryName}
      </Link>
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
                      <Link to="/product" className="parent">Sản phẩm</Link>
                      <div className="dropdown-menu">
                        <ul>
                          {listCategories}
                        </ul>
                      </div>
                    </li>
                    <li>
                      <Link to="/about-us" className="parent">Giới thiệu</Link>

                    </li>
                    <li>
                      <a href="contact.html" className="parent">Liên hệ</a>
                    </li>
                  </ul>
                </div>
              </div>


              <div id="search_widget" className="col-sm-6 col-md-5 align-items-center justify-content-end d-flex">
                <form onSubmit={handleOnSubmit}>
                  <input type="text" name="s" value={`${productSearch != null ? productSearch : ""}`} onChange={(e) => setProductSearch(e.target.value)} placeholder="Tìm kiếm sản phẩm" className="ui-autocomplete-input" autocomplete="off" />
                  <button type='submit' >
                    <i className="fa fa-search"></i>
                  </button>
                </form>



                <div className="desktop_cart">
                  <div className="blockcart block-cart cart-preview tiva-toggle">
                    <div className="header-cart tiva-toggle-btn">
                      <i className="fa fa-user" aria-hidden="true"></i>
                      {/* {Object.keys(user) != 0 ? user.user.fullname : 'Tài khoản'} */}
                      {user ? user.fullname : 'Tài khoản'}
                      <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </div>
                    <div className="dropdown-content" >

                      <div className="cart-content" style={{ width: '200px' }}>
                        <table>
                          <tbody>
                            {
                              user && (
                                <tr >
                                  <td >

                                    <div>
                                      <Link to="/profile" class="login" rel="nofollow" title="Log in to your customer account">
                                        <i class="fa fa-cog"> </i>
                                        <span> Tài khoản của tôi</span>
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              )
                            }
                            {
                              !user && (
                                <tr >
                                  <td >
                                    <div>
                                      <Link to="/login" class="login" href="user-login.html" rel="nofollow" title="Log in to your customer account">
                                        <i class="fa fa-sign-in"> </i>
                                        <span> Đăng nhập</span>
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              )
                            }

                            {
                              user && (
                                <tr style={{ cursor: 'pointer' }}>
                                  <td >
                                    <div>
                                      <a onClick={handleOnLogout} className="register" rel="nofollow" title="Register Account">
                                        <i className="fa fa-user"> </i>
                                        <span> Đăng xuất</span>
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              )
                            }

                            {
                              !user && (
                                <tr >
                                  <td >
                                    <div>
                                      <Link to="/register" class="login" href="user-login.html" rel="nofollow" title="Log in to your customer account">
                                        <i class="fa fa-sign-in"> </i>
                                        <span> Đăng kí</span>
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              )
                            }

                          </tbody>
                        </table>



                      </div>
                    </div>

                  </div>
                </div>
                <div className="desktop_cart">
                  <div className="blockcart block-cart cart-preview tiva-toggle">
                    <div className="header-cart tiva-toggle-btn">
                      <span className="cart-products-count">{totalQuantity}</span>
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    </div>
                    <div className="dropdown-content">
                      <div className="cart-content">
                        <table>
                          <tbody>
                            {
                              items &&
                              (
                                items.map(item => {
                                  return <tr>
                                    <td className="product-image">
                                      <Link to={`/product/${item.product.productId}`}>
                                        <img src={`/upload/${item.product.productImages[0].imageUrl}`} alt="" />

                                      </Link>
                                      {/* <a href="product-detail.html">
                                        <img src="img/product/5.jpg" alt="Product" />
                                      </a> */}
                                    </td>
                                    <td>
                                      <div className="product-name">
                                        <a href="product-detail.html">{item.product.productName}</a>
                                      </div>
                                      <div>
                                        {item.quantity} x
                                        <span className="product-price"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /> </span>
                                      </div>
                                    </td>
                                    <td className="action">
                                      <a className="remove" onClick={() => handleDeleteItem(item.product.productId)}>
                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                      </a>
                                    </td>
                                  </tr>
                                })
                              )
                            }

                            <tr className="total">
                              <td colspan="2">Tổng tiền:</td>
                              <td><NumberFormat value={totalAmount} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></td>
                            </tr>

                            <tr>
                              <td colspan="3" className="d-flex justify-content-center">
                                <div className="cart-button">
                                  <Link to={"/shoppingCart"} title="View Cart">Xem Giỏ hàng</Link>
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