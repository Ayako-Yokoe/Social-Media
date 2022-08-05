import React, { useState } from "react";
import "./InfoCard.css";
import CreateIcon from "@mui/icons-material/Create";
import ProfileModal from "../components/ProfileModal";

const InfoCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="infoCard">
      <div className="infoHead">
        <h4>Your Info</h4>
        <CreateIcon onClick={() => setModalOpen(true)} />
        <ProfileModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
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
