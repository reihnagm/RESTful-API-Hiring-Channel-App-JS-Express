require('dotenv').config()

const JWT = require('jsonwebtoken')

module.exports = {
  check: (req, res, next) => {

    const { authorization, email } = req.headers

    if (!authorization || !email) {
      res.status(404).json({
        message: 'Unauthorized!'
      })
    }

    const token = authorization.split(' ')[1]

    JWT.verify(token, process.env.JWT_KEY, (err, decoded) => {

    if (err && err.name === 'JsonWebTokenError') {
      res.status(403).json({
        message: 'Invalid token!',
        err
      })
    }

    if (err && err.name === 'TokenExpiredError') {
      res.status(403).json({
        message: 'Invalid token'
      })
    }

    if (email !== decoded.email) {
      res.status(403).json({
        message: 'Token not valid for selected email'
      })
    }

      next()
    })
  }
}
