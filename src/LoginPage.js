import React, { Component } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { Redirect } from "react-router-dom";

export class LoginPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isLoggedIn: false,
          redirectToRegister: false,
          groclist_session_token: ""
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
        axios({
          method: 'post',
          url: `http://localhost:8080/authenticate`,
          headers: { 'Content-Type': 'application/json' },
          data: {
            uname: event.target.uname.value,
            password: event.target.pwd.value
          }
        }).then(res => {
          Cookies.set('groclist_session_token', res.data.jwt)
          this.setState({
            groclist_session_token: res.jwt,
            isLoggedIn: true
          });
        }).catch(function (error) {
          console.log(JSON.stringify(error))
        });
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
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>UserName: </label><input type="text" placeholder="Enter Username" name="uname" required/>
                    <br />
                    <label>Password: </label><input type="password" name="pwd" required/>
                    <br />
                    <input type="submit" />
                    <br />
                    <button onClick={this.handleRedirectRegister.bind(this)}>Register</button>
                    <br />
                </form>
            );
        }
    }
}
