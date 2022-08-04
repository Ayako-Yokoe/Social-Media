import React, { useEffect } from "react";
import "./Home.css";
import ProfileSide from "../components/ProfileSide";
import PostSide from "../components/PostSide";
import RightSide from "../components/RightSide";

const Home = () => {
  // useEffect(() => {
  //   if (!localStorage.getItem("loggedIn")) {
  //     localStorage.setItem("loggedIn", false);
  //   }
  // }, []);

  return (
    <div className="home">
      <ProfileSide />
      <PostSide />
      <RightSide />
    </div>
  );
};

export default Home;
