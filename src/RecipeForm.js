import {useState} from 'react'

const RecipeForm = ({createRecipe}) => {
    const [newName, setNewName] = useState('')
    const [newIngredients, setNewIngredients] = useState('')
    const [newDirections, setNewDirections] = useState('')

    const addRecipe = (event) => {
        event.preventDefault();
        const newRecipeObject = {
          name: newName,
          ingredients: newIngredients,
          directions: newDirections
        }
        
        createRecipe(newRecipeObject)
        
        setNewName('')
        setNewIngredients('')
        setNewDirections('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleIngredientsChange = (event) => {
        setNewIngredients(event.target.value)
    }

    const handleDirectionsChange = (event) => {
        setNewDirections(event.target.value)
    }

    return (
        <form onSubmit={addRecipe}>
            <label style={{marginTop:'50px'}}>Recipe Name:</label>
            <input value={newName} onChange={handleNameChange} style={{display:'block', marginBottom:'5px'}}/>
            <label style={{marginTop:'50px'}}>Ingredients:</label>
            <input value={newIngredients} onChange={handleIngredientsChange} style={{display:'block', marginBottom:'5px'}}/>
            <label style={{marginTop:'5px'}}>Directions:</label>
            <input value={newDirections} onChange={handleDirectionsChange} style={{display:'block', marginBottom:'5px'}}/>
            <button type="submit" style={{display:'inline-block'}}>Save Recipe</button>
        </form>
    )
} 

export default RecipeForm