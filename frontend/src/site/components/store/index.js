import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import shoppingCart from "../reducers";
import userCurrent from "../reducers/auth";

const store = createStore(shoppingCart, applyMiddleware(thunkMiddleware));
// export const storeUser = createStore(userCurrent, applyMiddleware(thunkMiddleware));

export default store;