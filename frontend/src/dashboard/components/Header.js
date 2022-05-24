import React from 'react';

import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function Header() {
    const { user } = useSelector(state => state.todoUser);
    return (
        <>
            <div className="header">
                <div className="header-left">
                    <div className="menu-icon dw dw-menu"></div>
                    <div className="search-toggle-icon dw dw-search2" data-toggle="header_search"></div>
                    <div className="header-search">

                    </div>
                </div>
                <div className="header-right">
                    <div className="user-info-dropdown">
                        <Link to={"/profile"}>
                            {/* <div className="dropdown">
                            <a href="#" className='mt-5' role="button" data-toggle="dropdown">
                                <span className="user-icon">
                                    <img src="/vendors/images/admin-img.png" />
                                </span>
                                <span className="user-name pt-5">Phạm Quyền</span>
                            </a>

                        </div> */}
                            <span className="user-icon">
                                <img src="/vendors/images/admin-img.png" width={'50px'} />
                            </span>
                            <span className="user-name d-inline-block mt-3"><h6>{user.fullname}</h6></span>
                        </Link>
                    </div>

                </div>

            </div>
        </>
    );
}

export default Header;