import { useState } from 'react'
import PantryForm from './PantryForm'

const PantryItem = ({ item, handleDelete, editItem }) => {
  const [editing, setEditing] = useState(false)

  return (
    <li>
      {editing ?
        <PantryForm createItem={(new_item) => { setEditing(false); new_item["id"] = item.id; editItem(new_item) }} givenName={item.name} givenQuantity={item.quantity} givenUnit={item.unit} givenExpiry={item.expiry} />
        :
        <div style={{ display: 'block' }}>
          <label style={{ display: 'block', fontSize: '25px', fontWeight: 'bold' }}>{item.name}</label>
          <label style={{ display: 'block' }}>Quantity: {item.quantity} {item.unit} </label>
          <label style={{ display: 'block' }}>Expiry: {item.expiry}</label>
          <div>
            <button onClick={handleDelete}>Delete item</button>
            <button onClick={() => setEditing(true)}>Edit item</button>
          </div>
        </div>
      }
    </li>
  )
}
export default PantryItem