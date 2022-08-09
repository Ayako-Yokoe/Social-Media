const express = require("express");
const router = express.Router();
const db = require("../config/db.config");

router.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "INSERT INTO Users (username, password) VALUES (?, ?);",
    [username, password],
    (error, results) => {
      // console.log(error);
      // res.send(results);
      if (error) {
        if (error.code === "ER_DUP_ENTRY" || error.errno === 1062) {
          res.json({
            register: false,
            message: "The username already exists.",
          });
        }
      } else {
        res.send(results);
      }
    }
  );
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT * FROM Users WHERE username = ?;",
    username,
    (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        if (password == results[0].password) {
          res.json({ loggedIn: true, username: username });
        } else {
          res.json({ loggedIn: false, message: "Wrong username or password" });
        }
      } else {
        res.json({ loggedIn: false, message: "User doesn't exist" });
      }
    }
  );
});

module.exports = router;
