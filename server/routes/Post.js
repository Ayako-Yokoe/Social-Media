const express = require("express")
const router = express.Router()
const db = require("../config/db.config")
const upload = require("../middleware/multer")

// Create a new post
//router.post("/", upload, async (req, res) => {  ----> Wrong!!!!
router.post("/", upload, async (req, res, next) => {
  const file = req.file
  if (!file) {
    res.json({
      message: "Please upload your post image",
    })
  } else {
    const { post, author } = req.body
    const image = `/${file.filename}`
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
          res.json({ message: "Cannot upload your post, please try again." })
          console.log("post insert new post error ", error)
        }
      }
    )
  }
})

// Get all posts
router.get("/", (req, res) => {
  db.query("SELECT * FROM Post ORDER BY created_at DESC", (error, results) => {
    if (results) {
      res.json(results)
    } else {
      res.json({ message: "Cannot get posts." })
      console.log(error)
    }
  })
})

// Get a single post
router.get("/:id", (req, res) => {
  const postId = req.params.id
  if (!postId) {
    res.json({ message: "Cannot get the post detail. Please try again." })
  }

  db.query("SELECT * FROM Post WHERE id = ?;", [postId], (error, results) => {
    if (results && results.length > 0) {
      res.json(results[0])
    } else {
      res.json({ message: "Cannot get the post detail. Please try again." })
      console.log(error)
    }
  })
})

// Handle like/dislike reactions
router.post("/reactions", (req, res) => {
  const { numberOfReactions, id } = req.body
  db.query(
    "UPDATE Post SET number_of_reactions = ? WHERE id = ?;",
    [numberOfReactions, id],
    (error, response) => {
      if (response) {
        res.json({ id })
      } else {
        res.json({ message: "Update failed. Please try again." })
        console.log("post reactions update error ", error)
      }
    }
  )
})

module.exports = router
