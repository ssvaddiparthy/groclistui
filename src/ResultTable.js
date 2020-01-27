import React, { Component } from "react";
import Cookies from "js-cookie";

export class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedJson: {},
      isLoaded: false
    };
  }

  logOutHandler(event) {
    event.preventDefault();
    Cookies.set("loggedIn", false);
    window.location.reload();
  }

  render() {
    return this.state.isLoaded ? (
        <div>
          <h1 align="center">Ingredients</h1>
          <table border="1" align="center">
            <tbody>
            {JSON.parse(this.props.recipeList).map(function(ingredient, ingredientIndex) {
              return (
                  <tr key={ingredientIndex}>
                    <td>{ingredient.name}</td>
                    <td>{ingredient.amount}</td>
                    <td>{ingredient.unit}</td>
                  </tr>
              );
            })}
            </tbody>
          </table>
          <input
              type="submit"
              value="LogOut"
              onClick={this.logOutHandler.bind(this)}
          />
        </div>
    ) : (
        <div>Loading...</div>

    );
  }
}
