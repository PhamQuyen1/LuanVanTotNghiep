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
import Checkout from './site/screens/Checkout';
import PrivateRoute from './site/route/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Site from './site/screens/Site';
import Dashboard from './dashboard';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
function App() {

  const { user } = useSelector(state => state.todoUser);
  const isAuthenticated = user != null ? true : false;
  console.log("is", isAuthenticated);
  console.log("isUser", user);
  // if (user && user.role.roleName == 'EMPLOYEE') {
  //   return <Redirect to={{
  //     pathname: "/dashboard/order",
  //   }} />
  // }
  // if (user && user.role.roleName == 'EMPLOYEE') {
  //   }
  return (
    <BrowserRouter>

      {/* {
        user && user.role && user.role.roleName !== "USER" ? <Redirect to={{
          pathname: "/dashboard/order",
        }} /> : <Site />
      } */}
      {
        user && user.role && user.role.roleName !== "USER" ? <Dashboard /> : <Site />
      }
      {/* <Site /> */}

    </BrowserRouter>

  );
}

export default App;
