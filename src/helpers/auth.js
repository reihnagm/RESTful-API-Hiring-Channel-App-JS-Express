require('dotenv').config()

const JWT = require('jsonwebtoken')

// NOTE: this is for learning how to works JsonWebToken

// module.exports = {
//     check: (request, response, next) => {
//         const { authorization } = req.headers
//
//         if (!authorization) {
//             response.status(404).json({
//                 message: 'Unauthorized!'
//             })
//         }
//
//         const token = authorization.split(' ')[1]
//
//         JWT.verify(token, process.env.JWT_KEY, (error, decoded) => {
//             if (error && error.name === 'JsonWebTokenError') {
//                 res.status(403).json({
//                     message: 'Invalid token!',
//                     error
//                 })
//             }
//
//             if (err && err.name === 'TokenExpiredError') {
//                     request.status(403).json({
//                     message: 'Token Expired'
//                 })
//             }
//
//             next()
//
//         })
//     }
// }


module.exports = async function(request, response, next) {

    // NOTE: Get token from header

        const token = req.header('x-auth-token');


    // NOTE: Check if not token

    if (!token) {
        return response.status(401).json({ msg: 'No token, authorization denied' });
    }

    // NOTE: Verify Token

    try {
        await jwt.verify(token, proecess.JWT_KEY, (error, decoded)=>{
            if(error){
                response.status(401).json({ msg: 'Token is not valid' });
            }
            else{
                request.user = decoded.user;
                next();
            }
        });
      }
    catch (error) {
        console.error('Something wrong with auth middleware')
        res.status(500).json({ msg: 'Server Error' });
    }
};
