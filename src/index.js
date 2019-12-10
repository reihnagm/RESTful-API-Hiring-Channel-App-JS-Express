const express = require('express')
const Route = express.Router()

const auth      = require('./routes/auth')
const engineers = require('./routes/engineer')
const companies = require('./routes/company')

Route
  .use('/api/v1', engineers)
  .use('/api/v1', companies)
  .use('/auth', auth)

module.exports = Route
