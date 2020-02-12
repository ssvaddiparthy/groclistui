import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { LoginPage } from "./LoginPage";

export const isLogin = () => {
  let session_cookie = Cookies.get("groclist_session_token");
  if (
    session_cookie === null ||
    session_cookie === undefined ||
    session_cookie === "" ||
    session_cookie === false ||
    session_cookie === "false"
  ) {
    return false;
  } else {
    return true;
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLogin() ? <Component {...props} /> : <LoginPage/>
      }
    />
  );
};

export default PrivateRoute;
