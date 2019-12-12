require('dotenv').config()

const userModel = require('../models/User')
const bcrypt = require('bcrypt-nodejs')
const JWT = require('jsonwebtoken')

module.exports = {
  login: (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const validEmail = /[a-zA-Z0-9_]+@[a-zA-Z]+\.(com|net|org)$/.test(email)

    if (!validEmail) {
      res.status(400).json({
        status: 400,
        message: 'Invalid Email'
      })
    }

    if (!email || !password) {
      res.status(400).json({
        status: 400,
        message: 'Email or Password required'
      })
    }

    userModel.login(email).then(result => {
      const matchedEmail = email === result[0].email
      const matchedPassword = bcrypt.compareSync(password, result[0].password)
      const login = matchedEmail && matchedPassword

      if (login) {
        const token = JWT.sign(
          {
            email
          },
          process.env.JWT_KEY,
          {
            expiresIn: '1h'
          }
        )

        res.status(200).json({
          error: false,
          status: 200,
          message: 'Success login',
          token
        })
      } else {
        res.status(400).json({
          error: false,
          status: 400,
          message: 'Email and Passsword not match'
        })
      }
    }).catch(err => {
      err.status(400).json({
        error: false,
        status: 400,
        message: 'Email and Password not match'
      })
    })
  },
  register: (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const validEmail = /[a-zA-Z0-9_]+@[a-zA-Z]+\.(com|net|org)$/.test(email)

    if (!validEmail) {
      res.status(400).json({
        error: 'true',
        message: 'Invalid Email e.g johndoe@gmail.com'
      })
    }

    if (!email || !password) {
      res.status(400).json({
        error: 'true',
        message: 'Email and Password required'
      })
    }

    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)

    const data =
      {
        email,
        password: passwordHash
      }

    userModel.register(data).then(result => {
      res.status(201).json({
        status: 201,
        message: 'Success register data'
      })
    }).catch(err => {
      res.status(400).json({
        message: 'Error'
      })
    })
  }
}
