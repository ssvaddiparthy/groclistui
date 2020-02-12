import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

export const login = () => {
  Cookies.set("loggedIn", true);
};

export const logout = () => {
  Cookies.set("loggedIn", false);
};

export const isLogin = () => {
  return Cookies.get("loggedIn");
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLogin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
