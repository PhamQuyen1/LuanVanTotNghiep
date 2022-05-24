import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

function AboutUs() {
    return (
        <>
            <div className="main-content">
                <div id="wrapper-site">
                    <div id="content-wrapper">


                        <nav className="breadcrumb-bg">
                            <div className="container no-index">
                                <div className="breadcrumb">
                                    <ol>
                                        <li>

                                            <Link to="/" className="parent"><span>Trang chủ</span></Link>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span>Giới thiệu</span>
                                            </a>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </nav>
                        <div id="main">
                            <div className="page-home">
                                <div className="container">
                                    <div className="about-us-content">

                                        <h1 className="title-page">Giới thiệu về chúng tôi</h1>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6 right">
                                                <a href="#">
                                                    <img className="img-fluid" src="img/other/1.jpg" alt="#" />
                                                </a>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 left">
                                                <div className="cms-block f-right">
                                                    <h3 className="page-subheading">Chúng tôi là ai ?</h3>
                                                    <p>Grocery Store laf website thương mai điện tử của Công ty TNHH Nông sản Thử nghiệm thành lập tháng 01/2022.
                                                        Trải qua nhiều thăng trầm, chúng tôi dần hình thành một đội ngũ trẻ vững vàng và một mô hình kinh doanh tiềm năng để thực hiện được sứ mệnh mang nông sản Việt chất lượng cao đến với người tiêu dùng khắp Việt Nam và xuất khẩu bền vững ra thế giới.</p>
                                                    <p>Chúng tôi mong muốn xây dựng một công ty kinh doanh nông sản bền vững,
                                                        có thể tồn tại hàng trăm năm và có nhiều đóng góp trong chuỗi giá trị nông sản Việt.</p>


                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 right">
                                                <div className="cms-block f-left">
                                                    <h3 className="page-subheading">Cam kết của chúng tôi</h3>
                                                    <p>Với hệ thống bán lẻ, chúng tôi cam kết cung cấp giải pháp về thực phẩm tươi ngon cho bữa cơm gia đình thêm an vui mỗi ngày.
                                                        Chúng tôi tin với sản phẩm ngon về khẩu vị, lành về sức khỏe cùng dịch vụ bán lẻ thân thiện và chuyên nghiệp,
                                                        được vận hành bởi đội ngũ trẻ tử tế, tận tâm và có sự hỗ trợ từ các đối tác có kinh nghiệm sẽ sớm mở rộng được hệ thống,
                                                        đem lại nhiều đóng góp hơn cho cộng đồng.</p>
                                                    <p>Qua 4 năm dấn thân tìm hiểu, trải nghiệm ngành nông nghiệp, bán lẻ, Grocery Store đã xây dựng được hệ thống cửa hàng hoạt động hiệu quả mặc dù đặt gần nhau, cũng như gần với các nhà bán lẻ lâu năm như CoopFood, SatraFood, Vinmart hay các chợ truyền thống lâu năm.</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 left">
                                                <a href="#">
                                                    <img className="img-fluid" src="img/other/2.jpg" alt="#" />
                                                </a>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 right">
                                                <a href="#">
                                                    <img className="img-fluid" src="img/other/3.jpg" alt="#" />
                                                </a>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 left">
                                                <div className="cms-block f-right">
                                                    <h3 className="page-subheading no-before">Giá trị cốt lõi</h3>

                                                    <div className="item">

                                                        <p>Grocery Store xác định luôn trung thành với những giá trị cốt lõi của mình để
                                                            luôn là sự chọn số một của người tiêu dùng. Hệ thống bao gồm:
                                                        </p>
                                                        <ul >
                                                            <li>1. Chất lượng dịch vụ phải tốt nhất</li>
                                                            <li>2. Sản phẩm phong phú, thiết kế đa dạng, chất liệu độc đáo luôn hợp xu hướng</li>
                                                            <li>3. Thanh toán an toàn, tiện lợi tiết kiệm thời gian</li>
                                                            <li>4. Giao hàng nhanh chóng, đúng hẹn</li>
                                                            <li>5. Chăm sóc khách hàng 24/7</li>
                                                        </ul>
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
            </div>
        </>
    );
}

export default AboutUs;