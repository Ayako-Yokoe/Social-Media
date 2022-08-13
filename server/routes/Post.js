const express = require("express")
const router = express.Router()
const db = require("../config/db.config")

router.post("/", (req, res) => {
  const post = req.body.post
  const image = req.body.image
  const like = req.body.like
  const author = req.body.author

  console.log("like ", like)
  console.log("like type", typeof like)

  db.query(
    "INSERT INTO Post (post, image, like, author) VALUES (?, ?, ?, ?);",
    [post, image, like, author],
    (error, results) => {
      console.log(error)
      res.send(results)
    }
  )
})

router.get("/", (req, res) => {
  db.query("SELECT * FROM Post", (error, results) => {
    if (error) {
      console.log(error)
    }
    res.send(results)
  })
})

module.exports = router
