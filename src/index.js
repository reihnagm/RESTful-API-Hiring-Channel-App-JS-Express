const express = require('express')
const auth = require('./routes/auth')
const engineer = require('./routes/engineer')
const company = require('./routes/company')
const skill = require('./routes/skill')
const jobtype = require('./routes/jobtype')
const message = require('./routes/message')
const messageNotifications = require('./routes/message_notifcation')
const Route = express.Router()

Route
  .use('/api/v1/engineers', engineer)
  .use('/api/v1/companies', company)
  .use('/api/v1/skills', skill)
  .use('/api/v1/job-types', jobtype)
  .use('/api/v1/messages', message)
  .use('/api/v1/message-notifications', messageNotifications)
  .use('/auth', auth)

module.exports = Route
