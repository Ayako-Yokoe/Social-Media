import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"));
  }, [localStorage.getItem("loggedIn")]);

  return (
    <div className="navbar">
      <a href="/">Home</a>

      {loggedIn ? (
        <>
          <a href="/profile">Profile</a>
          <a href="/upload">Upload</a>
        </>
      ) : (
        <>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </>
      )}
    </div>
  );
};

export default Navbar;
