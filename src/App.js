import React, { Component } from "react";
import PrivateRoute from "./PrivateRoute";
import { LoginPage } from "./LoginPage";
import { InputTable } from "./InputTable";
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/input" component={InputTable} />
          </Switch>
          <Redirect to="/login"></Redirect>
        </Router>
      </div>
    );
  }
}
