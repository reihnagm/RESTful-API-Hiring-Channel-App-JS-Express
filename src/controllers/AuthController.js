const userModel = require('../models/User')
const conn = require('../configs/db')
const bcrypt = require('bcrypt')
const config = require('../configs/configs')
const JWT = require('jsonwebtoken')

module.exports = {

    login: (req, res) => {

        const name = req.body.name 
        const password = req.body.password

        userModel.login(name).then(result => {

            const matchedName = name == result[0].name 

            const matchedPassword = bcrypt.compareSync(password, result[0].password);

            const login = matchedPassword && matchedPassword

            if(login)
            {
                res.status(200).json({
                    status: 200,
                    message: 'Success login'
                })
            }
            else 
            {
                res.status(200).json({
                    status: 200,
                    message: 'Name and Passsword not match'
                }) 
            }

        }).catch(err => {

            res.status(400).json({
                message: 'Name and Passsword not match'
            })

        }) 
        
    },  
    register: (req, res) => {
        
        const name = req.body.name
        const password = req.body.password 

        const salt = bcrypt.genSaltSync(10);
        const password_hash = bcrypt.hashSync(password, salt);

        const user = {
            name,
            role_id: 1
        }
        
        const token = JWT.sign({ user }, config.jwtSecret)
       
        userModel.register(name, password_hash).then(result => {
            
            res.status(201).json({
                status: 201,
                message: 'Success register data',
                token   
            })

        }).catch(err => {   
            
            res.status(400).json({
                message: 'Error'
            })

        })

    
    }

}