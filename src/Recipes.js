import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import BetterPropTypes from 'better-prop-types'
import RecipeForm from "./RecipeForm"
import Togglable from "./Toggleable"
import Recipe from "./Recipe"
import recipeService from './services/base_service'

const Recipes = ({ errorMessage, setErrorMessage, userId }) => {
  const [recipes, setRecipes] = useState([])
  const recipeFormRef = useRef()

  const addRecipe = (recipe) => {
    recipeFormRef.current.toggleVisibility()
    recipeService.create(recipe)
      .then(response => {
        setRecipes(recipes.concat(response))
      })
      .catch((error) => {
        return setErrorMessage("Recipe could not be added")
      })
  }

  const handleDeleteRecipe = (id) => {
    recipeService.remove(id)
    setRecipes(recipes.filter((recipe) => { return recipe.id !== id }))
  }

  useEffect(() => {
    recipeService.setBaseUrl("/api/recipes")
    recipeService.getAllForUser(userId).then(response => {
      setRecipes(response.data)
    })
  }, [])

  return (
    <div>
      <h1>Recipes</h1>
      <div>
        <Togglable buttonLabel='New Recipe' ref={recipeFormRef}>
          <RecipeForm createRecipe={addRecipe} />
        </Togglable>
        <ul>
          {recipes.map(recipe =>
            <Recipe key={recipe.id} recipe={recipe} handleDeleteRecipe={() => handleDeleteRecipe(recipe.id)} userId={userId}/>
          )}
        </ul>
      </div>
    </div>
  )
}

Recipes.propTypes = {
  errorMessage: BetterPropTypes.string.isRequiredButNullable,
  setErrorMessage: PropTypes.func.isRequired
}

export default Recipes