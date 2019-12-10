const conn = require('../configs/db')
const redis= require('../configs/redis')

module.exports = {

    all: () => {

        let query = 'SELECT * FROM company'

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

    },
    store: (data) => {

        const id   = data.id 
        const name = data.name
        const logo = data.logo
        const location = data.location
        const desc = data.description

        let query = `INSERT INTO company (id, name, logo, location, description) 
                    VALUES ('${id}','${name}','${logo}','${location}', '${desc}')`

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
    
    },
    update: (data) => {

        const id = data.id

        const name     = data.name 
        const logo     = data.logo 
        const location = data.location
        const desc     = data.description
        
        let query = `UPDATE company SET 
                    name  = '${name}', 
                    logo  = '${logo}',  
                    location = '${location}',
                    description = '${desc}'
                    WHERE id = '${id}'`

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
    
    },
    delete: (data) => {

        let query = `DELETE FROM company WHERE id = '${data.params.id}'`

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