import React from 'react';
import ReactDOM from 'react-dom';

function Footer() {
    return (
        <>
            <footer className="footer-one">
                <div className="inner-footer">
                    <div className="container">
                        <div className="footer-top col-lg-12 col-xs-12">
                            <div className="row">
                                <div className="tiva-html col-lg-4 col-md-12 col-xs-12">
                                    <div className="block">
                                        <div className="block-content">
                                            <p className="logo-footer">
                                                <img src="img/home/logo-mobie.png" alt="img" />
                                            </p>
                                            <p className="content-logo">Grocery Store xác định luôn trung thành với những giá trị
                                                cốt lõi của mình để luôn là sự chọn số một của người tiêu dùng
                                            </p>
                                        </div>
                                    </div>
                                    <div className="block">
                                        <div className="block-content">
                                            <ul>
                                                <li>
                                                    <a href="#">Về chúng tôi</a>
                                                </li>
                                                <li>
                                                    <a href="#">Lý do mua hàng</a>
                                                </li>
                                                <li>
                                                    <a href="#">Khách hàng nói gì về chúng tôi</a>
                                                </li>
                                                <li>
                                                    <a href="#">Gặp đội ngũ phát triễn</a>
                                                </li>
                                                <li>
                                                    <a href="#">Liên hệ với người bán</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                                <div className="nov-html col-lg-4 col-sm-6">
                                    <div className="block m-top">
                                        <div className="title-block">
                                            Liên hệ
                                        </div>
                                        <div className="block-content">
                                            <div className="contact-us">
                                                <div className="title-content">
                                                    <i className="fa fa-home" aria-hidden="true"></i>
                                                    <span>Địa chỉ :</span>
                                                </div>
                                                <div className="content-contact address-contact">
                                                    <p>Khu II, Đ. 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ, Việt Nam
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="contact-us">
                                                <div className="title-content">
                                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                                    <span>Email :</span>
                                                </div>
                                                <div className="content-contact mail-contact">
                                                    <p>quyenb1809505@student.ctu.edu.vn</p>
                                                </div>
                                            </div>
                                            <div className="contact-us">
                                                <div className="title-content">
                                                    <i className="fa fa-phone" aria-hidden="true"></i>
                                                    <span>Hotline :</span>
                                                </div>
                                                <div className="content-contact phone-contact">
                                                    <p>+084964-021-941</p>
                                                </div>
                                            </div>
                                            <div className="contact-us">
                                                <div className="title-content">
                                                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                                                    <span>Giờ mở cửa :</span>
                                                </div>
                                                <div className="content-contact hours-contact">
                                                    <p>Thứ hai - Chủ nhật / 08.00AM- 19.00</p>
                                                    <span>(Ngoại trừ ngày lễ)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tiva-modules col-lg-4 col-md-6">

                                    <div className="block m-top1">
                                        <div className="block-content">
                                            <div className="social-content">
                                                <div className="title-block">
                                                    Theo dỗi chúng tôi
                                                </div>
                                                <div id="social-block">
                                                    <div className="social">
                                                        <ul className="list-inline mb-0 justify-content-end">
                                                            <li className="list-inline-item mb-0">
                                                                <a href="#" target="_blank">
                                                                    <i className="fa fa-facebook"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item mb-0">
                                                                <a href="#" target="_blank">
                                                                    <i className="fa fa-twitter"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item mb-0">
                                                                <a href="#" target="_blank">
                                                                    <i className="fa fa-google"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item mb-0">
                                                                <a href="#" target="_blank">
                                                                    <i className="fa fa-instagram"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="block m-top1">
                                        <div className="block-content">
                                            <div className="payment-content">
                                                <div className="title-block">
                                                    Phương thức thanh toán
                                                </div>
                                                <div className="payment-image">
                                                    <img className="img-fluid" src="img/home/payment.png" alt="img" />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </footer>

        </>
    );
}

export default Footer;