require('dotenv').config()

const userModel = require('../models/User')
const bcrypt = require('bcrypt-nodejs')
const JWT = require('jsonwebtoken')

module.exports = {
  login: (req, res) => {
    const email = req.body.email
    const password = req.body.password

    userModel.login(email).then(result => {
      const matchedEmail = email == result[0].email
      const matchedPassword = bcrypt.compareSync(password, result[0].password)
      const login = matchedEmail && matchedPassword

      if (login) {
        const token = JWT.sign(
          {
            email
          },
          'secret_key',
          {
            expiresIn: '1h'
          }
        )

        res.status(200).json({
          status: 200,
          message: 'Success login',
          token
        })
      } else {
        res.status(400).json({
          message: 'Name and Passsword not match'
        })
      }
    }).catch(err => {
      res.status(400).json({
        message: 'Name and Password not match'
      })
    })
  },
  register: (req, res) => {
    const email = req.body.email
    const password = req.body.password

    console.log(req)

    const salt = bcrypt.genSaltSync(10)
    const password_hash = bcrypt.hashSync(password, salt)

    const data =
      {
        email,
        password: password_hash
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

// }).catch(err => {
//   res.status(400).json({
//     message: 'Name and Passsword not match'
//   })
// })
// module.exports = {
//   login: (req, res) => {
//     const name = req.body.name
//     const password = req.body.password

//     userModel.login(name).then(result => {
//       const matchedName = name == result[0].name
//       const matchedPassword = bcrypt.compareSync(password, result[0].password)
//       const login = matchedPassword && matchedPassword

//       const user = {
//         name: result[0].name,
//         role_id: result[0].role_id
//       }

//       const token = JWT.sign({ user }, config.jwtSecret)

//       if (login) {
//         res.status(200).json({
//           status: 200,
//           message: 'Success login',
//           token
//         })
//       } else {
//         res.status(400).json({
//           message: 'Name and Passsword not match'
//         })
//       }
//     }).catch(err => {
//       res.status(400).json({
//         message: 'Name and Passsword not match'
//       })
//     })
//   },
//   register: (req, res) => {
//     const name = req.body.name
//     const password = req.body.password
//     const role_id = req.body.role_id

//     const salt = bcrypt.genSaltSync(10)
//     const password_hash = bcrypt.hashSync(password, salt)

//     const user = {
//       name,
//       role_id
//     }

//     const token = JWT.sign({ user }, config.jwtSecret)

//     userModel.register(name, password_hash, role_id).then(result => {
//       res.status(201).json({
//         status: 201,
//         message: 'Success register data',
//         token
//       })
//     }).catch(err => {
//       res.status(400).json({
//         message: 'Error'
//       })
//     })
//   }
// }
