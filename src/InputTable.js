import React, { Component } from "react";
import axios from "axios";

export class InputTable extends Component {
  weekDays = ["Sunday", "Monday"];
  meals = ["BreakFast"];

  constructor(props) {
    super(props);
    this.state = {
      recipeList: [],
      selectedRecipes: []
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
    this.state.selectedRecipes.push(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      hidden: true
    });
    this.props.selectionCallback(this.state.selectedRecipes);
  }

  render() {
    
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
                            {JSON.parse(this.state.recipeList).map(function(
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
        </form>
      ); 
    }
  }
}