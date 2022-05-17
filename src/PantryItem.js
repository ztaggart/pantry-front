const PantryItem = ({ item, handleDelete }) => {
    return (
      <li>
        <div style={{display:'block'}}>
          <label style={{display:'block', fontSize:'25px', fontWeight:'bold'}}>{item.name}</label>
          <label style={{display:'block'}}>Quantity: {item.quantity} {item.unit} </label>
          <label style={{display:'block'}}>Expiry: {item.expiry}</label>
          <button onClick={handleDelete}>Delete item from pantry</button>
        </div>
      </li>
    )
}
export default PantryItem