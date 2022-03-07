import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import authenApi from '../../api/AuthenApi';

const schema = yup.object({
    email: yup.string().email('Định dạnh email sai !').required('Email không được rỗng'),
    fullname: yup.string().required('Họ tên không được rỗng').min(6, 'Cần ít nhất 6 kí tự').max(30, 'Không thể vượt qua 30 kí tự'),
    password: yup.string().required('Password không được rỗng').min(6, 'Password cần ít nhất 6 kí tự'),
    passwordConfirm: yup.string().required('Password không được rỗng').oneOf([yup.ref('password'), null], 'Password phải trùng nhau'),
    phone: yup.string().required('Số điện thoại không được rỗng'),
    address: yup.string().required('Địa chỉ không được rỗng'),
}).required();
function Register() {
    const [successRegister, setSuccessRegister] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = data => {
        authenApi.register(data).then(response => {
            console.log(response)
        }, error => {
            console.log(error);
        })
    }
    return (
        <>
            <div className="user-register blog">
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
                                                <span>Đăng ký tài khoản</span>
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
                                            <div className="register-form">
                                                <h1 className="text-center title-page">Đăng ký tài khoản</h1>
                                                <form id="customer-form" className="js-customer-form" onSubmit={handleSubmit(onSubmit)}>
                                                    <div>
                                                        <div className="form-group">
                                                            <div>
                                                                <input
                                                                    className="form-control"
                                                                    // name="email"
                                                                    // type="email"
                                                                    placeholder="Email"
                                                                    {...register('email')}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className='text-danger'>{errors.email?.message}</p>
                                                        </div>
                                                        <div className="form-group">
                                                            <div>
                                                                <div className="input-group js-parent-focus">
                                                                    <input
                                                                        className="form-control js-child-focus js-visible-password"
                                                                        // name="password"
                                                                        type="password"
                                                                        placeholder="Password"
                                                                        {...register('password')}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className='text-danger'>{errors.password?.message}</p>
                                                        </div>
                                                        <div className="form-group">
                                                            <div>
                                                                <div className="input-group js-parent-focus">
                                                                    <input
                                                                        className="form-control js-child-focus js-visible-password"
                                                                        // name="passwordCònirm"
                                                                        type="password"
                                                                        placeholder="Nhập lại password"
                                                                        {...register('passwordConfirm')}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className='text-danger'>{errors.passwordConfirm?.message}</p>
                                                        </div>
                                                        <div className="form-group">
                                                            <div>
                                                                <input
                                                                    className="form-control"
                                                                    // name="fullname"
                                                                    type="text"
                                                                    placeholder="Họ tên"
                                                                    {...register('fullname')}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className='text-danger'>{errors.fullname?.message}</p>
                                                        </div>
                                                        <div className="form-group">
                                                            <div>
                                                                <input
                                                                    className="form-control"
                                                                    // name="phone"
                                                                    type="text"
                                                                    placeholder="Số điện thoại"
                                                                    {...register('phone')}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className='text-danger'>{errors.phone?.message}</p>
                                                        </div>


                                                        <div className="form-group">
                                                            <div>
                                                                <input
                                                                    className="form-control"
                                                                    // name="address"
                                                                    type="text"
                                                                    placeholder="Địa chỉ"
                                                                    {...register('address')}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p>Chú ý: Vui lòng kiểm tra mail để xác nhận việc đăng kí tài khoản</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className='text-danger'>{errors.address?.message}</p>
                                                    </div>
                                                    <div className="clearfix text-center">
                                                        <div>
                                                            <button className="btn btn-primary" data-link-action="sign-in" type="submit">
                                                                Tạo tài khoản
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
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

export default Register;