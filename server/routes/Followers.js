// const express = require("express")
// const router = express.Router()
// const db = require("../config/db.config")

module.exports = function ({ app, db }) {
  // Get all followers info
  app.post("/followers", (req, res) => {
    const { follower_id, person_id } = req.body

    if (!follower_id || !person_id) {
      res.json({ message: "Not found" })
    }

    db.query(
      "SELECT * FROM Follower WHERE follower_id = ? AND person_id = ?;",
      [follower_id, person_id],
      (error, response) => {
        if (response && response.length) {
          res.json({ ...response[0], message: "success" })
        } else {
          res.json({ message: "Not Found" })
          console.log("follower post error ", error)
        }
      }
    )
  })

  // Handle following button
  app.post("/followers/create", (req, res) => {
    const { follower_id, person_id } = req.body

    if (!follower_id || !person_id) {
      res.json({ message: "Not authorized" })
    }
    const followers = [[follower_id, person_id]]
    db.query(
      "INSERT INTO Follower (follower_id, person_id) VALUES ?;",
      [followers],
      (error, response) => {
        if (response) {
          res.json({ followerId: response.followerId, follower_id, person_id })
        } else {
          res.json({ message: "Cannot create" })
          console.log("follower create error ", error)
        }
      }
    )
  })

  // Delete following
  app.post("/followers/delete", (req, res) => {
    const { follower_id, person_id } = req.body

    if (!follower_id || !person_id) {
      res.json({ message: "Not authorized" })
    }

    db.query(
      "DELETE FROM Follower WHERE follower_id = ? AND person_id = ?;",
      [follower_id, person_id],
      (error, response) => {
        if (response && response.affectedRows) {
          res.json({ message: "Delete successfully" })
        } else {
          res.json({ message: "Cannot delete" })
          console.log("reaction delete error ", error)
        }
      }
    )
  })
}

// module.exports = router
