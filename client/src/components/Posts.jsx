import React from "react";
import { postsData } from "./PostsData";
import Post from "./Post";
import "./Posts.css";

const Posts = () => {
  return (
    <div className="posts">
      {postsData.map((post, id) => (
        <Post post={post} id={id} key={id} />
      ))}
    </div>
  );
};

export default Posts;
