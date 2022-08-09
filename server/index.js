const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv").config()
const userRoute = require("./routes/User")
const postRoute = require("./routes/Post")
// const middleware = require("./middleware/verifyToken")

app.use(cors())
app.use(express.json())

app.use("/user", userRoute)
app.use("/post", postRoute)

app.listen(process.env.PORT || 3001, (req, res) => {
  console.log("Server is running on port 3001")
})
