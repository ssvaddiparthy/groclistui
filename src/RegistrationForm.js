import React, { Component } from "react";
import Cookies from 'js-cookie';
import { Redirect } from "react-router-dom";

export class RegistrationForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isLoggedIn: false
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

    handleSubmit(event) {
        console.log(event.target);
        console.log(event.target.uname.value)
        console.log(event.target.pwd.value)
        console.log(event.target.re_pwd.value)
        console.log(event.target.dob.value)
        console.log(event.target.kid_num.value)
        console.log(event.target.adult_num.value)
        this.setState({
          isSubmitted: true
        });
    }

    render() {
        if (this.state.isLoggedIn) {
            return <Redirect to="/input"></Redirect>
        } else {
            if (this.state.isSubmitted) {
                return (
                  <h1>REGISTRATION IS DONE</h1>
                );
            } else{
                return (
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <label>UserName: </label><input type="text" placeholder="Enter Username" name="uname" required/><br />
                        <label>Password: </label><input type="password" name="pwd" required/><br />
                        <label>Re-Enter Password: </label><input type="password" name="re_pwd" required/><br />
                        <label>Date of Birth: <input type="date" id="birthday" name="dob"></input></label><br />
                        <label>Kids at Home: </label><input type="text" placeholder="Enter Kids at Home" name="kid_num" required/><br />
                        <label>Adults at Home: </label><input type="text" placeholder="Enter Adults at Home" name="adult_num" required/><br />
                        <input type="submit"/><br />
                    </form>
                );
            }
        }
    }
}
