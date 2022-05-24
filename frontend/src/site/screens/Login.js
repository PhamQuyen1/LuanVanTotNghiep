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

const schema = yup.object({
    email: yup.string().email('Định dạnh email sai !').required('Email không được rỗng'),
    password: yup.string().required('Password không được rỗng').min(6, 'Password cần ít nhất 6 kí tự'),
}).required();

function Login() {

    // const [loginForm, setLoginForm] = useState({
    //     email: null,
    //     password: null
    // })
    const [isLogin, setLogin] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();
    const { state } = useLocation();
    const history = useHistory();

    const onSubmit = data => {
        // e.preventDefault();
        console.log(data)
        dispatch(login(data.email, data.password))
            .then(response => {
                // history.push("/");
                setLogin(true);
                console.log('response', response)
                //     console.log(state?.from.pathname);
                //     return <Redirect to={'/'} />
                //     // console.log(state?.form.pathname ? state?.form.pathname : '/');
                //     // history.push(state?.form.pathname ? state?.form.pathname : '/');
                // }

            })
            .catch((error) => {
                console.log(error);
                setMessage('Tên đăng nhập hoặc mật khẩu không chính xác')
            });

    }

    if (isLogin) {
        console.log(state?.from.pathname);
        toast.info("Đã đăng nhập thành công", {
            toastId: 'aa'
        })
        return <Redirect to={state?.from || '/'} />
        // console.log(state?.form.pathname ? state?.form.pathname : '/');
        // history.push(state?.form.pathname ? state?.form.pathname : '/');
    }
    const responseGoogle = (response) => {
        console.log(11111111111111111111)
        console.log(response);
    }
    const onFailure = (response) => {
        console.log(response)
    }
    // const handleOnChangeEmail = (e) => {
    //     setLoginForm({ ...loginForm, email: e.target.value });
    // }
    // const handleOnChangePassword = (e) => {

    //     setLoginForm({ ...loginForm, password: e.target.value });
    // }
    console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
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
                                            {/* <div>
                                                <GoogleLogin
                                                    clientId="18706433484-eltahbehul04cueb63og97rlqiof7jkc.apps.googleusercontent.com"
                                                    onSuccess={responseGoogle}
                                                    onFailure={onFailure}
                                                    buttonText={'Tiếp tục với Google'}
                                                />

                                            </div> */}
                                            {/* <a href='http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000/login'>aaaaaaaaaaaaaaa</a> */}
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
                                                    <button className="btn btn-primary" data-link-action="sign-in" type="submit">
                                                        Đăng nhập
                                                    </button>
                                                </div>

                                                <div className="text-center no-gutters">
                                                    <input type="hidden" name="submitLogin" value="1" />

                                                    <Link to={'/register'} className="btn btn-default">
                                                        Đăng ký ?
                                                    </Link>
                                                    <Link to={'/forgotPassword'} className="btn btn-default">
                                                        Quên mật khẩu ?
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