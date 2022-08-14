import React, { useState } from "react"
import axios from "axios"
import "./Login.css"

import { login } from "../../service/auth.service"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    if (username !== "" && password !== "") {
      login(username, password)
        .then((res) => {
          if (!res.token) {
            setErrorMessage(res.message)
            return false
          } else {
            window.location.href = "/"
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    setUsername("")
    setPassword("")
  }

  // const handleLogin = (e) => {
  //   e.preventDefault()
  //   if (username !== "" && password !== "") {
  //     axios
  //       .post("http://localhost:3001/user/login", {
  //         username: username,
  //         password: password,
  //       })
  //       .then((res) => {
  //         if (res.data.loggedIn) {
  //           localStorage.setItem("token", res.data.token)
  //           localStorage.setItem("username", res.data.username)
  //           // redirect to home
  //         } else {
  //           setErrorMessage(res.data.message)
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   }

  //   setUsername("")
  //   setPassword("")
  // }

  return (
    <div className="login">
      <div className="loginLeft">
        {/* <img src="" alt="" /> */}
        image
        <div className="appname">
          <h1>ABC media</h1>
          <h6>some desc like explore sth or find sth</h6>
        </div>
      </div>

      <div className="loginRight">
        <form className="infoForm loginForm" onSubmit={handleLogin}>
          <h3>Log In</h3>
          <p>{errorMessage ? errorMessage : ""}</p>
          <div>
            <input
              className="infoInput"
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              className="infoInput"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <span className="account">Don't have an account? Sign up!</span>
          </div>
          <button className="button info-button" type="submit">
            Log In
          </button>
        </form>
      </div>

      {/* <h1>Login</h1>
      <div className="login-form">
        <input
          type="text"
          placeholder="User Name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>
      <p>{errorMessage}</p> */}
    </div>
  )
}

export default Login
