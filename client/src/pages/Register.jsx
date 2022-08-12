import React, { useState } from "react"
import axios from "axios"
import "./Register.css"

import { register } from "../service/auth.service"

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [checkPassword, setCheckPassword] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  const handleRegister = (e) => {
    setCheckPassword(true)
    e.preventDefault()
    if (password !== confirmPassword) {
      setCheckPassword(false)
      return false
    }

    if (username !== "" && password !== "") {
      register(username, password)
        .then((res) => {
          if (!res.register) {
            setErrorMessage(res.message)
            return false
          }
          window.location.href = "/"
        })
        .catch((err) => {
          console.log(err)
        })
    }

    setUsername("")
    setPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="register">
      <div className="registerLeft">
        {/* <img src="" alt="" /> */}
        image
        <div className="appname">
          <h1>ABC media</h1>
          <h6>some desc like explore sth or find sth</h6>
        </div>
      </div>

      <div className="registerRight">
        <form className="infoForm registerForm" onSubmit={handleRegister}>
          <h3>Sign Up</h3>
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
            <input
              className="infoInput"
              type="password"
              placeholder="Confirm Password"
              name="comfirmPassword"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {!checkPassword && <p>Passwords don't match</p>}

          <div>
            <span className="account">Already have an account? Login!</span>
          </div>
          <button className="button info-button" type="submit">
            Sign Up
          </button>
        </form>
      </div>

      {/* <h1>Register</h1>
      <div className="register-form">
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
        <button onClick={register}>Register</button>
      </div> */}
    </div>
  )
}

export default Register
