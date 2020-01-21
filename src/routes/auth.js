const express = require('express')
const Route = express.Router()
const Auth = require('../controllers/auth')
const { check } = require('express-validator')
const jwtAuth = require('../helpers/auth')
Route
    .get('/', jwtAuth, Auth.auth)
    .post('/login', [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
        ], Auth.login)
    .post('/register', [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password','Please enter a password with 6 or more characters').isLength({ min: 6 })
        ], Auth.register)
module.exports = Route
