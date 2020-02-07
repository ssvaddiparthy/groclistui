import React, { Component } from "react";
import Cookies from 'js-cookie';
import { InputTable } from "./InputTable";

export class LoginPage extends Component{

    handleSubmit(event){
        event.preventDefault();
        Cookies.set("groclist_session_token", true);
        return <InputTable />
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