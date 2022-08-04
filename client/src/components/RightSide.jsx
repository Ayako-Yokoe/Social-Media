import React from "react";
import "./RightSide.css";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TrendCard from "./TrendCard";

const RightSide = () => {
  return (
    <div className="rightSide">
      <div className="navIcons">
        <HomeIcon />
        <NotificationsIcon />
        <SmsOutlinedIcon />
        <SettingsOutlinedIcon />
      </div>
      <TrendCard />
      <button className="button r-button">Share</button>
    </div>
  );
};

export default RightSide;
