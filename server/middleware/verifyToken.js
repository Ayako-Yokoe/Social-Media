const jwt = require("jsonwebtoken")
const config = require("../config/auth.config")

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"]
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length)
  }

  if (token) {
    jwt.verify(token, config.secret, (error, decoded) => {
      if (error) {
        return res.json({
          success: false,
          message: "Token is not valid",
        })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied",
    })
  }
}

module.exports = { verifyToken: verifyToken }
