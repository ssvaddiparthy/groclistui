import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
 

export class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRecipes: this.props.location.state.selectedRecipes,
      fetchedJson: {}
    };
  }

  checkCookieBasedLogin() {
    let session_cookie = Cookies.get("groclist_session_token");
    if (
      session_cookie === null ||
      session_cookie === undefined ||
      session_cookie === "" ||
      session_cookie == false ||
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

  handleLogout(event) {
    event.preventDefault();
    Cookies.remove("groclist_session_token");
    this.setState({
      isLoggedIn: false
    });
  }

  componentDidMount() {
    this.checkCookieBasedLogin();
  }

  getIngredients() {
    console.log(this.state.selectedRecipes);
    let url =
      "http://localhost:8080/ingredients/?recipes=" +
      Object.values(this.state.selectedRecipes).join(",");
    console.log(url);
    axios.get(url).then(res => {
      this.setState({
        fetchedJson: JSON.parse(res.data.responseData)
      });
    });
  }

  componentDidMount() {
    this.getIngredients();
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
