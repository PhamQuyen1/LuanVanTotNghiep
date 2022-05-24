import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../../site/components/action/auth';

function Navigation() {
    const history = useHistory();
    const { user } = useSelector(state => state.todoUser);
    console.log("user", user.role.roleName)
    const dispatch = useDispatch();
    const handleOnLogout = () => {
        dispatch(logout());
        toast.success('Bạn đã đăng xuất', {
            toastId: '1'
        })
        history.push("/");
        // setUser({});
    }
    return (
        <>
            <div className="left-side-bar">
                <div className="brand-logo">
                    <Link to={"/dashboard/home"}>

                        <img src="/vendors/images/logo-mobie.png" alt="" className="light-logo" />
                    </Link>
                    <div className="close-sidebar" data-toggle="left-sidebar-close">
                        <i className="ion-close-round"></i>
                    </div>
                </div>
                <div className="menu-block customscroll">
                    <div className="sidebar-menu">
                        <ul id="accordion-menu">
                            <li >
                                <Link to={"/dashboard/home"} className="dropdown-toggle  no-arrow">
                                    <span className="micon dw dw-house-1"></span><span className="mtext">Trang chủ</span>
                                </Link>

                            </li>
                            <li >
                                <Link to={"/dashboard/order"} className="dropdown-toggle  no-arrow">
                                    <span className="micon"><i className="icon-copy fa fa-minus" aria-hidden="true"></i></span><span className="mtext">Quản lý đơn hàng</span>
                                </Link>

                            </li>
                            <li >
                                <Link to={"/dashboard/product"} className="dropdown-toggle  no-arrow">
                                    <span className="micon"><i className="icon-copy fa fa-minus" aria-hidden="true"></i></span><span className="mtext">Quản lý sản phẩm</span>
                                </Link>

                            </li>
                            <li >
                                <Link to={"/dashboard/category"} className="dropdown-toggle  no-arrow">
                                    <span className="micon"><i className="icon-copy fa fa-minus" aria-hidden="true"></i></span><span className="mtext">Quản lý danh mục</span>
                                </Link>

                            </li>
                            {
                                user.role.roleName == "ADMIN" && (
                                    <li >
                                        <Link to={"/dashboard/user"} className="dropdown-toggle  no-arrow">
                                            <span className="micon"><i className="icon-copy fa fa-minus" aria-hidden="true"></i></span><span className="mtext">Quản lý người dùng</span>
                                        </Link>

                                    </li>
                                )
                            }
                            <li >
                                <Link to={"/dashboard/review"} className="dropdown-toggle  no-arrow">
                                    <span className="micon"><i className="icon-copy fa fa-minus" aria-hidden="true"></i></span><span className="mtext">Quản lý đánh giá</span>
                                </Link>

                            </li>

                            <li >
                                <a onClick={handleOnLogout} className="dropdown-toggle  no-arrow">
                                    <span className="micon"><i className="icon-copy fa fa-minus" aria-hidden="true"></i></span><span className="mtext text-white">Đăng xuất</span>
                                </a>

                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navigation;