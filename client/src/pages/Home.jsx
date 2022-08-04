import React, { useEffect } from "react";
import "./Home.css";
import ProfileSide from "../components/ProfileSide";

const Home = () => {
  // useEffect(() => {
  //   if (!localStorage.getItem("loggedIn")) {
  //     localStorage.setItem("loggedIn", false);
  //   }
  // }, []);

  return (
    <div className="home">
      <ProfileSide />
      <div className="postSide">post</div>
      <div className="rightSide">right</div>
    </div>
  );
};

export default Home;
