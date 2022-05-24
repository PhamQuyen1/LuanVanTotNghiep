import React from 'react';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

function ShoppingCartItem(props) {

    const item = props.item;
    return (
        <>
            <li className="cart-item">
                <div className="product-line-grid row justify-content-between">

                    <div className="product-line-grid-left col-md-2">
                        <span className="product-image media-middle">
                            <Link to={`/product/${item.product.productId}`}>
                                <img className="img-fluid" src={`/upload/${item.product.productImages[0].imageUrl}`} alt="Organic Strawberry Fruits" />

                            </Link>
                        </span>
                    </div>
                    <div className="product-line-grid-body col-md-4">
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
                    <div className="product-line-grid-right text-center product-line-actions col-md-6">
                        <div className="row">
                            <div className="col-md-5 col qty">
                                <div className="label">Số lượng:  {item.quantity}</div>
                                <div className="quantity">
                                    {/* <input disabled type="text" name="qty" value={item.quantity} className="input-group form-control" /> */}

                                    {/* <span className="input-group-btn-vertical">
                                        <button onClick={() => handleUpdateQuantity(Number(item.quantity) + 1, item.product.productId)} className="btn btn-touchspin js-touchspin bootstrap-touchspin-up" type="button" style={{ margin: '-2px 0 0 0px' }}>
                                            +
                                        </button>
                                        <button onClick={() => handleUpdateQuantity(item.quantity - 1, item.product.productId)} className="btn btn-touchspin js-touchspin bootstrap-touchspin-down" type="button" style={{ margin: '-3px 0 0 0px' }}>
                                            -
                                        </button>
                                    </span> */}
                                </div>
                            </div>
                            <div className="col-md-5 col price">
                                <div className="label">
                                    Tiền: <NumberFormat value={(item.product.price - item.product.price * item.product.discount / 100) * item.quantity} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                                </div>
                                {/* <div className="product-price total">
                                    <NumberFormat value={(item.product.price - item.product.price * item.product.discount / 100) * item.quantity} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                                </div> */}
                            </div>
                            {/* <div className="col-md-2 col text-xs-right align-self-end">
                                <div className="cart-line-product-actions ">
                                    <a onClick={() => handleDeleteItem(item.product.productId)} className="remove-from-cart" rel="nofollow" data-link-action="delete-from-cart" data-id-product="1">
                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
}

export default ShoppingCartItem;