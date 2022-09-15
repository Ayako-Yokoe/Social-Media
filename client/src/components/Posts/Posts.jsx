import React, { useState, useEffect, useContext, useCallback } from "react"
// import { postsData } from "../PostsData"
import Post from "../Post/Post"
import "./Posts.css"
import axios from "axios"
import PostShare from "../PostShare/PostShare"
import Context from "../../context"

const Posts = () => {
  const { setIsLoading, hasNewPost, setHasNewPost, user } = useContext(Context)
  const [posts, setPosts] = useState([])

  console.log("posts ", posts)

  const loadAllPosts = async () => {
    setIsLoading(true)
    axios.get("http://localhost:3001/api/posts").then((res) => {
      setPosts(res.data)
    })
    setIsLoading(false)
  }

  const loadReactions = async (id) => {
    if (!id) return

    if (user.id && id) {
      try {
        setIsLoading(true)
        const response = await axios.post(
          "http://localhost:3001/api/reactions",
          {
            user_id: user.id,
            post_id: id,
          }
        )
        let updatedPosts = posts.map((post) =>
          post.id === id
            ? {
                ...post,
                hasLiked: response && response.data.post_id ? false : true,
              }
            : post
        )

        //console.log("updatedPosts ", updatedPosts)

        setPosts(updatedPosts)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    loadAllPosts()
    loadReactions()
  }, [setIsLoading, setPosts])

  // let loadPosts = null

  // useEffect(() => {
  //   loadPosts()
  //   return () => {
  //     setPosts([])
  //   }
  // }, [loadPosts])

  // useEffect(() => {
  //   if (hasNewPost) {
  //     loadPosts()
  //     setHasNewPost(false)
  //   }
  // }, [loadPosts, hasNewPost, setHasNewPost])

  // loadPosts = useCallback(async () => {
  //   try {
  //     setIsLoading(true)
  //     const response = await axios.get("http://localhost:3001/api/posts")
  //     setPosts(() => response.data)
  //     setIsLoading(false)
  //   } catch (error) {
  //     setIsLoading(false)
  //   }
  // }, [setIsLoading])

  return (
    <div className="posts">
      {posts.map((post, id) => (
        <Post post={post} key={id} loadReactions={loadReactions} />
      ))}
    </div>
  )
}

export default Posts
