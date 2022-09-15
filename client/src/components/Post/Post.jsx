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

const Post = ({ post, loadReactions }) => {
  const { setIsLoading, user } = useContext(Context)
  const [currentPost, setCurrentPost] = useState(null)

  const loadPostInfo = () => {
    setIsLoading(true)
    try {
      axios.get(`http://localhost:3001/api/posts/${post.id}`).then((res) => {
        setCurrentPost(res.data)
      })
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    loadPostInfo()
  }, [setIsLoading, user, loadReactions, post])

  // const handlePostReaction = async () => {
  //   const userId = user.id
  //   const postId = displayPost.id
  //   if (!userId || !postId) {
  //     return
  //   }

  //   try {
  //     setIsLoading(true)
  //     const response = await axios.post("http://localhost:3001/api/reactions", {
  //       post_id: postId,
  //       user_id: userId,
  //     })
  //     setDisplayPost((prevPost) => ({
  //       ...prevPost,
  //       hasLiked:
  //         response && response.data && response.data.message ? false : true,
  //     }))
  //     setIsLoading(false)
  //   } catch (error) {
  //     console.log(error)
  //     setIsLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   handlePostReaction()
  // }, [setDisplayPost])

  const removeLike = async () => {
    return await axios.post("http://localhost:3001/api/reactions/delete", {
      post_id: currentPost.id,
      //post_id: post.id,
      user_id: user.id,
    })
  }
  const like = async () => {
    return await axios.post("http://localhost:3001/api/reactions/create", {
      post_id: currentPost.id,
      //post_id: post.id,
      user_id: user.id,
    })
  }

  const updateNumberOfReactions = async (numberOfReactions) => {
    console.log("numberOfReactions ", numberOfReactions)

    return await axios.post("http://localhost:3001/api/posts/reactions", {
      post_id: currentPost.id,
      //id: post.id,
      numberOfReactions,
    })
  }

  const toggleReactions = async () => {
    await loadReactions(post.id)
    try {
      if (post.hasLiked) {
        await removeLike()
        await updateNumberOfReactions(
          currentPost.number_of_reactions
            ? currentPost.number_of_reactions - 1
            : 0
          //(post.number_of_reactions = 0)
        )
      } else {
        await like()
        await updateNumberOfReactions(
          currentPost.number_of_reactions
            ? currentPost.number_of_reactions + 1
            : 1
          //(post.number_of_reactions = 0)
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
          {post.hasLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </span>

        <SmsOutlinedIcon />
        <SendOutlinedIcon />
      </div>
      <span style={{ fonrSize: 12 }}>
        {post.number_of_reactions
          ? `${post.number_of_reactions} likes`
          : `0 likes`}
      </span>
      <div className="detail">
        <span>{post.post}</span>
      </div>
    </div>
  )
}

export default Post
