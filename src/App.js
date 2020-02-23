import React, { Component } from "react";
import Cookies from 'js-cookie';
import {LoginPage} from './LoginPage';
import {InputTable} from './InputTable';
import {ResultTable} from './ResultTable';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";


export class App extends Component {
  
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" component={LoginPage} exact />
            <Route path="/login" component={LoginPage} exact />
            <Route path="/input" component={InputTable} exact />
            <Route path="/result" component={ResultTable}  />
          </Switch>
        </Router>
      </div>
    );
  }
}
