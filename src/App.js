import React, { useEffect, useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import recipeService from './services/recipes'
import loginService from './services/login'
import Recipes from './Recipes.js'
import Home from './Home.js'
import Pantry from './Pantry.js'
import LoginForm from './LoginForm'

const App = (props) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      recipeService.setToken(user.token)
      localStorage.setItem('user', JSON.stringify(user))
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

  // this only happens once because of empty array as last argument
  useEffect(() => {
    const userJSON = window.localStorage.getItem('user')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      recipeService.setToken(user.token)
    }
  }, [])

  return (
    <Router>
      {errorMessage === null ? null : <div className="error"> {errorMessage} </div>}
      <div>
        <Link style={{padding: "7px"}} to="/">Home</Link>
        <Link style={{padding: "7px"}} to="/recipes">Recipes</Link>
        <Link style={{padding: "7px"}} to="/pantry">Pantry</Link>
      </div>
      {user === null ?
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password} /> :

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes errorMessage={errorMessage} setErrorMessage={setErrorMessage} />} />
          <Route path="/pantry" element={<Pantry errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}></Route>
        </Routes>
      }
    </Router>
  )
}

export default App