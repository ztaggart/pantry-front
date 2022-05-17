import PropTypes from 'prop-types'
import BetterPropTypes from 'better-prop-types'
import RecipeForm from "./RecipeForm"
import Togglable from "./Toggleable"
import Recipe from "./Recipe"

const Recipes = ({recipes, errorMessage, addRecipe, recipeFormRef, handleDeleteRecipe}) => {

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
    recipes: PropTypes.array.isRequired,
    errorMessage: BetterPropTypes.string.isRequiredButNullable,
    addRecipe: PropTypes.func.isRequired,
    recipeFormRef: PropTypes.object.isRequired,
    handleDeleteRecipe: PropTypes.func.isRequired
}

export default Recipes