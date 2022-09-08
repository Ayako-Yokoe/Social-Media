import React, { useState, useRef, useContext } from "react"
import axios from "axios"
import "./PostShare.css"
import ImageIcon from "@mui/icons-material/Image"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import ClearIcon from "@mui/icons-material/Clear"
import Context from "../../context"

const PostShare = () => {
  const [newPost, setNewPost] = useState("")
  const [image, setImage] = useState(null) // URL + can be displayed as a list , preview
  const [uploadedPostImage, setUploadedPostImage] = useState(null) // image
  //const [previewImage, setPreviewImage] = useState(null)
  const imageRef = useRef()
  const { user, setIsLoading, setHasNewPost } = useContext(Context)

  const onImageChange = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      setUploadedPostImage(e.target.files[0])
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result)
    }
  }

  const updateNumberOfPosts = async () => {
    return await axios.post("http://localhost:3001/api/user/posts", {
      id: user.id,
      numberOfPosts: user.number_of_posts ? user.number_of_posts + 1 : 1,
    })
  }

  const upload = async () => {
    setIsLoading(true)

    const formData = new FormData()
    formData.append("post", newPost)
    formData.append("image", uploadedPostImage)
    formData.append("author", user.token)

    const response = await axios.post(
      "http://localhost:3001/api/posts",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    )

    if (response && response.data && response.data.message) {
      alert(response.data.message)
    } else {
      await updateNumberOfPosts()
      setHasNewPost(true)
      alert("Your post was uploaded successfully.")
    }

    //
    setNewPost("")
    setImage(null)
    setIsLoading(false)
  }

  // const upload = () => {
  //   setIsLoading(true)
  //   const formData = new FormData()
  //   formData.append("file", image[0])
  //   formData.append("upload_preset", process.env.REACT_APP_FORM_DATA_KEY)
  //   axios
  //     //.post(process.env.REACT_APP_CLOUDINARY_URL, formData)
  //     .then((res) => {
  //       const fileName = res.data.public_id
  //       axios.post("http://localhost:3001/api/posts", {
  //         post: newPost,
  //         image: fileName,
  //         author: user.token,
  //       })
  //     })
  //     .then((res) => {
  //       if (res && res.data && res.data.message) {
  //         console.log(res.data.message)
  //       } else {
  //         updateNumberOfPosts()
  //         setHasNewPost(true)
  //         console.log("Uploaded successfully")
  //       }
  //       setIsLoading(false)
  //       console.log("go back to home page")
  //     })

  //   // may not need because of the link
  //   setPreviewImage(null)
  // }

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
                //setPreviewImage(null)
                setImage(null)
              }}
            />
            <img src={image ? image : null} alt="" />
          </div>
        )}
      </div>
    </div>
  )
}

export default PostShare
