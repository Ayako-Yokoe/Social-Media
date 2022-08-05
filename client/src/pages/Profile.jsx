import React from "react";
import PostSide from "../components/PostSide";
import ProfileCard from "../components/ProfileCard";
import ProfileLeft from "../components/ProfileLeft";
import RightSide from "../components/RightSide";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile">
      <ProfileLeft />
      <div className="profileCenter">
        <ProfileCard />
        <PostSide />
      </div>
      <RightSide />
    </div>
  );
};

export default Profile;
