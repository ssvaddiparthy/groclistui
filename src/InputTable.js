import React, { Component } from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import Cookies from "js-cookie";
import { ResultTable } from "./ResultTable";


export class InputTable extends Component {
  weekDays = ["Sunday", "Monday"];
  meals = ["BreakFast"];

  constructor(props) {
    super(props);
    this.state = {
      recipeList: [],
      selectedRecipes: {},
      isSubmitted: false
    };
    this.getRecipes();
  }

  getRecipes(){
    axios.get(`http://localhost:8080/recipe/all`).then(res => {
      this.setState({
        recipeList: res.data.responseData,
      });
    }).catch(function (error) {
      console.log(JSON.stringify(error))
    });
  }

  handleChange(event) {
    event.preventDefault();
    this.state.selectedRecipes[event.target.name] = event.target.value;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      isSubmitted: true
    });
  }

  handleLogout(event) {
    event.preventDefault();
    Cookies.remove("groclist_session_token");
    this.setState({
      isLoggedIn: false
    });
    return <Redirect selectedRecipes={this.state.selectedRecipes} to="/result"/>
  }

  render() {
    
    if (this.state.isSubmitted) {
      return <ResultTable selectedRecipes={this.state.selectedRecipes}></ResultTable>
    }

    if (this.state.recipeList.length === 0) {
      return(
        <h1> Still Loading all recipes...</h1>
      )
    } else {
      return (
        <form style={{ visibility: this.state.hidden ? "hidden" : "visible" }}>
          <table border="1">
            <thead>
              <tr>
                <th name="day-header">Day</th>
                {this.meals.map(function(meal, mealIndex) {
                  return <th name={meal} key={mealIndex}>{meal}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {
                this.weekDays.map(
                  function(weekDay, weekDayIndex){
                    return (
                      <tr name={weekDay} key={weekDayIndex}>
                      <td key="weekday">{weekDay}</td>
                      {
                        this.meals.map(function(meal, mealIndex){
                          return(
                            <td name={weekDay+"-"+meal} key={weekDay+"-"+meal}> 
                            <select
                              name={weekDay+"-"+meal}
                              key={weekDay+"-"+meal}
                              onChange={this.handleChange.bind(this)}
                              >
                              <option key="blankOption">Choose Item to Cook</option>
                              {JSON.parse(this.state.recipeList).map(function(
                                recipe,
                                recipeIndex
                              ) {
                                return <option key={recipeIndex}>{recipe}</option>;
                              })}
                            </select>
                          </td>
                          );
                        }.bind(this))
                      }
                    </tr> 
                    ); 
                  }.bind(this)
                )
              }
            </tbody>
          </table>
          <input
            type="submit"
            value="Submit"
            onClick={this.handleSubmit.bind(this)}
          />
          <input
            type="button"
            value="Logout"
            onClick={this.handleLogout.bind(this)}
          />
        </form>
      ); 
    }
  }
}