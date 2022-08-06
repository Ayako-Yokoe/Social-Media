import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return false;
    }

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
      <div className="registerLeft">
        {/* <img src="" alt="" /> */}
        image
        <div className="appname">
          <h1>ABC media</h1>
          <h6>some desc like explore sth or find sth</h6>
        </div>
      </div>

      <div className="registerRight">
        <form className="infoForm registerForm">
          <h3>Sign Up</h3>
          <div>
            <input
              className="infoInput"
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              className="infoInput"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="infoInput"
              type="password"
              placeholder="Confirm Password"
              name="comfirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <span className="account">Already have an account? Login!</span>
          </div>
          <button className="button info-button" onClick={register}>
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
  );
};

export default Register;
