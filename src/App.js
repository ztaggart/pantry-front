import React, { useEffect, useState } from 'react'
import recipeService from './services/recipes'
import Recipe from './Recipe.js'

const App = (props) => {
  const [recipes, setRecipes] = useState([])
  const [newName, setNewName] = useState('')
  const [newIngredients, setNewIngredients] = useState('')
  const [newDirections, setNewDirections] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const addRecipe = (event) => {
    event.preventDefault();
    const newRecipeObject = {
      id: recipes.length + 1,
      name: newName,
      ingredients: newIngredients,
      directions: newDirections
    }
    
    recipeService.create(newRecipeObject)
    .then(response => {
      console.log(response)
      setRecipes(recipes.concat(response.data))
    })
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

  const handleDeleteRecipe = (id) => {
    console.log(`recipe with id of ${id} needs to be deleted`)
    recipeService.remove(id)
    setRecipes(recipes.filter((recipe) => {return recipe.id !== id}))
  }

  const handleLogin = (event) => {
    event.preventDefault()

  }

  useEffect(() => {
      recipeService.getAll().then(response => {
        setRecipes(response.data)
      })
    }, [])
  console.log('render', recipes.length, 'recipes')

  return (
    <div>
      <div>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
      <div>
        <h1>Recipes</h1>
        <ul>
          {recipes.map(recipe => 
            <Recipe key={recipe.id} recipe={recipe} handleDeleteRecipe={() => handleDeleteRecipe(recipe.id)}/>
          )}
        </ul>
        <form onSubmit={addRecipe}>
          <label style={{marginTop:'50px'}}>Recipe Name:</label>
          <input value={newName} onChange={handleNameChange} style={{display:'block', marginBottom:'5px'}}/>
          <label style={{marginTop:'50px'}}>Ingredients:</label>
          <input value={newIngredients} onChange={handleIngredientsChange} style={{display:'block', marginBottom:'5px'}}/>
          <label style={{marginTop:'5px'}}>Directions:</label>
          <input value={newDirections} onChange={handleDirectionsChange} style={{display:'block', marginBottom:'5px'}}/>
          <button type="submit" style={{display:'inline-block'}}>Save Recipe</button>
        </form>
      </div>
    </div>
  )
}

export default App