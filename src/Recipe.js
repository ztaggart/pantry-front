import { useState, useEffect } from 'react'
import baseService from './services/base_service'

const Recipe = ({ recipe, handleDeleteRecipe, userId }) => {
  const [pantry, setPantry] = useState([])

  useEffect(async () => {
    baseService.setBaseUrl('/api/pantry')
    baseService.getAllForUser(userId).then(response => {setPantry(response.data)})
    baseService.setBaseUrl('/api/recipes')
  }, [])

  return (
    <li>
      <div>
        <label style={{ display: 'block', fontSize: '25px', fontWeight: 'bold' }}>{recipe.name}</label>
        Ingredients:{"   "}
        <ul>
          {recipe.ingredients.map(ingredient => {
            let ingredientColor = "red"
            const pantry_names = pantry.map((item) => item.name)
            if (pantry_names.indexOf(ingredient) > -1) {
              ingredientColor = "green"
            }
            return <li style={{color: ingredientColor}}>{ingredient}</li>
          })}
        </ul>
        {recipe.directions !== '' ? `Directions:     ${recipe.directions}` : ""}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={handleDeleteRecipe}>Delete recipe</button>
      </div>
    </li>
  )
}
export default Recipe