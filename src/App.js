import React, {Component} from 'react'
import './App.css'
import axios from 'axios'

class App extends Component {
  weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  meals = ["BreakFast", "Lunch", "Dinner"]

  constructor(props) {
    super(props);
    this.state = {
      recipeList: []
    }
  }

  renderTableHeader() {
    return this.meals.map((key, mealIndex) => {
      return <th key={mealIndex}>{key.toUpperCase()}</th>
    })
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/recipe/all`)
        .then(res => {
          this.setState({ recipeList: res.data });
          // todo: line here
        })
    // todo: will work before line at above todo weird
  }

  renderTableData() {
    return this.weekDays.map(function (day, dayIndex) {
      return (
          <tr key={dayIndex}>
            <td>{day}</td>
              {
                this.meals.map(function (meal, mealIndex) {
                  return (
                      <td key={mealIndex}>
                        {
                          <select key={meal}>
                            {
                              this.state.recipeList.map(function (recipe, recipeIndex) {
                                return <option key={recipeIndex}>{recipe}</option>
                              })
                            }
                          </select>
                        }
                      </td>
                  );
                }.bind(this))
              }
          </tr>
      );
    }.bind(this)) // todo: how does bind work
  }


  render() {
    return (
        <form>
          <table id='students' border="1">
            <tbody>
            <tr>
              <td><b>WeekDay</b></td>
              {
                this.renderTableHeader()
              }
            </tr>
            {this.renderTableData()}
            </tbody>
          </table>
        </form>
    )
  }
}
export default App
