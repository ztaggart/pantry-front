import React, { useEffect, useState, useRef } from 'react'
import recipeService from './services/recipes'
import loginService from './services/login'
import Recipe from './Recipe.js'
import RecipeForm from './RecipeForm.js'
import LoginForm from './LoginForm'
import Togglable from './Toggleable'

const App = (props) => {
  const [recipes, setRecipes] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const recipeFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      recipeService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addRecipe = (recipe) => {
    recipeFormRef.current.toggleVisibility()
    recipeService.create(recipe)
    .then(response => {
      setRecipes(recipes.concat(response))
    })
    .catch(() => {
      return setErrorMessage("Recipe could not be added")
    })
  }

  const handleDeleteRecipe = (id) => {
    recipeService.remove(id)
    setRecipes(recipes.filter((recipe) => {return recipe.id !== id}))
  }

  useEffect(() => {
      recipeService.getAll().then(response => {
        setRecipes(response.data)
      })
    }, [])

  

  return (
    <div>
      <div>
        <h1>Recipes</h1>
        {errorMessage === null ? null : <div className="error"> {errorMessage} </div>}

        {user === null ?
          <LoginForm 
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)} 
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password} /> :
          <div>
            <div>
              <p style={{marginBottom: "0px"}}>{user.username} logged-in</p>
              <button style={{marginBottom: "20px"}} onClick={() => setUser(null)}>
                Log Out
              </button>
            </div>
            <Togglable buttonLabel='New Recipe' ref={recipeFormRef}>
              <RecipeForm createRecipe={addRecipe} />
            </Togglable>
            <ul>
              {recipes.map(recipe =>
                <Recipe key={recipe.id} recipe={recipe} handleDeleteRecipe={() => handleDeleteRecipe(recipe.id)} />
              )}
            </ul>
          </div>
        }
        
      </div>
    </div>
  )
}

export default App