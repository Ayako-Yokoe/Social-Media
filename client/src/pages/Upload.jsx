import React, { useState } from "react";
import axios from "axios";
import "./Upload.css";

// Pedro is using cloudinary to store images
// Decide what platform to use, firebase?
// Then, change the "upload" method, add a route, and add a table to db

const Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);

  const upload = () => {};

  return (
    <div className="upload">
      <h1>Create a post</h1>
      <div className="upload-form">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descriptions"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="file" onChange={(e) => setImage(e.target.files)} />
        {/* <button onClick={register}>Register</button> */}
      </div>
    </div>
  );
};

export default Upload;
