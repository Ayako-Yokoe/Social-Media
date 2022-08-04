import React from "react";
import "./InfoCard.css";
import CreateIcon from "@mui/icons-material/Create";

const InfoCard = () => {
  return (
    <div className="infoCard">
      <div className="infoHead">
        <h4>Your Info</h4>
        <CreateIcon />
      </div>
      <div className="info">
        <span>
          <b>Job Title: </b>
        </span>
        <span>Full Stack Developer</span>
      </div>
      <div className="info">
        <span>
          <b>Location: </b>
        </span>
        <span>Vancouver, Canada</span>
      </div>
      <div className="info">
        <span>
          <b>Job Status: </b>
        </span>
        <span>Open To Work</span>
      </div>
      <button className="button logout-button">Log Out</button>
    </div>
  );
};

export default InfoCard;
