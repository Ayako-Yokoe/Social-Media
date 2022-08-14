import React, { useContext, useState, useEffect } from "react"
import "./Post.css"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined"
import SendOutlinedIcon from "@mui/icons-material/SendOutlined"

import Context from "../../context"
import { Image } from "cloudinary-react"
import axios from "axios"

// Like button - need reloading
// Delete posts - only the user

const Post = ({ post }) => {
  const { user, setIsLoading } = useContext(Context)
  const [displayPost, setDisplayPost] = useState(post)

  const handlePostReaction = async () => {
    const userId = user.id
    const postId = displayPost.id
    if (!userId || !postId) {
      return
    }

    try {
      setIsLoading(true)
      const response = await axios.post("http://localhost:3001/api/reactions", {
        post_id: postId,
        user_id: userId,
      })
      setDisplayPost((prevPost) => ({
        ...prevPost,
        hasLiked:
          response && response.data && response.data.message ? false : true,
      }))
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handlePostReaction()
  }, [setDisplayPost])

  const removeLike = async () => {
    return await axios.post("http://localhost:3001/api/reactions/delete", {
      post_id: displayPost.id,
      user_id: user.id,
    })
  }

  const like = async () => {
    return await axios.post("http://localhost:3001/api/reactions/create", {
      post_id: displayPost.id,
      user_id: user.id,
    })
  }

  const updateNumberOfReactions = async (numberOfReactions) => {
    return await axios.post("http://localhost:3001/api/posts/reactions", {
      id: displayPost.id,
      numberOfReactions,
    })
  }

  const toggleReactions = async () => {
    try {
      if (displayPost.hasLiked) {
        await removeLike()
        await updateNumberOfReactions(
          displayPost.number_of_reactions
            ? displayPost.number_of_reactions - 1
            : 0
        )
      } else {
        await like()
        await updateNumberOfReactions(
          displayPost.number_of_reactions
            ? displayPost.number_of_reactions + 1
            : 1
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
          publicId={displayPost.image}
          className="postImage"
        />
      </div>

      <div className="postReact">
        <span onClick={toggleReactions}>
          {displayPost.hasLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </span>

        <SmsOutlinedIcon />
        <SendOutlinedIcon />
      </div>
      <span style={{ fonrSize: 12 }}>
        {displayPost?.number_of_reactions
          ? `${displayPost?.number_of_reactions} likes`
          : `0 likes`}
      </span>
      <div className="detail">
        <span>{displayPost.post}</span>
      </div>
    </div>
  )
}

export default Post
