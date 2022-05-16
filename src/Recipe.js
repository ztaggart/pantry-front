const Recipe = ({ recipe, handleDeleteRecipe }) => {
    return (
      <li>
        <div>
          <label style={{display:'block', fontSize:'25px', fontWeight:'bold'}}>{recipe.name}</label>
          Ingredients:{"   "}
          {recipe.ingredients}
          <br/>
          Directions:{"   "} 
          {recipe.directions}
        </div>
        <div>
          <button onClick={handleDeleteRecipe}>Delete recipe</button>
        </div>
      </li>
    )
}
export default Recipe