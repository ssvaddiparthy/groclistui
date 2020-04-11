import React, { Component } from "react";
import Cookies from 'js-cookie';
import { Redirect } from "react-router-dom";

export class LoginPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isLoggedIn: false,
          redirectToRegister: false
        };
    }
    
    componentDidMount(){
        this.checkCookieBasedLogin()
    }

    checkCookieBasedLogin() {
        let session_cookie = Cookies.get("groclist_session_token");
        if (
          session_cookie === null ||
          session_cookie === undefined ||
          session_cookie === "" ||
          session_cookie === false ||
          session_cookie === "false"
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

    handleSubmit(event){
        event.preventDefault();
        Cookies.set("groclist_session_token", true);
        this.checkCookieBasedLogin()
    }

    handleRedirectRegister(event){
      this.setState({
        "redirectToRegister": true
      });
    }

    render() {
        if (this.state.isLoggedIn) {
            return <Redirect to="/input"></Redirect>
        } else if(this.state.redirectToRegister){
            return <Redirect to="/register"></Redirect>
        } else {
            return (
                <form>
                    <label>UserName: </label><input type="text" placeholder="Enter Username" name="uname" required/>
                    <br />
                    <label>Password: </label><input type="password" name="pwd" required/>
                    <br />
                    <input type="submit" onClick={this.handleSubmit.bind(this)}/>
                    <br />
                    <button onClick={this.handleRedirectRegister.bind(this)}>Register</button>
                    <br />
                </form>
            );
        }
    }
}
