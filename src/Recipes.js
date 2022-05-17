import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import BetterPropTypes from 'better-prop-types'
import RecipeForm from "./RecipeForm"
import Togglable from "./Toggleable"
import Recipe from "./Recipe"
import recipeService from './services/recipes'

const Recipes = ({errorMessage, setErrorMessage}) => {
    const [recipes, setRecipes] = useState([])

    const recipeFormRef = useRef()

    const addRecipe = (recipe) => {
        recipeFormRef.current.toggleVisibility()
        recipeService.create(recipe)
        .then(response => {
          setRecipes(recipes.concat(response))
        })
        .catch(() => {
          return setErrorMessage("Recipe could not be added")
        })
      }

      const handleDeleteRecipe = (id) => {
        recipeService.remove(id)
        setRecipes(recipes.filter((recipe) => {return recipe.id !== id}))
      }

      useEffect(() => {
        recipeService.getAll().then(response => {
          setRecipes(response.data)
        })
      }, [])

    return (
        <div>
            <h1>Recipes</h1>
            {errorMessage === null ? null : <div className="error"> {errorMessage} </div>}
            <div>
                <Togglable buttonLabel='New Recipe' ref={recipeFormRef}>
                    <RecipeForm createRecipe={addRecipe} />
                </Togglable>
                <ul>
                    {recipes.map(recipe =>
                        <Recipe key={recipe.id} recipe={recipe} handleDeleteRecipe={() => handleDeleteRecipe(recipe.id)} />
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