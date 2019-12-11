const express = require('express')
const Route = express.Router()

const Auth = require('../controllers/AuthController')

Route
  .post('/login', Auth.login)
  .post('/register', Auth.register)

module.exports = Route
