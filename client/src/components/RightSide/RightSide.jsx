import React, { useState } from "react"
import "./RightSide.css"
import HomeIcon from "@mui/icons-material/Home"
import NotificationsIcon from "@mui/icons-material/Notifications"
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import TrendCard from "../TrendCard/TrendCard"
import ShareModal from "../ShareModal/ShareModal"

const RightSide = () => {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className="rightSide">
      <div className="navIcons">
        <HomeIcon />
        <NotificationsIcon />
        <SmsOutlinedIcon />
        <SettingsOutlinedIcon />
      </div>
      <TrendCard />
      <button className="button r-button" onClick={() => setModalOpen(true)}>
        Share
      </button>
      <ShareModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  )
}

export default RightSide
