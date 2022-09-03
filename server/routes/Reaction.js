const express = require("express")
const router = express.Router()
const db = require("../config/db.config")

// Get all posts reactions
router.post("/", (req, res) => {
  const { post_id, user_id } = req.body

  if (!post_id || !user_id) {
    res.json({ message: "Not found" })
  }

  db.query(
    "SELECT * FROM Post_Reaction WHERE post_id = ? AND user_id = ?;",
    [post_id, user_id],
    (error, response) => {
      if (response && response.length) {
        res.json({ ...response[0] })
        //console.log("reaction post response ", response)
      } else {
        res.json({ message: "Not Found" })
        //console.log("reaction post error ", error)
      }
    }
  )
})

// Handle like button
router.post("/create", (req, res) => {
  const { post_id, user_id } = req.body

  if (!post_id || !user_id) {
    res.json({ message: "Not authorized" })
  }
  const reactions = [[post_id, user_id]]
  db.query(
    "INSERT INTO Post_Reaction (post_id, user_id) VALUES ?;",
    [reactions],
    (error, response) => {
      if (response) {
        res.json({ reactionId: response.reactionId, post_id, user_id })
      } else {
        res.json({
          message: "Cannot create the post reaction. Please try again.",
        })
        console.log("reaction create error ", error)
      }
    }
  )
})

// Delete like
router.post("/delete", (req, res) => {
  const { post_id, user_id } = req.body

  if (!post_id || !user_id) {
    res.json({ message: "Not authorized" })
  }

  db.query(
    "DELETE FROM Post_Reaction WHERE post_id = ? AND user_id = ?;",
    [post_id, user_id],
    (error, response) => {
      //if (response) {
      if (response && response.affectedRows) {
        //res.json({ post_id, user_id })
        res.json({ message: "Delete successfully" })
      } else {
        res.json({
          message: "Cannot delete the post reaction. Please try again.",
        })
        console.log("reaction delete error ", error)
      }
    }
  )
})

module.exports = router
