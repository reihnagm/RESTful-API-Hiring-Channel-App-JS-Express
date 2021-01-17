const express = require("express")
const Route = express.Router()
const engineer = require("../controllers/engineer")
const multer = require("multer")

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "./public/images/engineer")
  },
  filename: (request, file, callback) => {
    callback(null, file.originalname)
  }
})

const upload = multer({
  storage
})

Route
  .get("/", engineer.all)
  .get("/profile/:slug", engineer.getProfileBySlug)
  .post("/", upload.single("avatar"), engineer.store)
  .put("/", upload.single("avatar"), engineer.update)
  .post("/profile", engineer.getProfile)
  .delete("/:engineerId/:userUid", engineer.delete)
  
module.exports = Route
