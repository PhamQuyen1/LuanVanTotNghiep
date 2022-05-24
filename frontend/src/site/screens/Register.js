import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import authenApi from '../../api/AuthenApi';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import styled from 'styled-components';
import '../../App.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
const BtnFacebook = styled.button`{
    font-family: Helvetica,sans-serif;
    font-weight: 700;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: calc(.27548vw + 12.71074px);
    text-decoration: none;
    text-transform: lowercase;
    transition: background-color .3s,border-color .3s;
    background-color: #4c69ba;
    border: calc(0.06887vw + 0.67769px) solid #4c69ba;
    padding: calc(0.34435vw + 13.38843px) calc(0.34435vw + 18.38843px);
}`
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
    const history = useHistory();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = data => {
        authenApi.register(data).then(response => {
            console.log(response);
            toast.success("Vui lòng check mail")
            history.push("/");
        }, error => {
            console.log(error);
            toast.error("Email đã tồn tại. Vui lòng đăng ký với email khác")
        })
    }
    const responseFacebook = (response) => {
        console.log(response);
        reset({ email: response.email, fullname: response.name })
    };
    const responseGoogle = (response) => {
        console.log(11111111111111111111)
        console.log(response.profileObj);
        reset({ email: response.profileObj.email, fullname: response.profileObj.name })
    }
    const onFailure = (response) => {
        console.log(response)
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
                                            <Link to="/" className="parent"><span>Trang chủ</span></Link>
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

                                                    </div>
                                                    <div>
                                                        <p className='text-danger'>{errors.address?.message}</p>
                                                    </div>
                                                    <div className='text-center'>
                                                        <p className='text-success'>Hoặc ?</p>
                                                    </div>
                                                    <div className='container'>
                                                        <div className='row'>
                                                            <span className='ml-5'>
                                                                <GoogleLogin
                                                                    clientId="18706433484-eltahbehul04cueb63og97rlqiof7jkc.apps.googleusercontent.com"
                                                                    onSuccess={responseGoogle}
                                                                    onFailure={onFailure}
                                                                    buttonText={'Tiếp tục với Google'}
                                                                />

                                                            </span>
                                                            <span>
                                                                <FacebookLogin
                                                                    appId="955719291793653"
                                                                    autoLoad={false}
                                                                    fields="name,email,picture"
                                                                    scope="public_profile,email,user_friends"
                                                                    callback={responseFacebook}
                                                                    icon="fa-facebook mr-4"
                                                                    size="small"
                                                                    textButton='Tiếp tục với Facebook'

                                                                    cssClass='kep-login-facebook-custom'
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>


                                                    <div className='pt-3'>
                                                        <p>Chú ý: Vui lòng kiểm tra mail để xác nhận việc đăng kí tài khoản</p>
                                                    </div>
                                                    <div className="clearfix text-center">
                                                        <div>
                                                            <button className="btn btn-primary" data-link-action="sign-in" type="submit">
                                                                Tạo tài khoản
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                                <div className='text-left'>
                                                    <Link to={'/login'} className="form-control-submit btn btn-primary">
                                                        Quay lại
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
            </div>
        </>
    );
}

export default Register;