import React, { useState, useEffect, useContext } from "react"
// import { postsData } from "../PostsData"
import Post from "../Post/Post"
import "./Posts.css"

import axios from "axios"
import PostShare from "../PostShare/PostShare"
import Context from "../../context"

const Posts = () => {
  const [posts, setPosts] = useState([])
  const { setIsLoading } = useContext(Context)

  useEffect(() => {
    // add async await, try catch
    setIsLoading(true)
    axios.get("http://localhost:3001/api/posts").then((res) => {
      setPosts(res.data)
    })
    setIsLoading(false)
  }, [setIsLoading, setPosts])

  console.log("posts ", { posts: posts })

  return (
    <div className="posts">
      {posts.map((post, id) => (
        <Post post={post} key={id} />
      ))}
    </div>
  )
}

export default Posts
