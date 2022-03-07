import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import userApi from '../../api/UserApi';
import { useHistory } from 'react-router-dom';

const schema = yup.object({

    password: yup.string().required('Password không được rỗng').min(6, 'Password cần ít nhất 6 kí tự'),
    newPassword: yup.string().required('Password không được rỗng').min(6, 'Password cần ít nhất 6 kí tự'),
    newPasswordConfirm: yup.string().required('Password không được rỗng').oneOf([yup.ref('newPassword'), null], 'Password phải trùng nhau'),
}).required();

function UpdatePassword() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const [message, setMessage] = useState(null);
    const history = useHistory();
    const onSubmit = data => {
        const request = {
            password: data.password,
            newPassword: data.newPassword
        }
        userApi.updatePassword(request).then(
            (response) => {

                if (response == 'Success') {
                    setMessage(response);
                    history.push('/profile');
                } else {
                    setMessage('Mật khẩu củ không đúng. Vui lòng nhập lại');
                }

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
                                            <a href="#">
                                                <span>Trang chủ</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span>Đổi mật khẩu</span>
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
                                                <h1 className="text-center title-page">Đổi mật khẩu người dùng</h1>
                                                <div className="text-warning pb-2 text-center">{message != null && message}</div>
                                                <div className="form-fields text-left ">
                                                    <div className="form-group center-email-fields">
                                                        <div className="form-group">
                                                            <div>
                                                                <input
                                                                    className="form-control"
                                                                    {...register('password')}
                                                                    type="password"
                                                                    placeholder="Nhập mật khẩu cũ"
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
                                                        <div className=''>
                                                            <Link to={'/profile'} className="form-control-submit btn btn-primary">
                                                                Quay lại
                                                            </Link>
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

export default UpdatePassword;