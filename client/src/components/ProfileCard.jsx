import React from "react";
import "./ProfileCard.css";

const ProfileCard = () => {
  return (
    <div className="profileCard">
      <div className="profileImages">
        {/* replace with images */}
        <p>background</p>
        <p>profile icon</p>
      </div>
      <div className="profileName">
        <span>Name</span>
        <span>Job Title</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>1,000</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>1,000</span>
            <span>Followers</span>
          </div>
        </div>
        <hr />
      </div>

      <span>My Profile</span>
    </div>
  );
};

export default ProfileCard;
