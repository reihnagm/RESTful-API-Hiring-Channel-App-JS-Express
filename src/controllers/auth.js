require('dotenv').config()

const userModel = require('../models/User')
const bcrypt = require('bcrypt-nodejs')
const JWT = require('jsonwebtoken')

module.exports = {
  login: (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const role_id = req.body.role_id
    const validEmail = /[a-zA-Z0-9_]+@[a-zA-Z]+\.(com|net|org)$/.test(email)

    if (!validEmail) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'Invalid Email e.g johndoe@gmail.com'
      })
    }

    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'Email or Password required'
      })
    }

    userModel.login(email).then(result => {
        const id = result[0].id
        const matchedEmail = email === result[0].email
        const matchedPassword = bcrypt.compareSync(password, result[0].password)
        const matchedRoleId = role_id === result[0].role_id
        const login = matchedEmail && matchedPassword && matchedRoleId

        if (login) {
            const token = JWT.sign(
                {
                    id,
                    email,
                    role_id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: '1h'
                }
            )

            return res.status(200).json({
                error: false,
                status: 200,
                data: result,
                message: 'Success login',
                token
            })
            } else {
            return res.status(400).json({
                error: true,
                status: 400,
                message: 'Email and Passsword not match'
          })
        }
      })
      .catch(err => {
        return res.status(400).json({
            error: true,
            status: 400,
            message: 'Data not found'
        })
      })
  },
  register: (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const role_id = req.body.role_id

    User.getId(email).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })

    const validEmail = /[a-zA-Z0-9_]+@[a-zA-Z]+\.(com|net|org)$/.test(email)

    if (!validEmail) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'Invalid Email e.g johndoe@gmail.com'
      })
    }

    if (!email || !password) {
        return res.status(400).json({
            status: 400,
            error: true,
            message: 'Email and Password required'
        })
    }

    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)

    const data = {
        email,
        password: passwordHash,
        role_id
    }

    const token = JWT.sign(
        {
            email,
            role_id
        },
        process.env.JWT_KEY,
        {
            expiresIn: '1h'
        }
    )

    userModel.register(data).then(result => {
        return res.status(201).json({
            error: false,
            status: 201,
            data,
            message: 'Success register data',
            token
        })
      })
      .catch(err => {
        return res.status(400).json({
            error: true,
            status: 400,
            message: 'Error register data'
        })
      })
  }
}
