const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "INSERT INTO Users (username, password) VALUES (?, ?);",
    [username, password],
    (error, results) => {
      console.log(error);
      res.send(results);
    }
  );
});

module.exports = router;
