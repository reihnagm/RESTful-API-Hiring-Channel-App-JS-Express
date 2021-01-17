const express = require("express")
const Route = express.Router()
const skill = require("../controllers/skill")
const multer = require("multer")

Route
  .get("/", skill.all)
  
module.exports = Route
