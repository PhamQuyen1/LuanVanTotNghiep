import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

function Error() {
    return (
        <>
            <div id="product-sidebar-left " className="mt-5 product-grid-sidebar-left">
                <div className="main-content">
                    <div id="wrapper-site">
                        <div id="content-wrapper">
                            <section className="page-home">
                                <div className="container">
                                    <div className="row center">
                                        <div className="content-404 col-lg-6 col-sm-6 text-center">
                                            <div className="image">
                                                <img className="img-fluid" src="/img/other/image-404.png" alt="Image 404" />
                                            </div>
                                            <h2 className="h4">We're sorry — something has gone wrong on our end.</h2>
                                            <div className="info">
                                                {/* <p>If difficulties persist, please contact the System Administrator of this site and report
                                                    the error below.</p> */}
                                            </div>
                                            <Link className="btn btn-default" to={"/"}>
                                                <i className="fa fa-home" aria-hidden="true"></i>
                                                <span>Back to homepage</span>
                                            </Link>
                                        </div>
                                        <div className="content-right-404 col-lg-6 col-sm-6 text-center">
                                            <a href="#">
                                                <img className="img-fluid" src="/img/other/background.jpg" alt="image 404 right" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Error;