import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartInfo from '../components/CartInfo';
import Map from '../components/Map';
import ShoppingCartItem from '../components/ShoppingCartItem';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import orderApi from '../../api/OrderApi';
import { useHistory } from 'react-router-dom';
import { deleteAllItem } from '../components/action';
import { toast } from 'react-toastify';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Link } from 'react-router-dom';

const schema = yup.object({
    address: yup.string().required('Địa chỉ không được rỗng'),
    note: yup.string(),
}).required();

function Checkout(props) {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const refSubmitButtom = useRef(null);
    const [paymentMethod, setPaymentMethod] = useState('CASH')
    const dispath = useDispatch();
    const history = useHistory();
    const items = useSelector(state => state.todoCart.Item) || [];
    const order = useSelector(state => state.todoCart) || [];
    const { user } = useSelector(state => state.todoUser);
    // const user = JSON.parse(localStorage.getItem('user'));
    // const { user } = props;
    const [info, setInfo] = useState(user.user);
    console.log("checkout", info);
    const handleMomo = () => {
        console.log("abcd")
        orderApi.payMomo().then(
            response => {
                console.log(response)

            }, error => {
                console.log(error)
            }
        )
    }
    const createOrder = (data, action) => {
        return action.order.create({
            purchase_units: [{
                description: "Thanh toán",
                amount: {
                    currency_code: "USD",
                    value: Number(order.totalAmount / 22000).toFixed(2),
                },

            }]
        }).then((orderID) => {

            return orderID;
        });
    }
    const onApprove = async (data, actions) => {
        const order = await actions.order.capture();
        console.log("order", order);

        handleApprove(data.orderID);
    }

    const handleApprove = (orderID) => {
        setPaymentMethod('PAYPAL');
        console.log('aaaaaaaaaaaaa');
        refSubmitButtom?.current?.click();
    }
    const onError = (data, actions) => {
        toast.error('Thanh toán thất bại');
    };
    const onSubmit = async (data) => {
        console.log(data);
        const itemRequests = []
        items.map(item => {
            itemRequests.push({
                productId: item.product.productId,
                quantity: item.quantity,
                price: item.price
            })
        })
        console.log("itemRequests2", itemRequests);
        const request = {
            orderAddress: data.address,
            orderNote: data.note,
            paymentMethod: paymentMethod,
            itemRequests: itemRequests
        }
        console.log("itemRequests", request);
        const response = await orderApi.createOrder(request);
        console.log(response);
        dispath(deleteAllItem('1'));
        history.push('/profile');
        toast.success('Đã đặt đơn hàng thành công');

    }
    useEffect(() => {

    }, [user])

    return (
        <>
            <div className="product-checkout checkout-cart">
                <div id="checkout" className="main-content">
                    <div className="wrap-banner">

                        <nav className="breadcrumb-bg">
                            <div className="container no-index">
                                <div className="breadcrumb">
                                    <ol>
                                        <li>
                                            <Link to="/" className="parent"><span>Trang chủ</span></Link>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span>Thanh toán</span>
                                            </a>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </nav>



                        <div id="wrapper-site">
                            <div className="container">
                                <div className="row">
                                    <div id="content-wrapper" className="col-xs-12 col-sm-12 col-md-12 col-lg-12 onecol">
                                        <div id="main">
                                            <div className="cart-grid row">
                                                <div className="col-md-9 check-info">
                                                    <div className="checkout-personal-step">
                                                        <h3 className="step-title h3 info">
                                                            <span className="step-number"></span>tHÔNG TIN Giỏ hàng
                                                        </h3>
                                                    </div>
                                                    <div className="cart-container">
                                                        <div className="cart-overview js-cart">
                                                            <ul className="cart-items">
                                                                {
                                                                    items && (
                                                                        items.map((item, index) => {
                                                                            return <ShoppingCartItem item={item} key={index} />
                                                                        })
                                                                    )
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="checkout-personal-step">
                                                        <h3 className="step-title h3 info">
                                                            <span className="step-number"></span>tHÔNG TIN giao hàng
                                                        </h3>
                                                    </div>
                                                    <div className="content">

                                                        <div className="tab-content">
                                                            <div className="tab-pane fade in active show" id="checkout-guest-form" role="tabpanel">
                                                                <form id="customer-form" className="js-customer-form" onSubmit={handleSubmit(onSubmit)}>
                                                                    <div>
                                                                        <input
                                                                            type="hidden"
                                                                            name="id_customer"
                                                                            value=""
                                                                        />
                                                                        <div className="form-group row">
                                                                            <input
                                                                                readonly=""
                                                                                className="form-control"
                                                                                name="user.fullname"
                                                                                type="text"
                                                                                placeholder="Họ tên"
                                                                                id="user.fullname"
                                                                                value={user.fullname}
                                                                            />
                                                                        </div>
                                                                        <div className="form-group row">
                                                                            <input
                                                                                readonly=""
                                                                                className="form-control"
                                                                                name="user.email"
                                                                                type="email"
                                                                                placeholder="Email"
                                                                                id="user.email"
                                                                                value={user.email}
                                                                            />
                                                                        </div>
                                                                        <div className="form-group row">
                                                                            <input
                                                                                readonly=""
                                                                                className="form-control"
                                                                                name="user.phone"
                                                                                type="text"
                                                                                placeholder="Số điện thoại"
                                                                                id="user.phone"
                                                                                value={user.phone}
                                                                            />
                                                                        </div>


                                                                        <div className="form-group row">
                                                                            <input
                                                                                className="form-control"

                                                                                type="text"
                                                                                placeholder="Địa chỉ nhận hàng"
                                                                                id="orderAddress"
                                                                                {...register("address")}
                                                                            />
                                                                        </div>
                                                                        <div className=" form-group row">
                                                                            <div className="spr-form-input">
                                                                                <textarea
                                                                                    id='myTextarea'
                                                                                    className="spr-form-input-textarea form-control"
                                                                                    rows="10"
                                                                                    placeholder="Ghi chú"
                                                                                    {...register("note")}
                                                                                    style={{ width: '310%' }} ></textarea>
                                                                            </div>
                                                                        </div>
                                                                        {/* <div>
                                                                            <div>Phương thức thanh toán: {paymentMethod == 'CASH' ? 'Tiền mặt' : 'PAYPAY'}</div>
                                                                        </div> */}



                                                                    </div>

                                                                    <div className="clearfix">
                                                                        <div className="row">
                                                                            <div className='col'>
                                                                                <Link to={"/shoppingCart"} className="continue btn btn-primary pull-xs-right">
                                                                                    Về giỏ hàng
                                                                                </Link>
                                                                                <span className="ml-1"></span>
                                                                                <button className="continue btn btn-primary pull-xs-right" ref={refSubmitButtom} name="continue" data-link-action="register-new-customer" type="submit" value="1">
                                                                                    Đặt hàng
                                                                                </button>
                                                                            </div>
                                                                            <div className="col pt-5">
                                                                                <PayPalButtons
                                                                                    style={{ layout: "horizontal" }}
                                                                                    createOrder={createOrder}
                                                                                    onApprove={onApprove}
                                                                                    onError={onError} />
                                                                            </div>
                                                                            {/* <div className='col'>

                                                                                <a className="continue btn btn-primary pull-xs-right" name="continue" data-link-action="register-new-customer" onClick={handleMomo} value="1">
                                                                                    Momo
                                                                                </a>
                                                                            </div> */}


                                                                        </div>

                                                                    </div>

                                                                </form>
                                                            </div>

                                                        </div>
                                                    </div>


                                                </div>
                                                <CartInfo />

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

export default Checkout;