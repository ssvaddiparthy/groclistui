import React, { Component } from 'react'
import './App.css'

import axios from 'axios'

class App extends Component {
  data = [
   ["0.122584", "0.785882", "0.954039", "0.353008"],
   ["1", "2", "0.954039", "0.353008"],
 ];
  constructor () {
    super()
    this.state = {
      username: ''
    }
  }

  getTableBodyAsReactElement() {
    if (!this.state.username) {
      axios.get('http://localhost:8080/recipe/all')
        .then(response => this.setState({username: response.data}))
      console.log(this.state.username);

    }
    return (!this.state.username) ? null : (
      <tbody>
        {this.state.username.map((item) => {                                // changed here
          console.log('item: ', item);
          return (
            <tr>
              <td>{item}</td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  render() {
    return (
      <table border="1">
        {this.getTableBodyAsReactElement()}
      </table>
    )
  }
}
export default App
