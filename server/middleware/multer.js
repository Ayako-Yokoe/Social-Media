// const multer = require("multer")

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "/public")
//   },
//   filename: function (req, file, cb) {
//     const filename = file.mimetype.includes("image")
//       ? `${file.fieldname}-${Date.now()}.jpg`
//       : `${file.fieldname}-${Date.now()}.mp4`
//     cb(null, filename)
//   },
// })

// const upload = multer({ storage: storage }).single("image")

// mistake!!!!
// const upload = (req, res, next) => {
//   multer({ storage: storage }).single("image")
//   next()
// }

//module.exports = upload
