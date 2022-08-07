import React from "react";
import "./Post.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

import { Image } from "cloudinary-react";

const Post = ({ post }) => {
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
        {post.like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        <SmsOutlinedIcon />
        <SendOutlinedIcon />
      </div>
      <span style={{ fonrSize: 12 }}>{post.like} likes</span>
      <div className="detail">
        <span>{post.post}</span>
      </div>
    </div>
  );
};

export default Post;
