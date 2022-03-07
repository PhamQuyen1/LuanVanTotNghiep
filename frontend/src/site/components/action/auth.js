import authenApi from "../../../api/AuthenApi";
import userApi from "../../../api/UserApi";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const UPDATE_INFO = 'UPDATE_INFO';

export const login = (username, password) => (dispatch) => {

    return authenApi.login(username, password).then(
        response => {
            console.log(response);
            localStorage.setItem("user", JSON.stringify(response));
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response
            })
            return Promise.resolve();
        }, error => {
            return Promise.reject();
        }
    )

}

export const logout = () => (dispatch) => {

    dispatch({
        type: LOGOUT
    })
    localStorage.removeItem('user');
}

export const updateInfo = (data) => (dispatch) => {
    return userApi.updateInfo(data).then(
        response => {

            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: response }
            })
            return Promise.resolve();
        }, error => {
            return Promise.reject();
        }
    )

}
