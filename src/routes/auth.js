const express = require('express')
const Route = express.Router()
const auth = require('../controllers/auth')
const jwtAuth = require('../helpers/jwt')
const multer = require("multer")

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    let role = parseInt(request.body.role)
    if(role === 1) 
      callback(null, "./public/images/engineer")
    else 
      callback(null, "./public/images/company")
  },
  filename: (request, file, callback) => {
    callback(null, file.originalname)
  }
})

const upload = multer({
  storage
})

Route
    .get('/', jwtAuth, auth.auth)
    .post('/login', auth.login)
    .post('/register', upload.single("logo"), auth.register)

module.exports = Route
