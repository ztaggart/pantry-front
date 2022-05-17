const PantryItem = ({ item, handleDelete }) => {
    return (
      <li>
        <div>
          <label style={{display:'block', fontSize:'25px', fontWeight:'bold'}}>{item.name}</label>
          <label>Quantity: {item.quantity} {item.unit} </label>
        </div>
        <div>
          <button onClick={handleDelete}>Delete item from pantry</button>
        </div>
      </li>
    )
}
export default PantryItem