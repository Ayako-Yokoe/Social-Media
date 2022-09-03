const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv").config()
const userRoute = require("./routes/User")
const postRoute = require("./routes/Post")
const reactionRoute = require("./routes/Reaction")
const followerRoute = require("./routes/Followers")
// const middleware = require("./middleware/verifyToken")
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// auth route ??
app.use("/api/user", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/reactions", reactionRoute)
app.use("/api/followers", followerRoute)

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`)
})
