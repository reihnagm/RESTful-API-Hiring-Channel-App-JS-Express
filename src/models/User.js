const conn = require('../configs/db');
const bcrypt = require('bcrypt')

module.exports = {

    login: (name, password) => {

        return new Promise((resolve, reject) => {

            conn.query(`SELECT * FROM user WHERE name = '${name}'`, (err, result) => {

                if(err) 
                {
                    reject(new Error(err))
                }
                else 
                {
                    resolve(result)
                }

            }) 
            
        })

    },

    register: (name, password) => {
        
        let query = `INSERT INTO user (name, password, role_id) VALUES ('${name}','${password}', 1)` 

        return new Promise((resolve, reject) => {
            
            conn.query(query, (err, result) => {
               
                if(err)
                {
                
                    reject(new Error(err))
                
                }
                else 
                {
                
                    resolve(result)
                
                }

            })

        })

    }

}