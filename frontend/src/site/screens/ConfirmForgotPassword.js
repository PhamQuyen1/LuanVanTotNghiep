import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import userApi from '../../api/UserApi';
import { useHistory } from 'react-router-dom';
import authenApi from '../../api/AuthenApi';
import { toast } from 'react-toastify';

const schema = yup.object({
    code: yup.string().required('Code không được rỗng'),
    newPassword: yup.string().required('Password không được rỗng').min(6, 'Password cần ít nhất 6 kí tự'),
    newPasswordConfirm: yup.string().required('Password không được rỗng').oneOf([yup.ref('newPassword'), null], 'Password phải trùng nhau'),
}).required();

function ConfirmForgotPassword() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const [message, setMessage] = useState(null);
    const history = useHistory();
    const onSubmit = data => {
        const request = {
            code: data.code,
            password: data.newPassword
        }
        authenApi.confirmForgotPassword(request).then(
            (response) => {
                toast.success('Đổi mật khẩu thành công')
                history.push('/login');
            }, error => {
                toast.success('Đổi mật khẩu thất bại')
            }
        )
    }
    console.log(message);
    return (
        <>
            <div className="user-reset-password blog">
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
                        <div className="container">
                            <div className="row">
                                <div id="content-wrapper" className="onecol">
                                    <div id="main">
                                        <div className="page-content">
                                            <form className="forgotten-password" onSubmit={handleSubmit(onSubmit)} id="customer-form">
                                                <h1 className="text-center title-page">Quên mật khẩu</h1>
                                                <div className="text-warning pb-2 text-center">{message != null && message}</div>
                                                <div className="form-fields text-left ">
                                                    <div className="form-group center-email-fields">
                                                        <div className="form-group">
                                                            <div>
                                                                <input
                                                                    className="form-control"
                                                                    {...register('code')}
                                                                    type="text"
                                                                    placeholder="Code"
                                                                />
                                                            </div>
                                                            <div className='text-danger'>
                                                                {errors.password?.message}
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <div>
                                                                <input
                                                                    className="form-control"
                                                                    {...register('newPassword')}
                                                                    type="password"
                                                                    placeholder="Nhập mật khẩu mới"
                                                                />
                                                            </div>
                                                            <div className='text-danger'>
                                                                {errors.newPassword?.message}
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div>
                                                                <input
                                                                    className="form-control"
                                                                    {...register('newPasswordConfirm')}
                                                                    type="password"
                                                                    placeholder="Nhập mật khẩu mới"
                                                                />
                                                            </div>
                                                            <div className='text-danger'>
                                                                {errors.newPasswordConfirm?.message}
                                                            </div>
                                                        </div>
                                                        <div className='text-center'>
                                                            <button className="form-control-submit btn btn-primary" type='submit'>
                                                                Xác nhận
                                                            </button>
                                                        </div>

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
        </>
    );
}

export default ConfirmForgotPassword;