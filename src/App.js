import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { ResultTable } from "./ResultTable";
import { InputTable } from "./InputTable";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeList: [],
      selectedRecipes: [],
      fetchedJson: {},
      fooBar: false,
      showTable: true,
      renderInputTable: false,
      selectionReceived: false
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/recipe/all`).then(res => {
      this.setState({
        recipeList: res.data,
        renderInputTable: true
      });
    }).catch(function (error) {
      console.log(JSON.stringify(error))
    });
  }

  updateSelection(selection) {
    this.setState({
      selectedRecipes: selection,
      selectionReceived: true
    });
  }

  render() {
    return (
      <div>
        {this.state.showTable && this.state.renderInputTable && (
          <InputTable
            recipeList={this.state.recipeList}
            selectionCallback={this.updateSelection.bind(this)}
          />
        )}
        {this.state.selectionReceived && (
          <ResultTable recipeList={this.state.selectedRecipes} />
        )}
      </div>
    );
  }
}
