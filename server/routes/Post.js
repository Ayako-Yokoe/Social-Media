const express = require("express")
const router = express.Router()
const db = require("../config/db.config")

router.post("/", (req, res) => {
  const { post, image, author } = req.body
  const created_at = new Date()
  const newPost = [[post, image, author, created_at]]

  db.query(
    "INSERT INTO Post (post, image, author, created_at) VALUES ?;",
    [newPost],
    (error, results) => {
      if (results) {
        res.json({
          newPostId: results.newPostId,
          post,
          image,
          author,
          created_at,
        })
      } else {
        res.json({ message: "cannot upload your post" })
        console.log("post insert new post error ", error)
      }
    }
  )
})

router.get("/", (req, res) => {
  db.query("SELECT * FROM Post ORDER BY created_at DESC", (error, results) => {
    if (error) {
      console.log(error)
    }
    res.send(results)
  })
})

router.post("/reactions", (req, res) => {
  const { numberOfReactions, id } = req.body
  db.query(
    "UPDATE Post SET number_of_reactions = ? WHERE id = ?",
    [numberOfReactions, id],
    (error, response) => {
      if (response) {
        res.json({ id })
      } else {
        res.json({ message: "Update failed" })
        console.log("post reactions update error ", error)
      }
    }
  )
})

module.exports = router
