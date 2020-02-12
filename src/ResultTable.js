import React, { Component } from "react";
import axios from "axios";

export class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRecipes: this.props.location.state.selectedRecipes,
      fetchedJson: {}
    };
  }

  getIngredients(){
    console.log(this.state.selectedRecipes)
    let url = "http://localhost:8080/ingredients/?recipes=" + Object.values(this.state.selectedRecipes).join(',');
    console.log(url);
    axios.get(url).then(res => {
      this.setState({
      fetchedJson: JSON.parse(res.data.responseData)
     });
    });
  }

  componentDidMount(){
    this.getIngredients();
  }

  render() {
    if (typeof(this.state.fetchedJson.length) === 'undefined') {
      return <h1>Still fetching ingredients from recipes...</h1>
    } else{
      return (
        <div>
          <h1 align="center">Ingredients</h1>
          <table border="1" align="center">
            <tbody>
              {this.state.fetchedJson.map(function(ingredient, ingredientIndex) {
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
        </div>
      );
    }
  }
}
