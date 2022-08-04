import React, { useState, useRef } from "react";
import "./PostShare.css";
import ImageIcon from "@mui/icons-material/Image";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ClearIcon from "@mui/icons-material/Clear";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };

  return (
    <div className="postShare">
      {/* <img src="" alt="" /> */}
      image
      <div>
        <input type="text" placeholder="What's happening?" />
        <div className="postOptions">
          <div
            className="option"
            // style={{ color: "var(--photo)"}}
            onClick={() => imageRef.current.click()}
          >
            <ImageIcon />
            Photo
          </div>
          <div className="option">
            <PlayCircleIcon />
            Video
          </div>
          <div className="option">
            <LocationOnIcon />
            Location
          </div>
          <div className="option">
            <CalendarMonthIcon />
            Schedule
          </div>
          <button className="button ps-button">Share</button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <ClearIcon onClick={() => setImage(null)} />
            <img src={image.image} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
