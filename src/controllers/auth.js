require('dotenv').config()
const User = require('../models/User')
const Engineer = require('../models/Engineer')
const Company = require('../models/Company')
const misc = require('../helpers/response')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
module.exports = {
    auth: async (request, response) => {
        const user_id = request.user.id
        try {
            const data = await User.auth(user_id)
            misc.response(response, 200, false, 'Succesfull Authentication.', data[0])
        } catch (error) {
            misc.response(response, 500, true, error.message)
        }
    },
    login: async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() })
        }
        const { email, password } = request.body
        try {
            const user = await User.login(email)
            if (user.length === 0) {
                throw new Error('Invalid Credentials.')
            }
            const isMatch = await bcrypt.compare(password, user[0].password)
            if (!isMatch) {
                throw new Error('Invalid Credentials.')
            }
            const payload = {
                user: {
                    id: user[0].id
                }
            }
            const token = await jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 360000 })
            misc.response(response, 200, false, 'Succesfull Login.', token)
        } catch(error) {
            misc.response(response, 500, true, error.message)
        }
    },
    register: async (request, response) => {
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() })
        }
        const { name, email, password, role_id } = request.body
        try {
            const user = await User.checkUser(email)
            if(user.length !== 0) {
                throw new Error('User already exists.')
            }
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt)
            const data = {
                name,
                email,
                password: passwordHash,
                role_id
            }
            const registered = await User.register(data)
            let user_data = {
                user_id: registered.insertId
            }
            switch (role_id) {
                case 1:
                    await Engineer.insertDataUser(user_data)
                break;
                case 2:
                    await Company.insertDataUser(user_data)
                break;
                default:
            }
            const payload = {
                user: {
                    id: registered.insertId
                }
            }
            const token = await jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 360000 })
            misc.response(response, 200, false, 'Succesfull Register.', token)
        } catch(error) {
            misc.response(response, 500, true, error.message)
        }
    }
}
