import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Profile from '../site/screens/Profile';
import Site from '../site/screens/Site';
import UpdateInfo from '../site/screens/UpdateInfo';
import UpdatePassword from '../site/screens/UpdatePassword';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Category from './screens/Category';
import Home from './screens/Home';
import Order from './screens/Order';
import Product from './screens/Product';
import Review from './screens/Review';
import SaveOrUpdateCategory from './screens/SaveOrUpdateCategory';
import UpdateProduct from './screens/UpdateProduct';
import User from './screens/User';

function Dashboard() {
    return (
        <>
            <Header />



            <Navigation />


            <div className="main-container">
                <div className="pd-ltr-20">

                    <Switch>

                        <Route path={"/dashboard/order"} exact>
                            <Order></Order>
                        </Route>
                        <Route path={"/dashboard/product"} exact>
                            <Product />
                        </Route>
                        <Route path={"/dashboard/category"} exact>
                            <Category />
                        </Route>
                        <Route path={"/dashboard/user"} exact>
                            <User />
                        </Route>
                        <Route path={"/dashboard/saveOrUpdateCategory/:categoryId"} exact>
                            <SaveOrUpdateCategory />
                        </Route>
                        <Route path={"/dashboard/saveOrUpdateCategory"} exact>
                            <SaveOrUpdateCategory />
                        </Route>
                        <Route path={"/dashboard/updateProduct/:productId"} exact>
                            <UpdateProduct />
                        </Route>
                        <Route path={"/dashboard/updateProduct"} exact>
                            <UpdateProduct />
                        </Route>
                        <Route path={"/profile"} exact>
                            <Profile />
                        </Route>
                        <Route path="/updateInfo" exact>
                            <UpdateInfo />
                        </Route>
                        <Route path="/updatePassword" exact>
                            <UpdatePassword />
                        </Route>
                        <Route path="/dashboard/review" exact>
                            <Review />
                        </Route>
                        <Route path="/dashboard/review/:productId" exact>
                            <Review />
                        </Route>
                        <Route path={""} exact>
                            <Home />
                        </Route>

                    </Switch>
                </div>
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
        </>
    );
}

export default Dashboard;