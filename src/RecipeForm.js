import { useState } from 'react'

const RecipeForm = ({ createRecipe }) => {
    const [newName, setNewName] = useState('')
    const [newIngredients, setNewIngredients] = useState({})
    const [newDirections, setNewDirections] = useState('')
    const [inputs, setInputs] = useState(['input-0', 'input-1', 'input-2', 'input-3'])

    const addRecipe = (event) => {
        event.preventDefault();

        let ingredientList = []
        inputs.forEach(input => {
            if (newIngredients[input]) {
                ingredientList = ingredientList.concat(newIngredients[input])
            }
        });

        const newRecipeObject = {
            name: newName,
            ingredients: ingredientList,
            directions: newDirections
        }
        //console.log(newRecipeObject)
        createRecipe(newRecipeObject)

        setNewName('')
        setNewIngredients({})
        setNewDirections('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleIngredientsChange = (input) => (event) => {
        let updatedVal = { [input]: event.target.value }
        setNewIngredients(newIngredients => ({ ...newIngredients, ...updatedVal }))
    }

    const handleDirectionsChange = (event) => {
        setNewDirections(event.target.value)
    }

    const deleteIngredient = (input) => (event) => {
        event.preventDefault(); 

        setInputs(inputs.filter((input_x) => input_x !== input)); 

        delete newIngredients[input]
        setNewIngredients(newIngredients)
    }

    const IngredientInput = (input) => {

        return (
            <div key={input}>
                <input value={newIngredients[input] || ''} onChange={handleIngredientsChange(input)} style={{ display: 'inline', marginBottom: '5px' }} />
                <button onClick={deleteIngredient(input)}> Delete Ingredient </button>
            </div>
        )
    }

    return (
        <form onSubmit={addRecipe}>
            <label style={{ marginTop: '50px' }}>Recipe Name:</label>
            <input value={newName} onChange={handleNameChange} style={{ display: 'block', marginBottom: '5px' }} />
            <label style={{ marginTop: '50px' }}>Ingredients:</label>
            <div style={{ marginLeft: '50px', marginTop: '10px' }}>
                {inputs.map(input => IngredientInput(input))}
                <div>
                    <button onClick={(event) => { event.preventDefault(); setInputs(inputs.concat(`input-${inputs.length}`)) }}> Add Another Ingredient </button>
                </div>
            </div>
            <label style={{ marginTop: '5px' }}>Directions:</label>
            <textarea value={newDirections} onChange={handleDirectionsChange} style={{ display: 'block', marginBottom: '5px' }} />
            <button type="submit" style={{ display: 'inline-block' }}>Save Recipe</button>
        </form>
    )
}

export default RecipeForm