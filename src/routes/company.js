const express = require('express');
const Route = express.Router();
const company = require('../controllers/company');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, './public/images/company');
  },
  filename: (request, file, callback) => {
    callback(null, file.originalname);
  }
});
const upload = multer({
  storage
});
Route
  .get("/", company.all)
  .get("/profile/:slug", company.getProfileBySlug)
  .post("/", upload.single("logo"), company.store)
  .patch("/:id", upload.single("logo"), company.update)
  .delete("/:id", company.delete)
  .post("/profile", company.getProfile);
module.exports = Route;
