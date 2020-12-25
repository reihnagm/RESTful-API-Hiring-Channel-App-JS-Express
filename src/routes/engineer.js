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
  .get("/skills", engineer.getSkills)
  .post("/", upload.single("avatar"), engineer.store)
  .put("/", upload.single("avatar"), engineer.update)
  .delete("/:engineerId/:userUid", engineer.delete)
  .post("/profile", engineer.getProfile)
  
module.exports = Route
