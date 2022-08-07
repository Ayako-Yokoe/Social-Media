import React from "react";
import "./Auth.css";

// omit

const Auth = () => {
  return (
    <div className="auth">
      <div className="auth-left">
        {/* <img src="" alt="" /> */}
        image
        <div className="webname">
          <h1>ABC media</h1>
          <h6>some desc like explore sth or find sth</h6>
        </div>
      </div>
      {/* <SignUp /> */}
      <Login />
    </div>
  );
};

function Login() {
  return (
    <div className="auth-right">
      <form className="infoForm authForm">
        <h3>Log In</h3>
        <div>
          <input
            type="text"
            placeholder="Username"
            className="infoInput"
            name="username"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="infoInput"
            name="password"
          />
        </div>
        <div>
          <span className="account">Don't have an account? Sign up!</span>
        </div>
        <button type="submit" className="button info-button">
          Log In
        </button>
      </form>
    </div>
  );
}

function SignUp() {
  return (
    <div className="auth-right">
      <form className="infoForm authForm">
        <h3>Sign Up</h3>
        <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstName"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastName"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Username"
            className="infoInput"
            name="username"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="infoInput"
            name="password"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="infoInput"
            name="comfirmPassword"
          />
        </div>
        <div>
          <span className="account">Already have an account? Login!</span>
        </div>
        <button type="submit" className="button info-button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Auth;
