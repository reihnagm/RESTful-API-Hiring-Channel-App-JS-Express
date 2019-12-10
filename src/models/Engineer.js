const conn = require('../configs/db');
const redis= require('../configs/redis');

module.exports = { 
    
    all: (data) => {

        return new Promise((resolve, reject) => {

            const page    = parseInt(data.page) || 1
            const perPage = 5
            const start   = (data.perPage * data.page) - data.perPage
            
            const prevPage = page - 1
            const nextPage = page + 1
        
            const name  = data.name
            const skill = data.skill
            
            let query = ""
    
            if(name && skill)
            {
                query = `SELECT * FROM engineer 
                         WHERE name LIKE '%${name}%' OR 
                         skill LIKE '%${skill}%' LIMIT ${start}, ${perPage}`
            }
            else 
            {
                query = `SELECT * FROM engineer LIMIT ${start}, ${perPage}`
            }

            conn.query(query, (err, result) => {

                if(err)
                {
                    reject(new Error(err))
                }

                resolve(result)
      
            })
        
        })

    }, 
    store: (data) => {

        const id   = data.id
        const name = data.name 
        const desc = data.description
        const skill= data.skill 
        const location = data.location
        const date_of_birth = data.date_of_birth 
        const showcase      = data.showcase
        const date_created  = data.date_created
        const date_updated  = data.date_updated

        let query = `INSERT INTO engineer (id, name, description, skill, location, date_of_birth, showcase, date_created, date_updated) VALUES ('${id}','${name}','${desc}', '${skill}', '${location}', '${date_of_birth}','${showcase}','${date_created}', '${date_updated}')`

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

        const name = data.name 
        const desc = data.description
        const skill = data.skill
        const location = data.location
        const date_of_birth = data.date_of_birth
        const showcase = data.showcase
        const date_updated = data.date_updated

        let query = `UPDATE engineer SET 
                    name = '${name}', 
                    description = '${desc}', 
                    skill ='${skill}', 
                    location ='${location}', 
                    date_of_birth = '${date_of_birth}',
                    showcase = '${showcase}', 
                    date_updated = '${date_updated}'
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

        let query = `DELETE FROM engineer WHERE id = '${data.params.id}'`
                
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
   sort_by_date_update: (data) => {

        let query = `SELECT * FROM engineer ORDER BY date_updated ${data.params.sort.toUpperCase()}`
   
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
    sort_by_name: (data) => {

        let query = `SELECT * FROM engineer WHERE name LIKE '%${data.params.name}%'`;
    
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
    sort_by_skill: (data) => {

        let query = `SELECT * FROM engineer WHERE skill LIKE '%${data.params.sort}%'`;
    
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
    // insert_skills: (skill_name, engineer_id) => {

    //     let query = `INSERT INTO skills_engineer (skill_name, engineer_id) VALUES('${skill_name}', '${engineer_id}')`


    //     return new Promise((resolve, reject) => {

    //         conn.query(query, (err, result) => {
            
    //             if(err) 
    //             {
    //                 reject(new Error(err))
    //             }
    //             else 
    //             {
    //                 resolve(result)
    //             }
                   
    //         })
    
    //     })
        
    // }

}