import React, { useEffect } from "react"
import "./Home.css"
import ProfileSide from "../../components/ProfileSide/ProfileSide"
import PostSide from "../../components/PostSide/PostSide"
import RightSide from "../../components/RightSide/RightSide"

import { logout } from "../../service/auth.service"

const Home = () => {
  return (
    <div className="home">
      {/* <button onClick={logout}>LOG OUT</button> */}
      <ProfileSide />
      <PostSide />
      <RightSide />
    </div>
  )
}

export default Home
