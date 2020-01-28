import React, { Component } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import {ResultTable} from "./ResultTable";
import {
  Redirect
} from 'react-router-dom'

export class InputTable extends Component {
  weekDays = ["Sunday", "Monday"];
  meals = ["BreakFast"];

  constructor(props) {
    super(props);
    this.state = {
      selectedRecipes: {},
      choiceRecipes: [],
      hidden: false,
      renderInputTable: false,
      redirect: false
    };
    this.fooBar();
  }

  fooBar() {
    axios.get(`http://localhost:8080/recipe/all`).then(res => {
      this.setState({
        selectedRecipes: res.data,
        renderInputTable: true
      });
    }).catch(function (error) {
      console.log(JSON.stringify(error))
    });
  }

  handleSubmitFooBar(selectedRecipes) {
    if (!this.state.isLoaded) {
      let url =
          "http://localhost:8080/ingredients/?recipes=" +
          selectedRecipes.join(",");
      axios.get(url).then(res => {
        this.setState({
          fetchedJson: res.data,
          isLoaded: true
        });
      });
    }
  }

  handleChange(event) {
    event.preventDefault();
    this.state.choiceRecipes.push(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      hidden: true,
      redirect: true
    });
    this.renderRedirect();
  }

  logOutHandler(event) {
    event.preventDefault();
    Cookies.set("loggedIn", false);
    window.location.reload();
  }

  renderRedirect = () => {
    console.log("Foobar");
    return <Redirect to="/login" />
  };

  render() {
    return ( this.state.renderInputTable &&
      <form style={{ visibility: this.state.hidden ? "hidden" : "visible" }}>
        <table border="1">
          <thead>
            <tr>
              <th>Day</th>
              {this.meals.map(function(meal, mealIndex) {
                return <th key={mealIndex}>{meal}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {this.weekDays.map(
              function(day, dayIndex) {
                return (
                  <tr key={dayIndex}>
                    <td>{day}</td>
                    {
                      <td>
                        <select
                          key={dayIndex}
                          onChange={this.handleChange.bind(this)}
                        >
                          <option key="blankOption">Choose Item to Cook</option>
                          {JSON.parse(this.state.selectedRecipes.responseData).map(function(
                            recipe,
                            recipeIndex
                          ) {
                            return <option key={recipeIndex}>{recipe}</option>;
                          })}
                        </select>
                      </td>
                    }
                  </tr>
                );
              }.bind(this)
            )}
          </tbody>
        </table>
        <input
          type="submit"
          value="Submit"
          onClick={this.handleSubmit.bind(this)}
        />
        <input
            type="submit"
            value="LogOut"
            onClick={this.logOutHandler.bind(this)}
        />
      </form>
    );
  }
}
