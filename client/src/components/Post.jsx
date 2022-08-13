import React, { useContext, useState } from "react"
import "./Post.css"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined"
import SendOutlinedIcon from "@mui/icons-material/SendOutlined"

import Context from "../context"
import { Image } from "cloudinary-react"
import axios from "axios"

// Create api and db for reactions
// handlePostReactions
// toggle

const Post = ({ post }) => {
  const { user, setIsLoading } = useContext(Context)
  //const [displayPost, setDisplayPost] = useState(null)

  // handle like
  // post get
  const handlePostReaction = async () => {
    const userId = user.id
    const postId = post.id
    if (!userId || !postId) {
      return
    }

    // response.data.message ?
    // const response = await axios.post(url, { post_id: postId, user_id: userId });
    // setPost(prevPost => ({ ...prevPost, hasLiked: response && response.data && response.data.message ? false : true }));
    // setIsLoading(false);

    try {
      setIsLoading(true)
      const response = await axios.post("http://localhost:3001/api/reactions", {
        post_id: postId,
        user_id: userId,
      })
      setPost((prevPost) => ({
        ...prevPost,
        hasLiked: response && response.data ? false : true,
      }))
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const removeLike = async () => {
    return await axios.post("http://localhost:3001/api/reactions/delete", {
      post_id: post.id,
      user_id: user.id,
    })
  }

  const like = async () => {
    return await axios.post("http://localhost:3001/api/reactions/create", {
      post_id: post.id,
      user_id: user.id,
    })
  }

  const updateNumberOfReactions = async (numberOfReactions) => {
    return await axios.post("http://localhost:3001/api/reactions", {
      id: post.id,
      numberOfReactions,
    })
  }

  const toggleReactions = async () => {
    try {
      if (post.hasLiked) {
        await removeLike()
        await updateNumberOfReactions(
          post.number_of_reactions ? post.number_of_reactions - 1 : 0
        )
      } else {
        await like()
        await updateNumberOfReactions(
          post.number_of_reactions ? post.number_of_reactions + 1 : 1
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="post">
      <div>
        <Image
          cloudName="dhhigoayx"
          publicId={post.image}
          className="postImage"
        />
      </div>

      <div className="postReact">
        <span onClick={toggleReactions}>
          <FavoriteBorderIcon />
        </span>
        {/* {post.like ? <FavoriteIcon /> : <FavoriteBorderIcon />} */}
        <SmsOutlinedIcon />
        <SendOutlinedIcon />
      </div>
      <span style={{ fonrSize: 12 }}>{post.like} likes</span>
      <div className="detail">
        <span>{post.post}</span>
      </div>
    </div>
  )
}

export default Post
