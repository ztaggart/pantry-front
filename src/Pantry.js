import PropTypes from 'prop-types'
import BetterPropTypes from 'better-prop-types'
import RecipeForm from "./RecipeForm"
import Togglable from "./Toggleable"
import PantryItem from './PantryItem'

const Pantry = ({errorMessage, handleDeleteItem}) => {

    const items = [
        {
            id: 1,
            name: "test",
            quantity: -1,
            unit: ""
        },
        {
            id: 2,
            name: "tomatoes",
            quantity: 10,
            unit: ""
        },
        {
            id: 3,
            name: "mangos",
            quantity: 1,
            unit: ""
        },
        {
            id: 4,
            name: "salt",
            quantity: 10,
            unit: "cups"
        },
    ]

    return (
        <div>
            <h1>Pantry</h1>
            {errorMessage === null ? null : <div className="error"> {errorMessage} </div>}
            <div>
                <ul>
                    {items.map(item =>
                        <PantryItem key={item.id} item={item} handleDelete={() => handleDeleteItem(item.id)} />
                    )}
                </ul>
            </div>
        </div>
    )
}

Pantry.propTypes = {
    items: PropTypes.array.isRequired,
    errorMessage: BetterPropTypes.string.isRequiredButNullable,
    addRecipe: PropTypes.func.isRequired,
    recipeFormRef: PropTypes.object.isRequired,
    handleDeleteRecipe: PropTypes.func.isRequired
}

export default Pantry