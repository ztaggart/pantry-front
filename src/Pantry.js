import PropTypes from 'prop-types'
import BetterPropTypes from 'better-prop-types'
import RecipeForm from "./RecipeForm"
import Togglable from "./Toggleable"
import PantryItem from './PantryItem'

const Pantry = ({errorMessage, setErrorMessage}) => {

    const items = [
        {
            id: 1,
            name: "test",
            quantity: -1,
            unit: "",
            expiry: "1/2/3002"
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



    const handleDeleteItem = (id) => {
        console.log("need to delete item with id: " + id)
      }

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
    errorMessage: BetterPropTypes.string.isRequiredButNullable,
    setErrorMessage: PropTypes.func.isRequired
}

export default Pantry