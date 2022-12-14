const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv").config()
const multer = require("multer")
const path = require("path")
const db = require("./config/db.config")
// const userRoute = require("./routes/User")
// const postRoute = require("./routes/Post")
// const reactionRoute = require("./routes/Reaction")
// const followerRoute = require("./routes/Followers")
// const middleware = require("./middleware/verifyToken")
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public")
  },
  filename: function (req, file, cb) {
    const filename = file.mimetype.includes("image")
      ? `${file.fieldname}-${Date.now()}.jpg`
      : `${file.fieldname}-${Date.now()}.mp4`
    cb(null, filename)
  },
})

const upload = multer({ storage: storage })

// app.use("/api/user", userRoute)
// app.use("/api/posts", postRoute)
// app.use("/api/reactions", reactionRoute)
// app.use("/api/followers", followerRoute)

db.connect(function (err) {
  if (err) {
    console.log(err)
    throw err
  }
  console.log("Database was connected.")
  require("./routes")({ app, db, upload })
  app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`)
  })
})
