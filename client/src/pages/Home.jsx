import React, { useEffect } from "react"
import "./Home.css"
import ProfileSide from "../components/ProfileSide"
import PostSide from "../components/PostSide"
import RightSide from "../components/RightSide"

import { logout } from "../service/auth.service"

const Home = () => {
  // useEffect(() => {
  //   if (!localStorage.getItem("loggedIn")) {
  //     localStorage.setItem("loggedIn", false);
  //   }
  // }, []);

  return (
    <div className="home">
      <button onClick={logout}>LOG OUT</button>
      <ProfileSide />
      <PostSide />
      <RightSide />
    </div>
  )
}

export default Home
