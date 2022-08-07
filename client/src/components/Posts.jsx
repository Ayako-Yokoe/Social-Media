import React, { useState, useEffect } from "react";
import { postsData } from "./PostsData";
import Post from "./Post";
import "./Posts.css";

import axios from "axios";
import PostShare from "./PostShare";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/post").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div className="posts">
      {posts.map((post, id) => (
        <Post post={post} id={id} key={id} />
      ))}
    </div>
  );
};

export default Posts;
