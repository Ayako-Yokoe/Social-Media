import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = () => {
    axios
      .post("http://localhost:3001/user/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.loggedIn) {
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("username", res.data.username);
          // redirect to home
        } else {
          setErrorMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <h1>Login</h1>
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
      <p>{errorMessage}</p>
    </div>
  );
};

export default Login;
