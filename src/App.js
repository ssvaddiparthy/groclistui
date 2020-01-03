import React, {Component} from 'react'
import './App.css'

class App extends Component {
  weekDays = ["WeekDay", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  meals = ["BreakFast", "Lunch", "Dinner"]

  constructor(props) {
    super(props);
    this.state = {
      recipeList: ''
    }
  }

  renderTableHeader() {
    return this.meals.map((key, mealIndex) => {
      return <th key={mealIndex}>{key.toUpperCase()}</th>
    })
  }

  renderTableData() {
    return this.weekDays.map(function (day, dayIndex) {
      return (
          <tr id={dayIndex}>
            <td>{day}</td>
          </tr>
      );
    })
  }


  render() {
    return (
        <div>
          <table id='students' border="1">
            <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
            </tbody>
          </table>
        </div>
    )
  }
}
export default App
