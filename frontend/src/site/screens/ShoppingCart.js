import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { deleteAllItem, deleteItem, getTotalAmount, updateQuantity } from '../components/action';
import CartInfo from '../components/CartInfo';

function ShoppingCart() {

    const items = useSelector(state => state.todoCart.Item) || [];
    const totalAmount = useSelector(state => state.todoCart.totalAmount);
    const totalQuantity = useSelector(state => state.todoCart.totalQuantity);

    const [isDeleteItem, setDeleteItem] = useState(false);
    console.log("item", items);
    const dispatch = useDispatch();

    const history = useHistory();
    function handleDeleteItem(productId) {
        console.log("hihi");
        dispatch(deleteItem(productId));
        setDeleteItem(!isDeleteItem);
    }
    function handleOnDeleteAllItem() {
        console.log("huhu");
        dispatch(deleteAllItem("1"));
        setDeleteItem(!isDeleteItem);
    }

    function handleUpdateQuantity(e, productId) {
        console.log(e);
        if (!Number.isInteger(e))
            dispatch(updateQuantity({ productId: productId, quantity: e.target.value }));
        else dispatch(updateQuantity({ productId: productId, quantity: e }));
        setDeleteItem(!isDeleteItem);
    }
    useEffect(() => {

    }, [isDeleteItem])
    return (
        <>
            <div className="product-cart checkout-cart blog">
                <div className="main-content" id="cart">
                    <div id="wrapper-site">
                        <nav className="breadcrumb-bg">
                            <div className="container no-index">
                                <div className="breadcrumb">
                                    <ol>
                                        <li>
                                            <Link to="/" className="parent"><span>Trang chủ</span></Link>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span>Giỏ hàng</span>
                                            </a>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </nav>
                        <div className="container">
                            <div className="row">
                                <div id="content-wrapper" className="col-xs-12 col-sm-12 col-md-12 col-lg-12 onecol">
                                    <section id="main">
                                        <div className="cart-grid row">
                                            <div className="col-md-9 col-xs-12 check-info">
                                                <h1 className="title-page">Giỏ hàng</h1>
                                                <div className="cart-container">
                                                    <div className="cart-overview js-cart">
                                                        <ul className="cart-items">
                                                            {
                                                                items && (
                                                                    items.map(item => {
                                                                        return <li className="cart-item">
                                                                            <div className="product-line-grid row justify-content-between">

                                                                                <div className="product-line-grid-left col-md-2">
                                                                                    <span className="product-image media-middle">
                                                                                        <Link to={`/product/${item.product.productId}`}>
                                                                                            <img className="img-fluid" src={`/upload/${item.product.productImages[0].imageUrl}`} alt="Organic Strawberry Fruits" />

                                                                                        </Link>
                                                                                    </span>
                                                                                </div>
                                                                                <div className="product-line-grid-body col-md-6">
                                                                                    <div className="product-line-info">
                                                                                        <Link to={`/product/${item.product.productId}`} className="label" data-id_customization="0">{item.product.productName}</Link>
                                                                                    </div>
                                                                                    <div className="product-line-info product-price">
                                                                                        <span className="value"><NumberFormat value={item.product.price - item.product.price * item.product.discount / 100} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
                                                                                        {/* <div className="product-price-and-shipping">
                                                                                            <span className="price"><NumberFormat value={product.price - product.price * product.discount / 100} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
                                                                                        </div> */}
                                                                                    </div>

                                                                                </div>
                                                                                <div className="product-line-grid-right text-center product-line-actions col-md-4">
                                                                                    <div className="row">
                                                                                        <div className="col-md-5 col qty">
                                                                                            <div className="label">Số lượng:</div>
                                                                                            <div className="quantity">
                                                                                                <input type="text" name="qty" value={item.quantity} onChange={(e) => handleUpdateQuantity(e, item.product.productId)} className="input-group form-control" />

                                                                                                <span className="input-group-btn-vertical">
                                                                                                    <button onClick={() => handleUpdateQuantity(Number(item.quantity) + 1, item.product.productId)} className="btn btn-touchspin js-touchspin bootstrap-touchspin-up" type="button" style={{ margin: '-2px 0 0 0px' }}>
                                                                                                        +
                                                                                                    </button>
                                                                                                    <button onClick={() => handleUpdateQuantity(item.quantity - 1, item.product.productId)} className="btn btn-touchspin js-touchspin bootstrap-touchspin-down" type="button" style={{ margin: '-3px 0 0 0px' }}>
                                                                                                        -
                                                                                                    </button>
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-5 col price">
                                                                                            <div className="label">Tiền:</div>
                                                                                            <div className="product-price total">
                                                                                                <NumberFormat value={(item.product.price - item.product.price * item.product.discount / 100) * item.quantity} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-2 col text-xs-right align-self-end">
                                                                                            <div className="cart-line-product-actions ">
                                                                                                <a onClick={() => handleDeleteItem(item.product.productId)} className="remove-from-cart" rel="nofollow" data-link-action="delete-from-cart" data-id-product="1">
                                                                                                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    })
                                                                )
                                                            }

                                                        </ul>
                                                    </div>
                                                </div>
                                                {
                                                    Object.keys(items).length != 0 && <a onClick={() => handleOnDeleteAllItem()} className="continue btn btn-primary pull-xs-right">
                                                        Xóa tất cả
                                                    </a>
                                                }

                                                <Link to="/product" className="continue btn btn-primary pull-xs-right">
                                                    Tiếp tục mua
                                                </Link>
                                                {
                                                    Object.keys(items).length != 0 && <Link to="/checkout" className="continue btn btn-primary pull-xs-right">
                                                        Thanh toán
                                                    </Link>
                                                }

                                            </div>
                                            <CartInfo />
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

export default ShoppingCart;