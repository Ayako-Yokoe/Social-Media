const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/User");
const postRoute = require("./routes/Post");

app.use(cors());
app.use(express.json());

app.use("/user", userRoute);
app.use("/post", postRoute);

app.listen(3001, (req, res) => {
  console.log("Server is running on port 3001");
});
