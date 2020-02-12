import React, { Component } from "react";
import Cookies from "js-cookie";
import { LoginPage } from "./LoginPage";
import { InputTable } from "./InputTable";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  checkCookieBasedLogin() {
    let session_cookie = Cookies.get("groclist_session_token");
    if (
      session_cookie === null ||
      session_cookie === undefined ||
      session_cookie === ""
    ) {
      this.setState({
        isLoggedIn: false
      });
    } else {
      this.setState({
        isLoggedIn: true
      });
    }
  }

  componentDidMount() {
    this.checkCookieBasedLogin();
  }

  render() {
    if (this.state.isLoggedIn) {
      return <InputTable />;
    } else {
      return <LoginPage />;
    }
  }
}
