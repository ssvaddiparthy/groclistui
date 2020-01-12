import React, { Component } from "react";
import axios from "axios";

export class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedJson: {},
      isLoaded: false
    };
  }

  componentDidMount() {
    this.handleSubmit(this.props.recipeList);
  };

  handleSubmit(selectedRecipes) {
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

  render() {
    return this.state.isLoaded ? (
        <div>
          <h1 align="center">Ingredients</h1>
          <table border="1" align="center">
            <tbody>
            {JSON.parse(this.state.fetchedJson.responseData).map(function(ingredient, ingredientIndex) {
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
    ) : (
        <div>Loading...</div>
    );
  }
}
