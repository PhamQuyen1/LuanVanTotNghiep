import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import orderApi from '../../api/OrderApi';
import ShoppingCartItem from '../components/ShoppingCartItem';

function Profile(props) {

    // const { user } = props;
    // const { user } = useSelector(state => state.todoUser);
    const { user } = useSelector(state => state.todoUser);
    console.log(user);
    const [isFetch, setFetch] = useState(false);
    const [orders, setOrders] = useState({});
    const [param, setParam] = useState({
        email: user.email,
        page: 1,
        sortField: 'orderId',
        sortDir: 'desc',
        paymentMethod: null,
        status: null
    })

    useEffect(() => {
        let mounted = true;
        const fetchOrder = async () => {
            try {

                const response = await orderApi.listAll(param);
                console.log("orders", response);

                setOrders(response);

                setFetch(false)
                // window.location.reload();

            } catch (error) {
                console.log(error);
                mounted = false;
                setFetch(true);
            }
        }
        fetchOrder();


    }, [isFetch])
    console.log('aaa', orders);
    // window.location.reload();
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
                                            <Link to="/" className="parent"><span>Trang chủ</span></Link>
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

                                                {
                                                    Object.keys(orders).length == 0
                                                        ? <p>Bạn chưa đặt đơn hàng nào.</p>
                                                        : <div id="block-history" className="block-center">
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
                                                                    {Object.keys(orders).length != 0 && (
                                                                        orders.orders.map((order, index) => {
                                                                            return <>
                                                                                <tr id={`wishlist_${index}`}>
                                                                                    <td>
                                                                                        {new Date(order.createAt).toISOString().replace('T', ' ').split(".")[0]}

                                                                                    </td>
                                                                                    <td className="bold align_center">
                                                                                        {order.orderAddress}
                                                                                    </td>
                                                                                    <td>{order.orderStatus.description}</td>

                                                                                    <td>{
                                                                                        <NumberFormat value={order.items.reduce((total, { price, quantity }) => total + price * quantity, 0)} displayType={'text'} thousandSeparator={true} suffix={'đ'} />


                                                                                    }</td>
                                                                                    <td>
                                                                                        <a className="text-success" data-toggle="collapse" href={`#open_${index}`} role="button" aria-expanded="false" aria-controls="collapseExample">
                                                                                            + Xem chi tiết
                                                                                        </a>

                                                                                    </td>

                                                                                </tr>
                                                                                <tr>
                                                                                    <td colSpan={'5'} style={{ padding: '0px' }}>
                                                                                        <div className="collapse" id={`open_${index}`}>

                                                                                            <div className="cart-container card card-body">
                                                                                                <div className="cart-overview js-cart">
                                                                                                    <ul className="cart-items">
                                                                                                        {

                                                                                                            order.items.map((item, index) => {
                                                                                                                return <ShoppingCartItem item={item} />
                                                                                                                // <li className="cart-item">
                                                                                                                //     <div className="product-line-grid row justify-content-between">

                                                                                                                //         <div className="product-line-grid-left col-md-2">
                                                                                                                //             <span className="product-image media-middle">
                                                                                                                //                 <a href="product-detail.html">
                                                                                                                //                     <img
                                                                                                                //                         src={`/upload/${item.product.productImages[0].imageUrl}`}
                                                                                                                //                         className="img-fluid"
                                                                                                                //                         alt=""
                                                                                                                //                     />
                                                                                                                //                 </a>
                                                                                                                //             </span>
                                                                                                                //         </div>
                                                                                                                //         <div className="product-line-grid-body col-md-6">
                                                                                                                //             <div className="product-line-info">
                                                                                                                //                 <a className="label" href="product-detail.html" data-id_customization="0">Organic Strawberry Fruits</a>
                                                                                                                //             </div>
                                                                                                                //             <div className="product-line-info product-price">
                                                                                                                //                 <span className="value">£20.00</span>
                                                                                                                //             </div>

                                                                                                                //         </div>
                                                                                                                //         <div className="product-line-grid-right text-center product-line-actions col-md-4">
                                                                                                                //             <div className="row">
                                                                                                                //                 <div className="col-md-5 col qty">
                                                                                                                //                     <div className="label">Số lượng:</div>
                                                                                                                //                     <div className="quantity">
                                                                                                                //                         <input type="text" name="qty" value="1" className="input-group form-control" readonly />


                                                                                                                //                     </div>
                                                                                                                //                 </div>
                                                                                                                //                 <div className="col-md-5 col price">
                                                                                                                //                     <div className="label">Tiền:</div>
                                                                                                                //                     <div className="product-price total">
                                                                                                                //                         £20.00
                                                                                                                //                     </div>
                                                                                                                //                 </div>
                                                                                                                //                 <div className="col-md-2 col text-xs-right align-self-end">
                                                                                                                //                     <div className="cart-line-product-actions ">
                                                                                                                //                         <a className="remove-from-cart" rel="nofollow" href="#" data-link-action="delete-from-cart" data-id-product="1">
                                                                                                                //                             <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                                                                                //                         </a>
                                                                                                                //                     </div>
                                                                                                                //                 </div>
                                                                                                                //             </div>
                                                                                                                //         </div>
                                                                                                                //     </div>
                                                                                                                // </li>
                                                                                                            })
                                                                                                        }


                                                                                                    </ul>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                    </td>
                                                                                </tr>
                                                                            </>

                                                                        })

                                                                    )

                                                                    }



                                                                </tbody>
                                                            </table>

                                                        </div>
                                                }



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