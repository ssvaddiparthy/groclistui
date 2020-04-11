import React, { Component } from "react";
import {LoginPage} from './LoginPage';
import {InputTable} from './InputTable';
import {ResultTable} from './ResultTable';
import {RegistrationForm} from './RegistrationForm';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


export class App extends Component {
  
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" component={LoginPage} exact />
            <Route path="/login" component={LoginPage} exact />
            <Route path="/register" component={RegistrationForm} exact />
            <Route path="/input" component={InputTable} exact />
            <Route path="/result" component={ResultTable}  />
          </Switch>
        </Router>
      </div>
    );
  }
}
