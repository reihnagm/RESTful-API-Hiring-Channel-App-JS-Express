const express = require('express');
const auth = require('./routes/auth');
const engineer = require('./routes/engineer');
const company = require('./routes/company');
const message = require('./routes/message');
const Route = express.Router();
Route
    .use('/api/v1/engineers', engineer)
    .use('/api/v1/companies', company)
    .use('/api/v1/messages', message)
    .use('/auth', auth);
module.exports = Route;
