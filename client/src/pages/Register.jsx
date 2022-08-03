import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    axios
      .post("http://localhost:3001/user/register", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="register">
      <h1>Register</h1>
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
      </div>
    </div>
  );
};

export default Register;
