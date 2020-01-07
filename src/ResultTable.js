import React, {Component} from "react";
import axios from "axios";

export class ResultTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fetchedJson: [],
            fooBar: false
        }
    }

    handleSubmit(selectedRecipes) {
        if (!this.state.fooBar) {
            let url = 'http://localhost:8080/ingredients/?recipes=' + selectedRecipes.join(',')
            console.log(url)
            axios.get(url)
                .then(res => {
                    this.setState({
                        fetchedJson: res.data,
                        fooBar: true
                    })
                });
        }
    }

    render() {
        this.handleSubmit(this.props.recipeList);
        return (
            <div>
                <h1 align="center">Ingredients</h1>
                <table border="1" align="center">
                    <tbody>
                    {
                        this.state.fetchedJson.map(function (ingredient, ingredientIndex) {
                            return <tr key={ingredientIndex}>
                                <td>{ingredient.name}</td>
                                <td>{ingredient.amount}</td>
                                <td>{ingredient.unit}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>)
    }
}