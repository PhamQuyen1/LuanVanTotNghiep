import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import orderApi from '../../api/OrderApi';

function Profile(props) {

    const { user } = props;
    console.log(user);

    const [param, setParam] = useState({
        email: user.email,
        page: 1
    })

    useEffect(() => {
        const response = orderApi.listAll(param);
        console.log(response);
        console.log(response);
    }, [])
    return (
        <>
            <div className="user-acount">
                <div className="main-content">
                    <div className="wrap-banner">


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
                                                <span>Tài khoản của tôi</span>
                                            </a>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </nav>

                        <div className="acount head-acount">
                            <div className="container">
                                <div id="main">
                                    <h1 className="title-page">Tài khoản của tôi</h1>
                                    <div className="content" id="block-history">
                                        <table className="std table">
                                            <tbody>
                                                <tr>
                                                    <th className="first_item">Tên :</th>
                                                    <td>{user.fullname}</td>
                                                </tr>

                                                <tr>
                                                    <th className="first_item">Địa chỉ :</th>
                                                    <td>{user.address}</td>
                                                </tr>


                                                <tr>
                                                    <th className="first_item">Số điện thoại :</th>
                                                    <td>{user.phone}</td>
                                                </tr>
                                                <tr>
                                                    <th className="first_item">Email:</th>
                                                    <td>{user.email}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <div>
                                        <Link to={'/updatePassword'} className="form-control-submit btn btn-primary">
                                            Đổi mật khẩu
                                        </Link>
                                        <Link to={'/updateInfo'} className="form-control-submit btn btn-primary">
                                            Cập nhập thông tin
                                        </Link>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-cart checkout-cart blog">
                <div className="main-content" id="cart">

                    <div id="wrapper-site">


                        <div className="container">
                            <div className="row">
                                <div id="content-wrapper" className="col-xs-12 col-sm-12 col-md-12 col-lg-12 onecol">
                                    <section id="main" className="mt-0">
                                        <div className="cart-grid row">
                                            <div className="col-md-9 col-xs-12 check-info">
                                                <h1 className="title-page">Đơn hàng đã mua</h1>
                                                <p>Bạn chưa đặt đơn hàng nào.</p>

                                                <div id="block-history" className="block-center">
                                                    <table className="std table">
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th className="first_item">Ngày đặt hàng</th>
                                                                <th className="item mywishlist_first">Địa chỉ giao hàng</th>
                                                                <th className="item mywishlist_first">Tình trạng</th>
                                                                <th className="item mywishlist_second">Tổng tiền</th>
                                                                <th className="item mywishlist_second">Xem chi tiết</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr id="wishlist_1">
                                                                <td>
                                                                    2020-01-01
                                                                </td>
                                                                <td className="bold align_center">
                                                                    Cần thơ Viet Nam
                                                                </td>
                                                                <td>Đã giao</td>
                                                                <td>5.000.000 đ</td>
                                                                <td>
                                                                    <a className="text-success" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                                                        + Xem chi tiết
                                                                    </a>

                                                                </td>

                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                    <div className="collapse" id="collapseExample">

                                                        <div className="cart-container card card-body">
                                                            <div className="cart-overview js-cart">
                                                                <ul className="cart-items">
                                                                    <li className="cart-item">
                                                                        <div className="product-line-grid row justify-content-between">

                                                                            <div className="product-line-grid-left col-md-2">
                                                                                <span className="product-image media-middle">
                                                                                    <a href="product-detail.html">
                                                                                        <img className="img-fluid" src="img/product/3.jpg" alt="Organic Strawberry Fruits" />
                                                                                    </a>
                                                                                </span>
                                                                            </div>
                                                                            <div className="product-line-grid-body col-md-6">
                                                                                <div className="product-line-info">
                                                                                    <a className="label" href="product-detail.html" data-id_customization="0">Organic Strawberry Fruits</a>
                                                                                </div>
                                                                                <div className="product-line-info product-price">
                                                                                    <span className="value">£20.00</span>
                                                                                </div>

                                                                            </div>
                                                                            <div className="product-line-grid-right text-center product-line-actions col-md-4">
                                                                                <div className="row">
                                                                                    <div className="col-md-5 col qty">
                                                                                        <div className="label">Số lượng:</div>
                                                                                        <div className="quantity">
                                                                                            <input type="text" name="qty" value="1" className="input-group form-control" readonly />


                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-5 col price">
                                                                                        <div className="label">Tiền:</div>
                                                                                        <div className="product-price total">
                                                                                            £20.00
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-2 col text-xs-right align-self-end">
                                                                                        <div className="cart-line-product-actions ">
                                                                                            <a className="remove-from-cart" rel="nofollow" href="#" data-link-action="delete-from-cart" data-id-product="1">
                                                                                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                                                            </a>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li className="cart-item">
                                                                        <div className="product-line-grid row justify-content-between">

                                                                            <div className="product-line-grid-left col-md-2">
                                                                                <span className="product-image media-middle">
                                                                                    <a href="product-detail.html">
                                                                                        <img className="img-fluid" src="img/product/2.jpg" alt="Organic Strawberry Fruits" />
                                                                                    </a>
                                                                                </span>
                                                                            </div>
                                                                            <div className="product-line-grid-body col-md-6">
                                                                                <div className="product-line-info">
                                                                                    <a className="label" href="product-detail.html" data-id_customization="0">
                                                                                        Etiam Congue Nisl Nec</a>
                                                                                </div>
                                                                                <div className="product-line-info product-price">
                                                                                    <span className="value">£30.00</span>
                                                                                </div>
                                                                                <div className="product-line-info">
                                                                                    <span className="label-atrr">Size:</span>
                                                                                    <span className="value">S</span>
                                                                                </div>
                                                                                <div className="product-line-info">
                                                                                    <span className="label-atrr">Color:</span>
                                                                                    <span className="value">Blue</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="product-line-grid-right text-center product-line-actions col-md-4">
                                                                                <div className="row">
                                                                                    <div className="col-md-5 qty col">
                                                                                        <div className="label">Qty:</div>
                                                                                        <div className="quantity">
                                                                                            <input type="text" name="qty" value="2" className="input-group form-control" />

                                                                                            <span className="input-group-btn-vertical">
                                                                                                <button className="btn btn-touchspin js-touchspin bootstrap-touchspin-up" type="button">
                                                                                                    +
                                                                                                </button>
                                                                                                <button className="btn btn-touchspin js-touchspin bootstrap-touchspin-down" type="button">
                                                                                                    -
                                                                                                </button>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-5 price col">
                                                                                        <div className="label">Total:</div>
                                                                                        <div className="product-price total">
                                                                                            £60.00
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-2 text-xs-right align-self-end col">
                                                                                        <div className="cart-line-product-actions ">
                                                                                            <a className="remove-from-cart" rel="nofollow" href="#" data-link-action="delete-from-cart" data-id-product="1">
                                                                                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                                                            </a>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li className="cart-item">
                                                                        <div className="product-line-grid row justify-content-between">

                                                                            <div className="product-line-grid-left col-md-2">
                                                                                <span className="product-image media-middle">
                                                                                    <a href="product-detail.html">
                                                                                        <img className="img-fluid" src="img/product/1.jpg" alt="Organic Strawberry Fruits" />
                                                                                    </a>
                                                                                </span>
                                                                            </div>
                                                                            <div className="product-line-grid-body col-md-6">
                                                                                <div className="product-line-info">
                                                                                    <a className="label" href="product-detail.html" data-id_customization="0">Nulla Et Justo Non Augue</a>
                                                                                </div>
                                                                                <div className="product-line-info product-price">
                                                                                    <span className="value">£40.00</span>
                                                                                </div>
                                                                                <div className="product-line-info">
                                                                                    <span className="label-atrr">Size:</span>
                                                                                    <span className="value">S</span>
                                                                                </div>
                                                                                <div className="product-line-info">
                                                                                    <span className="label-atrr">Color:</span>
                                                                                    <span className="value">Blue</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="product-line-grid-right text-center product-line-actions col-md-4">
                                                                                <div className="row">
                                                                                    <div className="col-md-5 col qty">
                                                                                        <div className="label">Qty:</div>
                                                                                        <div className="quantity">
                                                                                            <input type="text" name="qty" value="3" className="input-group form-control" />

                                                                                            <span className="input-group-btn-vertical">
                                                                                                <button className="btn btn-touchspin js-touchspin bootstrap-touchspin-up" type="button">
                                                                                                    +
                                                                                                </button>
                                                                                                <button className="btn btn-touchspin js-touchspin bootstrap-touchspin-down" type="button">
                                                                                                    -
                                                                                                </button>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-5 col price">
                                                                                        <div className="label">Total:</div>
                                                                                        <div className="product-price total">
                                                                                            £120.00
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-2 col text-xs-right align-self-end">
                                                                                        <div className="cart-line-product-actions ">
                                                                                            <a className="remove-from-cart" rel="nofollow" href="#" data-link-action="delete-from-cart" data-id-product="1">
                                                                                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                                                            </a>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
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

export default Profile;