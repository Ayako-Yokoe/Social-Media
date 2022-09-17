// import React, { useState } from "react";
// import axios from "axios";
// import "./Upload.css";

// Pedro is using cloudinary to store images
// npm package

// const Upload = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState([]);

//   const upload = () => {
// const formData = new FormData();
// formData.append("file", image[0]);
// formData.append("upload_preset", "vgmulp38");
// Axios.post(
//   `https://api.cloudinary.com/v1_1/pedro-machado-inc/image/upload`,
//   formData
// ).then((response) => {
//   const fileName = response.data.public_id;
//   Axios.post("http://localhost:3001/upload", {
//     title: title,
//     description: description,
//     image: fileName,
//     author: localStorage.getItem("username"),
//   })
//   .then(() => {
//     history.push("/");
//   });
// });
//};

//   return (
//     <div className="upload">
//       <h1>Create a post</h1>
//       <div className="upload-form">
//         <input
//           type="text"
//           placeholder="Title"
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Descriptions"
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <input type="file" onChange={(e) => setImage(e.target.files)} />
//         {/* <button onClick={register}>Register</button> */}
//       </div>
//     </div>
//   );
// };

// export default Upload;
