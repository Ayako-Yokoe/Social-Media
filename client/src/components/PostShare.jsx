import React, { useState, useRef } from "react"
import axiox from "axios"
import "./PostShare.css"
import ImageIcon from "@mui/icons-material/Image"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import ClearIcon from "@mui/icons-material/Clear"
import axios from "axios"

import { getCurrentUser } from "../service/auth.service"

const PostShare = () => {
  const [newPost, setNewPost] = useState("")
  const [image, setImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const imageRef = useRef()
  const user = getCurrentUser()

  const onImageChange = (e) => {
    setImage(e.target.files)

    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]
      setPreviewImage({
        image: URL.createObjectURL(img),
      })
    }
  }

  // MySQL has no built-in boolean. 0 or 1
  // error: parse error
  // sql: "INSERT INTO Post (post, image, like) VALUES ('post4', 'jwuallmtjcun9s9dweyu', 1);"

  // alter MySQL table -> Not Null

  const upload = () => {
    const formData = new FormData()
    formData.append("file", image[0])
    formData.append("upload_preset", "km9cpchv")
    axios
      .post("https://api.cloudinary.com/v1_1/dhhigoayx/image/upload", formData)
      .then((res) => {
        const fileName = res.data.public_id

        axiox.post("http://localhost:3001/api/post", {
          post: newPost,
          image: fileName,
          like: 0,
          author: user.token,
        })
      })
      .then(() => {
        console.log("go back to home page")
      })
  }

  return (
    <div className="postShare">
      {/* <img src="" alt="" /> */}
      image
      <div>
        <input
          type="text"
          placeholder="What's new?"
          onChange={(e) => setNewPost(e.target.value)}
        />
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
          {/* <div className="option">
            <LocationOnIcon />
            Location
          </div>
          <div className="option">
            <CalendarMonthIcon />
            Schedule
          </div> */}
          <button className="button ps-button" onClick={upload}>
            Share
          </button>
          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <ClearIcon
              onClick={() => {
                setPreviewImage(null)
                setImage(null)
              }}
            />
            <img src={previewImage?.image} alt="" />
          </div>
        )}
      </div>
    </div>
  )
}

export default PostShare
