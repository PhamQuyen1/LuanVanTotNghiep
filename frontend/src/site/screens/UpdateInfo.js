import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import authenApi from '../../api/AuthenApi';
import { useHistory } from 'react-router-dom';
import userApi from '../../api/UserApi';
import { useDispatch } from 'react-redux';
import { updateInfo } from '../components/action/auth';

const schema = yup.object({
    fullname: yup.string().required('Họ tên không được rỗng').min(6, 'Cần ít nhất 6 kí tự').max(30, 'Không thể vượt qua 30 kí tự'),
    phone: yup.string().required('Số điện thoại không được rỗng'),
    address: yup.string().required('Địa chỉ không được rỗng'),
}).required();

function UpdateInfo() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const dispatch = useDispatch();
    const [message, setMessage] = useState(null);
    const history = useHistory();
    const onSubmit = data => {
        const request = {
            fullname: data.fullname,
            address: data.address,
            phone: data.phone
        }
        // userApi.updateInfo(request).then(
        //     (response) => {

        //         if (response == 'Success') {
        //             setMessage(response);
        //             history.push('/profile');
        //         }
        //         // else {
        //         //     setMessage('. Vui lòng nhập lại');
        //         // }

        //     }
        // )

        dispatch(updateInfo(request))
            .then(
                () => {
                    history.push('/profile');
                }
            )
            .catch((error) => console.log(error));
    }
    return (
        <>
            <div class="user-reset-password blog">
                <div class="main-content">
                    <div class="wrap-banner">


                        <nav class="breadcrumb-bg">
                            <div class="container no-index">
                                <div class="breadcrumb">
                                    <ol>
                                        <li>
                                            <Link to="/" className="parent"><span>Trang chủ</span></Link>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span>Cập nhập thông tin</span>
                                            </a>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </nav>
                    </div>


                    <div id="wrapper-site">
                        <div class="container">
                            <div class="row">
                                <div id="content-wrapper" class="onecol">
                                    <div id="main">
                                        <div class="page-content">
                                            <form class="forgotten-password" onSubmit={handleSubmit(onSubmit)} id="customer-form">
                                                <h1 class="text-center title-page">Cập nhập thông tin</h1>
                                                <div class="form-fields ">
                                                    <div class="form-group center-email-fields">
                                                        <div class="form-group">
                                                            <div>
                                                                <input
                                                                    class="form-control"
                                                                    {...register('fullname')}
                                                                    type="text"
                                                                    placeholder="Họ tên"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className='text-danger'>{errors.fullname?.message}</p>
                                                        </div>
                                                        <div class="form-group">
                                                            <div>
                                                                <input
                                                                    class="form-control"
                                                                    {...register('phone')}
                                                                    type="text"
                                                                    placeholder="Số điện thoại"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className='text-danger'>{errors.phone?.message}</p>
                                                        </div>
                                                        <div class="form-group">
                                                            <div>
                                                                <input
                                                                    class="form-control"
                                                                    {...register('address')}
                                                                    type="text"
                                                                    placeholder="Địa chỉ"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className='text-danger'>{errors.address?.message}</p>
                                                        </div>
                                                        <div className='text-center'>
                                                            <button className="form-control-submit btn btn-primary" type='submit'>
                                                                Xác nhận
                                                            </button>
                                                        </div>
                                                        <div className='text-left'>
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

export default UpdateInfo;