const express = require("express")
const router = express.Router()
const db = require("../config/db.config")

const dotenv = require("dotenv").config()
const jwt = require("jsonwebtoken")
const authConfig = require("../config/auth.config")
const verifyToken = require("../middleware/verifyToken")
const bcrypt = require("bcrypt")
const saltRound = 10

router.post("/register", (req, res) => {
  const username = req.body.username
  const password = req.body.password

  bcrypt.hash(password, saltRound, (error, hash) => {
    if (error) {
      console.log(error)
    }
    db.query(
      "INSERT INTO Users (username, password) VALUES (?, ?);",
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

router.post("/login", (req, res) => {
  const username = req.body.username
  const password = req.body.password

  db.query(
    "SELECT * FROM Users WHERE username = ?;",
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
            res.json({ success: true, message: "Wrong username or password" })
          }
        })
      } else {
        res.json({ success: false, message: "Authentication failed" })
      }
    }
  )
})

module.exports = router
