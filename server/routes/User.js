// const express = require("express")
// const router = express.Router()
// const db = require("../config/db.config")

const dotenv = require("dotenv").config()
const jwt = require("jsonwebtoken")
const authConfig = require("../config/auth.config")
const verifyToken = require("../middleware/verifyToken")
const bcrypt = require("bcrypt")
const saltRound = 10

module.exports = function ({ app, db, upload }) {
  // Create controller, model, and router to organize
  //app.post("/user/register", upload.single("avatar"), (req, res, next) => {
  app
    .post("/user/register", (req, res) => {
      const username = req.body.username
      const password = req.body.password

      bcrypt.hash(password, saltRound, (error, hash) => {
        if (error) {
          console.log(error)
        }
        db.query(
          "INSERT INTO User (username, password) VALUES (?, ?);",
          [username, hash],
          (error, results) => {
            if (error) {
              if (error.code === "ER_DUP_ENTRY" || error.errno === 1062) {
                res.json({
                  register: false,
                  message: "The username already exists.",
                })
              } else {
                console.log(error)
              }
            } else {
              res.json({ register: true, message: "Successfully registered." })
            }
          }
        )
      })
    })

    // get("/login") => middleware.verifyToken

    .post("/user/login", (req, res) => {
      const username = req.body.username
      const password = req.body.password

      db.query(
        "SELECT * FROM User WHERE username = ?;",
        username,
        (error, results) => {
          if (error) {
            console.log(error)
          }
          if (results.length > 0) {
            bcrypt.compare(password, results[0].password, (error, response) => {
              if (response) {
                const id = results[0].id
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                  expiresIn: "24h",
                })
                res.json({
                  id: id,
                  success: true,
                  token: token,
                  message: "Authentication successful",
                })
              } else {
                res.json({
                  success: true,
                  message: "Wrong username or password",
                })
              }
            })
          } else {
            res.json({ success: false, message: "Authentication failed" })
          }
        }
      )
    })

  // Get the info of the user who is logging in
  app.get("/user/:id", (req, res) => {
    const userId = req.params.id
    if (!userId) {
      res.json({ message: "Cannot get user information. Please try again." })
    }
    db.query("SELECT * FROM User WHERE id = ?;", [userId], (error, results) => {
      if (results && results.length > 0) {
        res.json(results[0])
      } else {
        res.json({ message: "Cannot get user information. Please try again." })
        console.log(error)
      }
    })
  })

  // Get all users
  app.get("/user", (req, res) => {
    db.query("SELECT * FROM User;", (error, results) => {
      if (results) {
        res.json(results)
      } else {
        res.json({ message: "Cannot get user information" })
        console.log(error)
      }
    })
  })

  // Handle the number of followers
  app.post("/user/followers", (req, res) => {
    const { numberOfFollowers, id } = req.body
    db.query(
      "UPDATE User SET number_of_followers = ? WHERE id = ?",
      [numberOfFollowers, id],
      (error, response) => {
        if (response) {
          res.json({ id })
        } else {
          res.json({ message: "Update failed. Please try again." })
          console.log("post numberOfFollowers update error ", error)
        }
      }
    )
  })

  // Handle the number of following
  app.post("/user/following", (req, res) => {
    const { numberOfFollowing, id } = req.body
    db.query(
      "UPDATE User SET number_of_following = ? WHERE id = ?",
      [numberOfFollowing, id],
      (error, response) => {
        if (response) {
          res.json({ numberOfFollowing })
        } else {
          res.json({ message: "Update failed. Please try again." })
          console.log("post numberOfFollowing update error ", error)
        }
      }
    )
  })

  // Connect to the front end
  // Handle the number of posts
  app.post("/user/posts", (req, res) => {
    const { numberOfPosts, id } = req.body
    db.query(
      "UPDATE User SET number_of_posts = ? WHERE id = ?",
      [numberOfPosts, id],
      (error, response) => {
        if (response) {
          //res.json({ id })
          res.json({ numberOfPosts })
          console.log("numberOfPosts success")
        } else {
          res.json({ message: "Update failed. Please try again." })
          console.log("post numberOfFollowing update error ", error)
        }
      }
    )
  })
}

// module.exports = router
