import React from "react";
import "./Post.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const Post = ({ post }) => {
  return (
    <div className="post">
      {/* <img src={post.img} alt={post.name} /> */}
      <div className="postReact">
        {post.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        <SmsOutlinedIcon />
        <SendOutlinedIcon />
      </div>
      <span style={{ fonrSize: 12 }}>{post.likes} likes</span>
      <div className="detail">
        <span>
          <b>{post.name}</b>
        </span>
        <span> {post.description}</span>
      </div>
    </div>
  );
};

export default Post;
