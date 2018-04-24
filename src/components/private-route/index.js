import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, authed, componentProps, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...componentProps} />
                : <Redirect to={{pathname: "/", state: {from: props.location}}} />
            }
        />
    )
};

export default PrivateRoute;