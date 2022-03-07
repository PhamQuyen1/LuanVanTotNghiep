import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Home from './site/screens/Home';
import Header from './site/components/Header';
import Footer from './site/components/Footer';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AboutUs from './site/screens/AboutUs';
import Product from './site/screens/Product';
import ProductDetail from './site/screens/ProductDetail';
import ShoppingCart from './site/screens/ShoppingCart';
import Login from './site/screens/Login';
import { useSelector } from 'react-redux';
import Register from './site/screens/Register';
import ConfirmTokenSuccess from './site/screens/ConfirmToken';
import Profile from './site/screens/Profile';
import UpdatePassword from './site/screens/UpdatePassword';
import UpdateInfo from './site/screens/UpdateInfo';
function App() {

  const { user } = useSelector(state => state.todoUser);

  return (
    <BrowserRouter>
      <div id="home">
        <Header />

        <Switch>
          <Route path="/product" exact>
            <Product />
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
          <Route path="/shoppingCart" exact>
            <ShoppingCart />
          </Route>
          <Route path="/about-us">
            <AboutUs />
          </Route>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          {/* <Route path="/productDetail" exact={true}>
            <ProductDetail />
          </Route> */}
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>

  );
}

export default App;
