const express = require('express');
const Route = express.Router();
const Auth = require('../controllers/auth');
const jwtAuth = require('../helpers/jwt');
Route
    .get('/', jwtAuth, Auth.auth)
    .post('/login', Auth.login)
    .post('/register', Auth.register)
module.exports = Route;
