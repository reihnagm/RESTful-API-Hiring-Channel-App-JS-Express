require('dotenv').config()

const jwt = require('jsonwebtoken')

module.exports = async function(request, response, next) {
    const token = request.header('x-auth-token')
    if (!token) {
        return response.status(401).json({ msg: 'No token, authorization denied' })
    }
    try {
        await jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
            if(error) {
                response.status(401).json({ msg: 'Token is not valid' })
            }
            else {
                request.user = decoded.user;
                next()
            }
        })
    }
    catch (error) {
        console.error(error)
        response.status(500).json({ msg: 'Server Error' })
    }
}
