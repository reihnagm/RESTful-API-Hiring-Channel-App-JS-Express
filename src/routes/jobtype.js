const express = require("express")
const Route = express.Router()
const jobtype = require("../controllers/jobtype")
const multer = require("multer")

Route
  .get("/", jobtype.all)
  
module.exports = Route
