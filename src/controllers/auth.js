require('dotenv').config();
const User = require('../models/User');
const Engineer = require('../models/Engineer');
const Company = require('../models/Company');
const misc = require('../helpers/response');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
module.exports = {
    auth: async (request, response) => {
        const user_id = request.user.id;
        try {
            const data = await User.auth(user_id)
            misc.response(response, 200, false, 'Succesfull Authentication.', data[0]);
        } catch (error) {
            misc.response(response, 500, true, error.message);
        }
    },
    login: async (request, response) => {
        const { email, password } = request.body;
        try {
            const user = await User.login(email);
            const isMatch = await bcrypt.compare(password, user[0].password);
            if (user.length === 0) {
                throw new Error('Invalid Credentials.');
            }
            if (!isMatch) {
                throw new Error('Invalid Credentials.');
            }
            const payload = {
                user: {
                    id: user[0].id
                }
            }
            const token = await jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 360000 });
            response.json({ token });
        } catch(error) {
            misc.response(response, 500, true, error.message);
        }
    },
    register: async (request, response) => {
        const { name, email, password, role_id } = request.body;
        try {
            const user = await User.checkUser(email);
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            if(user.length !== 0) {
                throw new Error('User already exists.');
            }
            const slug = name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
            const data = {
                name,
                email,
                password: passwordHash,
                role_id,
                slug
            }
            const registered = await User.register(data);
            switch (role_id) {
                case 1:
                    await Engineer.insertDataUser(registered.insertId);
                break;
                case 2:
                    await Company.insertDataUser(registered.insertId);
                break;
                default:
            }
            const payload = {
                user: {
                    id: registered.insertId
                }
            }
            const token = await jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 360000 });
            response.json({ token });
        } catch(error) {
            misc.response(response, 500, true, error.message);
        }
    }
}
