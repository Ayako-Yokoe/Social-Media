import React from "react";
import LogoSearch from "./LogoSearch";
import InfoCard from "./InfoCard";
import FollowersCard from "./FollowersCard";

const ProfileLeft = () => {
  return (
    <div className="profileSide">
      <LogoSearch />
      <InfoCard />
      <FollowersCard />
    </div>
  );
};

export default ProfileLeft;
