import React, { Component } from "react";
import { InputTable } from "./InputTable";
import {LoginPage} from "./LoginPage";
import Cookies from 'js-cookie';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  checkCookieBasedLogin(){
    let session_cookie = Cookies.get("groclist_session_token");
    console.log(session_cookie);
    if (session_cookie === null || session_cookie === undefined || session_cookie === "") {
      this.setState({
        isLoggedIn: false
      });
    } else {
      this.setState({
        isLoggedIn: true
      });
    }
  }

  render() {
    if (this.state.isLoggedIn) {
      return <InputTable></InputTable>
    } else{
      return <LoginPage></LoginPage>
    }
  }
}
