import React, { Component } from "react";
import Cookies from 'js-cookie';

export class LoginPage extends Component{

    handleSubmit(event){
        event.preventDefault();
        Cookies.set("groclist_session_token", true);
    }

    render() {
        return (
            <form>
                <label>UserName: </label><input type="text" placeholder="Enter Username" name="uname" required/>
                <label>Password: </label><input type="password" name="pwd" required/>
                <input type="submit" onClick={this.handleSubmit.bind(this)}/>
            </form>
        );
    }
}