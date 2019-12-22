require('dotenv').config()

const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

module.exports = {

    login: async (request, response) => {

        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const { email, password } = request.body

        // NOTE: try catch useful when use async await
        try {

            let user = await User.login(email)

            // NOTE:  when use mongoose db, use findOne,to check user already exists or not
            if (user.length === 0) {
                return response.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
            }

            // NOTE: be aware, when if you want getting data, type data is array object, you must be
            // use this, : user[0].data
            const isMatch = await bcrypt.compare(password, user[0].password);

            if (!isMatch) {
                return response.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
            }

            const payload = {
                user: {
                    id: user[0].id // NOTE: be aware, when if you want getting data, type data is array object, you must be
                    // use this, : user[0].data
                }
            }

            const token = await jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 360000 })

            response.json({ token })

            // NOTE: Without async await
            // jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 360000 }, (error, token) => {
            //     if (error) throw error
            //     response.json({ token })
            // })

        }
        catch(error) {

            console.error(error.message)
            response.status(500).send('Server error')

        }
    },
    register: async (request, response) => {

        const errors = validationResult(request)

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() })
        }

        const { name, email, password } = request.body

        // NOTE: try catch useful when use async await
        try {

            let user = await User.checkUser(email);

            // NOTE: when use mongoose db, use findOne,to check user already exists or not
            if (user.length === 0)
            {
            // NOTE: Hash Password, be aware when use bcrypt, sometimes error with different packages if use async await
            //surely use package bcryptjs
            const salt = await bcrypt.genSalt(10);

            const passwordHash = await bcrypt.hash(password, salt);

            const data = { name, email, password: passwordHash }

            // NOTE: Success with async
            let registered = await User.register(data)

            const payload = {
                user: {
                    id: registered.insertId // NOTE: insertId mean is user when first register
                }
            };

            const token = await jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 360000 })

            response.json({ token })

            // NOTE: Without async await
            // jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 360000 }, (error, token) => {
            //     if (error) throw error
            //     response.json({ token })
            // })

            } else {
                return response.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

        }
        catch(error) {
            console.error(error.message);
            response.status(500).send('Server error');
        }

        // NOTE: Success without async await
        // User.register(data).then(response => {
        //     console.log(response)
        // }).catch(error => {
        //     console.error(error)
        // })

        // try {
        //
        //     let user = await User.checkUser(email);
        //
        //     if (user)
        //     {
        //         return response.status(400).json({ errors: [{ msg: 'User already exists' }] });
        //     }
        //
        //     const salt = await bcrypt.genSalt(10);
        //
        //     const bcryptPassword = await bcrypt.hash(password, salt);
        //
        //     let userSave = await User.register(name, email, bcryptPassword)
        //
        //     const payload = {
        //         user: {
        //             id: user.id
        //         }
        //     };
        //
        //     jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 360000 }, (error, token) => {
        //         if (err) throw err;
        //         response.json({ token });
        //     })
        // }
        // catch (error) {
        //     console.error(error.message);
        //     response.status(500).send('Server error');
        // }
    }

}
