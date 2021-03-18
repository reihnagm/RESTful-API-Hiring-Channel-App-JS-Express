require('dotenv').config()
const misc = require('../helpers/helper')
const jwt = require('jsonwebtoken')

module.exports = function(request, response, next) {
  
  const token = request.header('x-auth-token')

  if (!token) {
    return misc.response(response, 401, true, 'No token, authorization denied.')
  }
  try {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if(err) {
        console.log(err)
        if(err.message === "jwt expired") {
          misc.response(response, 401, true, 'Token Expired.')
        } 
        if(err.message === "invalid token") {
          misc.response(response, 401, true, 'Invalid Token.')
        }
      }
      else {
        request.user = decoded.user
        next()
      }
    })
  }
  catch (err) {
    console.log(err.message) // in-development
    misc.response(response, 500, true, 'Server Error.')
  }

}
