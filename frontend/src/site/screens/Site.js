import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import '../../App.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PrivateRoute from '../route/PrivateRoute';
import AboutUs from './AboutUs';
import Checkout from './Checkout';
import ConfirmForgotPassword from './ConfirmForgotPassword';
import ConfirmTokenSuccess from './ConfirmToken';
import Error from './Error';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import Login from './Login';
import Product from './Product';
import ProductDetail from './ProductDetail';
import Profile from './Profile';
import Register from './Register';
import ShoppingCart from './ShoppingCart';
import UpdateInfo from './UpdateInfo';
import UpdatePassword from './UpdatePassword';
import WishLists from './WishList';

function Site() {
    const history = useHistory()
    const { user } = useSelector(state => state.todoUser);
    const isAuthenticated = user != null ? true : false;
    console.log("is", isAuthenticated);
    console.log("isUser", user);
    // if (user && user.role.roleName == 'EMPLOYEE') {
    //     history.push('/dashboard/order')
    // }
    return (
        <>
            <PayPalScriptProvider
                options={{
                    "client-id": "ATFhfK6je9YFaWZoNi64zfuH6c06WiuPj4LDlPbJj9XZxQtd0kp0JysvmEqM3AkuXHQvvFW_93HHCaGM"
                }}

            >
                <div id="home">
                    <Header >

                    </Header>

                    <Switch>
                        <Route path="/product" exact>
                            <Product />
                        </Route>
                        <Route path="/shoppingCart" exact>
                            <ShoppingCart />
                        </Route>
                        <Route path="/updateInfo" exact>
                            <UpdateInfo />
                        </Route>
                        <Route path="/updatePassword" exact>
                            <UpdatePassword />
                        </Route>
                        <Route path="/profile" exact>
                            <Profile user={user} />
                        </Route>
                        <Route path="/confirm" exact>
                            <ConfirmTokenSuccess />
                        </Route>
                        <Route path="/register" exact>
                            <Register />
                        </Route>
                        <Route path="/product/category/:categoryId" exact>
                            <Product />
                        </Route>
                        <Route path="/product/:productId" exact>
                            <ProductDetail />
                        </Route>
                        <Route path="/login" exact>
                            <Login />
                        </Route>
                        <Route path="/forgotPassword" exact>
                            <ForgotPassword />
                        </Route>
                        <Route path="/confirmForgotPassword" exact>
                            <ConfirmForgotPassword />
                        </Route>
                        <PrivateRoute path="/checkout" exact user={user}>
                            <Checkout />
                        </PrivateRoute>
                        <Route path="/about-us">
                            <AboutUs />
                        </Route>
                        <Route path="/" exact={true}>
                            <Home />
                        </Route>
                        <Route path="/wishList" exact>
                            <WishLists />
                        </Route>
                        <Route path="*" exact>
                            <Error />
                        </Route>
                        {/* <Route path="/productDetail" exact={true}>
            <ProductDetail />
          </Route> */}
                    </Switch>

                    <Footer />

                </div>

                <ToastContainer
                    position="top-right"
                    autoClose={300}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />
            </PayPalScriptProvider>
        </>
    );
}

export default Site;