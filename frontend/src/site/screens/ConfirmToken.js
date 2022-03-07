import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import authenApi from '../../api/AuthenApi';

function ConfirmTokenSuccess() {
    const [success, setSuccess] = useState(false);
    const { search } = useLocation();
    console.log("location", search)
    const searchParam = new URLSearchParams(search);
    const token = searchParam.get('token');
    const sendConfirmToken = async () => {
        const params = {
            token: token
        }
        const response = await authenApi.confirmToken(token).then(
            response => {
                if (response == 'success') setSuccess(true);
                console.log("aaaaaaaaaa", response);
            }
        )


    }


    useEffect(() => {
        sendConfirmToken();
    }, [])
    console.log("search", searchParam);
    return (
        <>
            <div style={{ height: '500px' }} >

                {
                    success && (
                        <h4 className='text-center pt-5'>Chúc mừng bạn đã xác nhận tài khoản thành công</h4>
                    )
                }
                {
                    !success && (<>
                        <h4 className='text-center pt-5'>Ooop...Token đã hết hạn. Vui lòng đăng kí lại !!!!</h4>
                        <div className="clearfix text-center user-register">
                            <div>
                                <Link to={'/register'} className="btn btn-primary" data-link-action="sign-in">
                                    Tạo tài khoản
                                </Link>
                            </div>
                        </div>
                    </>

                    )
                }
            </div>
        </>
    );
}

export default ConfirmTokenSuccess;