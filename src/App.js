import React, { useEffect, useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import baseService from './services/base_service'
import loginService from './services/login'
import Recipes from './Recipes.js'
import Home from './Home.js'
import Pantry from './Pantry.js'
import LoginForm from './LoginForm'

const App = () => {
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
      baseService.setToken(user.token)
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
      baseService.setToken(user.token)
    }
  }, [])

  return (
    <Router>
      {user === null ?
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password} /> :
        <div>
          <div>
            <Link style={{ padding: "7px" }} to="/">Home</Link>
            <Link style={{ padding: "7px" }} to="/recipes">Recipes</Link>
            <Link style={{ padding: "7px" }} to="/pantry">Pantry</Link>
            <button style={{position: "absolute", right: "10px"}} onClick={() => {setUser(null);window.localStorage.removeItem('user')}}> Log out </button>
          </div>
          {errorMessage === null ? null : <div className="error"> {errorMessage} </div>}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes errorMessage={errorMessage} setErrorMessage={setErrorMessage} userId={user.id}/>} />
            <Route path="/pantry" element={<Pantry errorMessage={errorMessage} setErrorMessage={setErrorMessage} userId={user.id}/>} />
          </Routes>
        </div>
      }
    </Router>
  )
}

export default App