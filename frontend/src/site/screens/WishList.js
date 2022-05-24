import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import userApi from '../../api/UserApi';

function WishLists() {

    const [wishList, setWithList] = useState([]);
    const [update, setUpdate] = useState(false);
    const deleteWishList = (productId) => {
        console.log("delete", productId);

        userApi.deleteWishList(+productId).then(
            response => {
                toast.success("Xóa khỏi danh sách yêu thích thành công")
                setUpdate(!update);
            },
            error => {
                toast.error("Xóa khỏi danh sách yêu thích thất bại")
            }
        )
    }
    useEffect(() => {
        userApi.getWishList().then(
            response => {
                console.log(1, response);
                setWithList(response);
            }
        )
    }, [update])
    return (
        <>
            <div className="user-wishlist blog">
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
                                                <span>Wishlists</span>
                                            </a>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </nav>

                    </div>


                    <div id="wrapper-site">
                        <div className="container">
                            <div className="row">
                                <div id="content-wrapper" className="col-xs-12 col-sm-12 col-md-12 col-lg-12 onecol">
                                    <div id="main">
                                        <div id="content" className="page-content">
                                            {
                                                wishList.length != 0 && (
                                                    <div id="mywishlist">
                                                        <h1 className="title-page">My Wishlists</h1>

                                                        <div id="block-history" className="block-center">
                                                            <table className=" table stripe hover nowrap">
                                                                <thead>
                                                                    <tr>
                                                                        <th >Name</th>
                                                                        <th >Hình ảnh</th>
                                                                        <th >Giá</th>

                                                                        <th >Link sản phẩm</th>

                                                                        <th >Xóa</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        wishList.map((product, index) => {
                                                                            return <tr id={`wishlist_${index}`} key={index}>
                                                                                <td>
                                                                                    <a>{product.productName}</a>
                                                                                </td>
                                                                                <td className="bold align_center">
                                                                                    <img src={`/upload/${product.productImages[0].imageUrl}`} width="70" height="70" alt="" />
                                                                                </td>
                                                                                <td><NumberFormat value={product.price - product.price * product.discount / 100} displayType={'text'} thousandSeparator={true} suffix={' đ'} /></td>
                                                                                <td><Link to={`/product/${product.productId}`}>Xem</Link></td>
                                                                                <td>
                                                                                    <button className="btn btn-default " onClick={() => deleteWishList(product.productId)}>Xóa</button>
                                                                                </td>

                                                                            </tr>
                                                                        })
                                                                    }

                                                                </tbody>
                                                            </table>
                                                        </div>

                                                    </div>
                                                )
                                            }
                                            {
                                                wishList.length == 0 && (
                                                    <h4 className='text-warning '>Danh sách yêu thích rỗng</h4>
                                                )
                                            }

                                            <div className="page-home">
                                                <Link className="btn btn-default" to={"/"}>
                                                    <i className="fa fa-home" aria-hidden="true"></i>
                                                    <span>Trang chủ</span>
                                                </Link>
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

export default WishLists;