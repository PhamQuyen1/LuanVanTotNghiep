import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

function PrivateRoute({ children, user, ...rest }) {
    console.log("r", user);
    console.log('abcd', user && user.role.roleName == 'ADMIN' || user && user.role.roleName == 'EMPLOYEE');
    return (
        <Route
            {...rest}
            render={({ location }) => {
                // if (user && user.role.roleName == 'ADMIN' || user && user.role.roleName == 'EMPLOYEE')
                //     return <Redirect to={{
                //         pathname: "/dashboard/home",
                //     }} />
                // else {
                return user ? (
                    children
                ) : (
                    <Redirect to={{
                        pathname: "/login",
                        state: { from: location },
                    }} />
                );
                // }
            }}
        />
    );
}
export default PrivateRoute;