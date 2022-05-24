import { useHistory } from "react-router-dom";
import { combineReducers } from "redux";
import { LOGIN_SUCCESS, LOGOUT } from "../action/auth";

const user = JSON.parse(localStorage.getItem("user"));
// const initialState = user
//     ? { isLoggedIn: true, user }
//     : { isLoggedIn: false, user: null };

const initialState = {
    isLoggedIn: false,
    user: null
};

function todoUser(state = initialState, action) {

    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log("action", action);
            return { isLoggedIn: true, user: action.payload.user };
        case LOGOUT:

            return {
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}
export default todoUser;