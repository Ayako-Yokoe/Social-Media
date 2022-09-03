import React, { useState, useEffect, useContext, useCallback } from "react"
// import { postsData } from "../PostsData"
import Post from "../Post/Post"
import "./Posts.css"
import axios from "axios"
import PostShare from "../PostShare/PostShare"
import Context from "../../context"

const Posts = () => {
  const [posts, setPosts] = useState([])
  const { setIsLoading, hasNewPost, setHasNewPost } = useContext(Context)

  let loadPosts = null

  useEffect(() => {
    loadPosts()
    return () => {
      setPosts([])
    }
  }, [loadPosts])

  useEffect(() => {
    if (hasNewPost) {
      loadPosts()
      setHasNewPost(false)
    }
  }, [loadPosts, hasNewPost, setHasNewPost])

  loadPosts = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await axios.get("http://localhost:3001/api/posts")
      setPosts(() => response.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }, [setIsLoading])

  // useEffect(() => {
  //   setIsLoading(true)
  //   axios.get("http://localhost:3001/api/posts").then((res) => {
  //     setPosts(res.data)
  //   })
  //   setIsLoading(false)
  // }, [setIsLoading, setPosts])

  return (
    <div className="posts">
      {posts.map((post, id) => (
        <Post post={post} key={id} />
      ))}
    </div>
  )
}

export default Posts
