const userRoutes = require("./User")
const postRoutes = require("./Post")
const followerRoutes = require("./Followers")
const reactionRoutes = require("./Reaction")

module.exports = function ({ app, db, upload }) {
  userRoutes({ app, db, upload })
  postRoutes({ app, db, upload })
  followerRoutes({ app, db })
  reactionRoutes({ app, db })
}
