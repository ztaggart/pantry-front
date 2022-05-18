import {useState} from 'react'

const ItemForm = ({createItem, givenName, givenQuantity, givenUnit, givenExpiry}) => {
    const [name, setName] = useState(givenName == null  ? '' : givenName)
    const [quantity, setQuantity] = useState(givenQuantity == null ? 1 : givenQuantity)
    const [unit, setUnit] = useState(givenUnit == null ? '' : givenUnit)
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
            <input value={name || ''} onChange={(event) => setName(event.target.value)} style={{display:'block', marginBottom:'5px'}} id="pantry-input-name" autoComplete='dont-show'/>
            <div style={{display:'block', marginBottom:'5px'}}>
            <label style={{marginTop:'50px', marginRight: '5px'}}>Quantity:</label>
            <input value={quantity || ''} onChange={(event) => setQuantity(event.target.value)} style={{marginBottom:'5px', marginRight: '5px', width: "20px"}}/>
            <label style={{marginTop:'5px'}}>Unit:</label>
            <input list="units" onChange={(event) => setUnit(event.target.value)} value={unit || ''} autoComplete="on" />
            <datalist id="units">
                <option value="Cups" />
                <option value="Milliliters" />
                <option value="Pounds" />
                <option value="Teaspoons" />
                <option value="Whole" />
                <option value="Half" />
                <option value="Half Gallon" />
                <option value="Gallon" />
            </datalist>
            </div>
            <label style={{marginTop:'5px'}}>Expiry:</label>
            <input value={expiry || ''} onChange={(event) => setExpiry(event.target.value)} style={{display:'block', marginBottom:'5px'}}/>
            <button type="submit" style={{display:'inline-block'}}>Save Recipe</button>
        </form>
    )
} 

export default ItemForm