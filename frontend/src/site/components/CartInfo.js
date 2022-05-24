import React from 'react';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';

function CartInfo() {

    const totalAmount = useSelector(state => state.todoCart.totalAmount);
    const totalQuantity = useSelector(state => state.todoCart.totalQuantity);

    return (
        <>
            <div className="cart-grid-right col-xs-12 col-lg-3">
                <div className="cart-summary">
                    <div className="cart-detailed-totals">
                        <div className="cart-summary-products">
                            <div className="summary-label">Có {totalQuantity} kg sản phẩm trong giỏ hàng của bạn</div>
                        </div>
                        <div id="cart-subtotal-products">
                            <span className="label js-subtotal">
                                Tổng tiền:
                            </span>
                            <span className="value"> <NumberFormat value={totalAmount} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
                        </div>

                    </div>
                </div>
                <div id="block-reassurance">
                    <ul>
                        <li>
                            <div className="block-reassurance-item">
                                <img src="img/product/check1.png" alt="Security policy (edit with Customer reassurance module)" />
                                <span>Chính sách bảo mật (Thông tin cá nhân của bạn sẻ được bảo đảm an toàn)</span>
                            </div>
                        </li>
                        <li>
                            <div className="block-reassurance-item">
                                <img src="img/product/check2.png" alt="Delivery policy (edit with Customer reassurance module)" />
                                <span>Chính sách giao hàng (Thanh toán khi nhận được sản phẩm và kiểm tra)</span>
                            </div>
                        </li>
                        <li>
                            <div className="block-reassurance-item">
                                <img src="img/product/check3.png" alt="Return policy (edit with Customer reassurance module)" />
                                <span>Chính sách hoàn tiền (đảm bảo sự hài lòng của khách hàng)</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default CartInfo;