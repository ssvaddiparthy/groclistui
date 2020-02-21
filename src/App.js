import React, { Component } from "react";
import PrivateRoute from "./PrivateRoute";
import { LoginPage } from "./LoginPage";
import { ResultTable } from "./ResultTable";
import { InputTable } from "./InputTable";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

export class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" component={LoginPage} />
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/input" component={InputTable} />
            <PrivateRoute path="/result" component={ResultTable} />
          </Switch>
          <Redirect to="/input"></Redirect>
        </Router>
      </div>
    );
  }
}
