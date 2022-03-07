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

const schema = yup.object({
    email: yup.string().email('Định dạnh email sai !').required('Email không được rỗng'),
    password: yup.string().required('Password không được rỗng').min(6, 'Password cần ít nhất 6 kí tự'),
}).required();

function Login() {

    // const [loginForm, setLoginForm] = useState({
    //     email: null,
    //     password: null
    // })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();

    const history = useHistory();

    const onSubmit = data => {
        // e.preventDefault();
        console.log(data)
        dispatch(login(data.email, data.password))
            .then(() => {
                history.push("/");
            })
            .catch(() => {
                setMessage('Tên đăng nhập hoặc mật khẩu không chính xác')
            });

    }

    // const handleOnChangeEmail = (e) => {
    //     setLoginForm({ ...loginForm, email: e.target.value });
    // }
    // const handleOnChangePassword = (e) => {

    //     setLoginForm({ ...loginForm, password: e.target.value });
    // }
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
                                            <a href="#">
                                                <span>Trang chủ</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span>Đăng nhập</span>
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
                                    <h1 className="text-center title-page">Đăng nhập</h1>
                                    <div className='text-warning text-center'>
                                        {
                                            message != null && message
                                        }
                                    </div>
                                    <div className="login-form">
                                        <form id="customer-form" onSubmit={handleSubmit(onSubmit)}>
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
                                                <label>Password: </label>
                                                <div className="form-group no-gutters">
                                                    <div className="input-group js-parent-focus">

                                                        <input
                                                            className="form-control js-child-focus js-visible-password"
                                                            // value={loginForm.password} 
                                                            // onChange={handleOnChangePassword} 
                                                            // name="password"
                                                            type="password"
                                                            placeholder="Password"
                                                            {...register('password')} />
                                                    </div>
                                                </div>
                                                <p className='text-danger'>{errors.password?.message}</p>
                                            </div>
                                            <div className="clearfix">
                                                <div className="text-center no-gutters">
                                                    <input type="hidden" name="submitLogin" value="1" />
                                                    <button className="btn btn-primary" data-link-action="sign-in" type="submit">
                                                        Đăng nhập
                                                    </button>
                                                    <Link to={'/register'} className="btn btn-default">
                                                        Đăng ký ?
                                                    </Link>
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

export default Login;