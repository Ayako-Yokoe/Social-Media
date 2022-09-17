import React, { useState, useEffect, useContext, useCallback } from "react"
// import { postsData } from "../PostsData"
import Post from "../Post/Post"
import "./Posts.css"
import axios from "axios"
// ?
import PostShare from "../PostShare/PostShare"
import Context from "../../context"

// LIKE button -

const Posts = () => {
  const { setIsLoading, hasNewPost, setHasNewPost, user } = useContext(Context)
  const [posts, setPosts] = useState([])

  let loadAllPosts = null
  //
  //let loadReactions = null

  useEffect(() => {
    loadAllPosts()
    //
    //loadReactions()
    return () => {
      setPosts([])
    }
  }, [loadAllPosts])

  useEffect(() => {
    if (hasNewPost) {
      loadAllPosts()
      setHasNewPost(false)
    }
  }, [loadAllPosts, hasNewPost, setHasNewPost])

  loadAllPosts = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await axios.get("http://localhost:3001/posts")
      setPosts(() => response.data)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }, [setIsLoading])

  // loadReactions = useCallback(
  //   async (id) => {
  //     if (!id) return

  //     console.log("loadReactions")

  //     if (user.id && id) {
  //       try {
  //         setIsLoading(true)
  //         const response = await axios.post("http://localhost:3001/reactions", {
  //           user_id: user.id,
  //           post_id: id,
  //         })
  //         let updatedPosts = posts.map((post) =>
  //           post.id === id
  //             ? {
  //                 ...post,
  //                 hasLiked: response && response.data.post_id ? false : true,
  //               }
  //             : post
  //         )

  //         //console.log("updatedPosts ", updatedPosts)

  //         setPosts(updatedPosts)
  //         setIsLoading(false)
  //       } catch (error) {
  //         console.log(error)
  //         setIsLoading(false)
  //       }
  //     }
  //   },
  //   [setIsLoading]
  // )

  const loadReactions = async (id) => {
    if (!id) return

    if (user.id && id) {
      try {
        setIsLoading(true)
        const response = await axios.post("http://localhost:3001/reactions", {
          user_id: user.id,
          post_id: id,
        })
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
    loadReactions()
  }, [setIsLoading, posts, setPosts])

  return (
    <div className="posts">
      {posts.map((post, id) => (
        <Post post={post} key={id} loadReactions={loadReactions} />
      ))}
    </div>
  )
}

export default Posts
