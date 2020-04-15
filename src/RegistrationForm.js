import React, { Component } from "react";
import Cookies from 'js-cookie';
import { Redirect } from "react-router-dom";
import axios from "axios";

export class RegistrationForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isLoggedIn: false,
          isRegistered: false,
          isSubmitted: false
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
        this.setState({
          isSubmitted: true
        });
        let currentComponent = this;
        axios.post('http://localhost:8080/register', {
          uname: event.target.uname.value,
          lname: event.target.lname.value,
          fname: event.target.fname.value,
          email: event.target.email.value,
          pwd: event.target.pwd.value,
          re_pwd: event.target.re_pwd.value,
          dob: event.target.dob.value,
          kid_num: event.target.kid_num.value,
          adult_num: event.target.adult_num.value
        })
        .then(function (response) {
          console.log(response);
          currentComponent.setState({
            isRegistered: true,
            isSubmitted: true
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    render() {
        if (this.state.isLoggedIn) {
            return <Redirect to="/input"></Redirect>
        } else {
            if (this.state.isSubmitted) {
              if (this.state.isRegistered){
                return <Redirect to="/input"></Redirect>
              } else{
                return <h1>.....waiting to register</h1>
              }
            } else{
                return (
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <label>User Name: </label><input type="text" placeholder="Enter Username" name="uname" required/><br />
                        <label>First Name: </label><input type="text" placeholder="Enter First Name" name="fname" required/><br />
                        <label>Last Name: </label><input type="text" placeholder="Enter Last Name" name="lname" required/><br />
                        <label>email: </label><input type="email" placeholder="Enter email" name="email" required/><br />
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
