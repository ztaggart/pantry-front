import {useState} from 'react'

const ItemForm = ({createItem, givenName, givenQuantity, givenUnit, givenExpiry}) => {
    const [name, setName] = useState(givenName == null  ? '' : givenName)
    const [quantity, setQuantity] = useState(givenQuantity == null ? 1 : givenQuantity)
    const [unit, setUnit] = useState(givenUnit == null ? 'Whole' : givenUnit)
    const [expiry, setExpiry] = useState(givenExpiry == null ? '' : givenExpiry)

    const addItem = (event) => {
        event.preventDefault();
        const newRecipeObject = {
          name: name,
          quantity: quantity,
          unit: unit,
          expiry: expiry
        }
        
        createItem(newRecipeObject)
        
        setName('')
        setQuantity(1)
        setUnit('Whole')
        setExpiry('')
    }

    return (
        <form onSubmit={addItem}>
            <label style={{marginTop:'50px'}}>Name:</label>
            <input value={name || ''} onChange={(event) => setName(event.target.value)} style={{display:'block', marginBottom:'5px'}}/>
            <div style={{display:'block', marginBottom:'5px'}}>
            <label style={{marginTop:'50px', marginRight: '5px'}}>Quantity:</label>
            <input value={quantity || ''} onChange={(event) => setQuantity(event.target.value)} style={{marginBottom:'5px', marginRight: '5px', width: "20px"}}/>
            <label style={{marginTop:'5px'}}>Unit:</label>
            <select onChange={(event) => setUnit(event.target.value)} value={unit || ''}>
                <option value="Cups">Cups</option>
                <option value="Milliliters">Milliliters</option>
                <option value="Pounds">Pounds</option>
                <option value="Teaspoons">Teaspoons</option>
                <option value="Whole">Whole</option>
                <option value="Half">Half</option>
                <option value="Half Gallon">Half Gallon</option>
                <option value="Gallon">Gallon</option>
            </select>
            </div>
            <label style={{marginTop:'5px'}}>Expiry:</label>
            <input value={expiry || ''} onChange={(event) => setExpiry(event.target.value)} style={{display:'block', marginBottom:'5px'}}/>
            <button type="submit" style={{display:'inline-block'}}>Save Recipe</button>
        </form>
    )
} 

export default ItemForm