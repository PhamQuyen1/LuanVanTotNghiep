import { getDefaultNormalizer } from '@testing-library/react';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { login } from '../components/action/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import GoogleLogin from 'react-google-login';
import authenApi from '../../api/AuthenApi';

const schema = yup.object({
    email: yup.string().email('Định dạnh email sai !').required('Email không được rỗng'),
}).required();

function ForgotPassword() {
    const [isLogin, setLogin] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const [message, setMessage] = useState(null);
    const { state } = useLocation();
    const history = useHistory();

    const onSubmit = data => {
        // e.preventDefault();
        console.log(data)
        authenApi.forgotPassword(data).then(
            response => {
                toast.success('Code đã được gửi qua email thành công')
                history.push('/confirmForgotPassword')
            }, error => {
                toast.error('Code đã được gửi qua email thất bại')
            }
        )

    }

    return (
        <>
            <div className="user-login blog">
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
                                                <span>Quên mật khẩu</span>
                                            </a>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </nav>

                    </div>


                    <div id="wrapper-site">
                        <div id="content-wrapper" className="full-width">
                            <div id="main">
                                <div className="container">
                                    <h1 className="text-center title-page">Quên mật khẩu</h1>
                                    <div className='text-warning text-center'>
                                        {
                                            message != null && message
                                        }
                                    </div>
                                    <div className="login-form">
                                        <form id="customer-form" onSubmit={handleSubmit(onSubmit)}>
                                            <div>
                                                {/* <GoogleLogin
                                                    clientId="18706433484-i5pioamaqv1rqvrv8ebv2t09fio4v01h.apps.googleusercontent.com"
                                                    onSuccess={responseGoogle}
                                                    onFailure={onFailure}
                                                /> */}

                                            </div>

                                            <div>
                                                <input type="hidden" name="back" value="my-account" />
                                                <div className="form-group no-gutters">
                                                    <label>Email: </label>
                                                    <input
                                                        className="form-control"
                                                        // value={loginForm.email} 
                                                        // onChange={handleOnChangeEmail} 
                                                        // name="email"
                                                        // type="email"
                                                        placeholder=" Email"
                                                        {...register('email')} />
                                                </div>
                                                <p className='text-danger'>{errors.email?.message}</p>

                                            </div>
                                            <div className="clearfix">
                                                <div className="text-center no-gutters">
                                                    <button className="btn btn-primary" data-link-action="sign-in" type="submit">
                                                        Gửi code
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
        </>
    );
}

export default ForgotPassword;