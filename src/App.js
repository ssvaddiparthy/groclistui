import React, { Component } from "react";
import { InputTable } from "./InputTable";
import {LoginPage} from "./LoginPage";
import PrivateRoute from "./PrivateRoute";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeList: [],
      selectedRecipes: [],
      fetchedJson: {},
      fooBar: false,
      showTable: true,
      renderInputTable: false,
      selectionReceived: false
    };
  }

  render() {
    return (
        <Router>
          <div>
            <Route path="/" exact>
              <ul>
                <li><Link to="/login">Login Page</Link></li>
                <li><Link to="/input">Table Page</Link></li>
              </ul>
            </Route>
            <Route path="/login" component={LoginPage}/>
            <PrivateRoute path="/input" component={InputTable}/>
          </div>
        </Router>
    )
  }
}
