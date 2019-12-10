const engineerModel = require('../models/Engineer')
const conn   = require('../configs/db')
const config = require('../configs/configs')
const redis  = require('../configs/redis')
const uuidv4 = require('uuid/v4')

const JWT  = require('jsonwebtoken')

module.exports = {

    getAllData: (req, res, next) => {

        JWT.verify(req.token, config.jwtSecret, (err, result) => {
           
            if(err)
            {
            
                res.sendStatus(403)
            
            }
            else 
            {
       
                const page    = parseInt(req.query.page) || 1
                const perPage = 5
                const start   = (perPage * page) - perPage
            
                const prevPage = page - 1
                const nextPage = page + 1

                // Search Engineer by Name & Skill

                const name  = req.query.name
                const skill = req.query.skill

                let totalTableEngineers = 0

                conn.query('SELECT COUNT(*) total_page FROM engineer', (err, res) => {
                    totalTableEngineers = res[0].total_page
                })

                // Passing Data to Model

                const data = {page, perPage, start, prevPage, nextPage, name, skill}
            
                engineerModel.all(data)
                    .then(result => {

                        // Without JSON Parse : [{\"id\":\"b1805524-c39d-48bb-8c77-6331d5301dc7\

                        redis.get(`Engineer:getAllData${page}`, (err_redis, result_redis) => {
                           
                            if(result_redis)
                            {
                                
                                res.status(200).json({
                                    status: 200,
                                    error: false,
                                    source: 'cache',
                                    data: JSON.parse(result_redis),
                                    total_page: totalTableEngineers,
                                    per_page: perPage,
                                    current_page: page,
                                    next_page: nextPage,
                                    prev_page: prevPage, 
                                    message: 'Success getting all data use redis'
                                })

                            }
                            else 
                            {
                                // Set cache expiration to 1 hour (60 minutes)

                                redis.setex(`Engineer:getAllData${page}`, 3600, JSON.stringify(result))

                                res.status(200).json({
                                    status: 200,
                                    error: false,
                                    source: 'api',
                                    data: result,
                                    total_page: totalTableEngineers,
                                    per_page: perPage,
                                    current_page: page,
                                    next_page: nextPage,
                                    prev_page: prevPage, 
                                    message: 'Success getting all data'
                                })
                            }
                            
                        })

                })
                .catch(err => {

                    err.status(400).json({
                        status: 400,
                        error: true,
                        message: ''
                    })

                })
        
            }

        })

    },
    storeData: (req, res) => {

        const id            = uuidv4()
        const name          = req.body.name
        const description   = req.body.description
        const skill         = req.body.skill
        const location      = req.body.location
        const date_of_birth = req.body.birthdate 
        const showcase      = req.file.originalname
    
        const current_datetime = new Date()
        
        const formatted_date = 
        current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()
    
        const date_created  = formatted_date
        const date_updated  = formatted_date
    
        const data = {id,name,description,skill,location,date_of_birth,showcase,date_created,date_updated}
         
        engineerModel.store(data).then(result => {
           
            redis.flushall()
            
            res.status(201).json({
                status: 201,
                error: false,
                result,
                message: 'Success add engineer'
            })

        }).catch(err => {
            
            err.status(400).json({
                status: 400,
                error: true,
                message: 'Error'
            })

        })       

    },
    updateData: (req, res) => {

        const id            = req.params.id 
        const name          = req.body.name
        const description   = req.body.description
        const skill         = req.body.skill
        const location      = req.body.location
        const date_of_birth = req.body.birthdate 
        const showcase      = req.file.originalname

        const current_datetime = new Date()
        const formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()

        const date_updated  = formatted_date

        const data = {id,name,description,skill,location,date_of_birth,showcase,date_updated}

        engineerModel.update(data).then(result => {
           
            redis.flushall()
           
            res.status(201).json({
                status: 201,
                error: false,
                result,
                message: 'Success update engineer'
            })

        }).catch(err => {

            err.status(400).json({
                status: 400,
                error: true,
                message: 'Error'
            })

        })

    },
    deleteData: (req, res) => {

        engineerModel.delete(req).then(result => {

            redis.flushall()
            
            res.status(201).json({
                status: 201,
                error: false,
                result,
                message: 'Success delete engineer'
            })

        }).catch(err => {
          
            err.status(400).json({
                status: 400,
                error: true,
                message: 'Error'
            })

        })
        
    },
    dateUpdateDataSort: (req, res) => {

        const sort = req.params.sort.charAt(0).toUpperCase() + req.params.sort.slice(1);

        engineerModel.sort_by_date_update(req).then(result => {

            redis.get(`Engineer:dateUpdatedDataSort${sort}`, (err_redis, result_redis) => {

                if(err_redis) 
                {
               
                    res.status(500).json({
                        message: 'Something Went Wrong',
                    });
               
                }

                if(result_redis)
                {
                
                    res.status(200).json({
                        status: 200, 
                        error: false,
                        source: 'cache',
                        data: JSON.parse(result_redis),
                        message: 'Success getting all data use redis cache'
                    });
                
                }
                else 
                {
               
                    redis.setex(`Engineer:dateUpdatedDataSort${sort}`, 3600, JSON.stringify(result));
            
                    res.status(200).json({
                        status: 200,
                        error: false,
                        source: 'api',
                        data: result,
                        message: 'Success getting all data'
                    });
               
                }

            })

        }).catch(err => {

            err.status(400).json({
                status: 400,
                error: true,
                message: 'Error'
            })
            
        })

    },
    nameDataSort: (req, res) => {

        const sort = req.params.sort.charAt(0).toUpperCase() + req.params.sort.slice(1);

        engineerModel.sort_by_name(req).then(result => {

            redis.get(`Engineer:nameDataSort${sort}`, (err_redis, result_redis) => {

                if(err_redis) 
                {
               
                    res.status(500).json({
                        message: 'Something Went Wrong',
                    });
               
                }

                if(result_redis)
                {   
                    
                    res.status(200).json({
                        status: 200, 
                        error: false,
                        source: 'cache',
                        data: JSON.parse(result_redis),
                        message: 'Success getting data use redis'
                    })  

                }
                else 
                {

                    redis.setex(`Engineer:nameDataSort${sort}`, 3600, JSON.stringify(result))

                    res.status(200).json({
                        status: 200, 
                        error: false,
                        source: 'ap1',
                        data: result,
                        message: 'Success getting data'
                    })
                    
                }
            
            })

        }).catch(err => {

            err.status(400).json({
                status: 400,
                error: true,
                message: 'Error'
            })

        })
        
    }, 
    skillDataSort: (req, res) => {

        engineerModel.sort_by_skill(req).then(result => {
            
            redis.get(`Engineer:skillDataSort${req.params.sort}`, (err_redis, result_redis) => {

                if(err_redis) 
                {

                    res.status(500).json({
                        message: 'Something Went Wrong',
                    });
               
                }

                if(result_redis)
                {
                    
                    res.status(200).json({
                        status: 200, 
                        error: false,
                        source: 'cache',
                        data: JSON.parse(result_redis),
                        message: 'Success getting data use redis'
                    })  

                }
                else 
                {

                    redis.setex(`Engineer:skillDataSort${req.params.sort}`, 3600, JSON.stringify(result))

                    res.status(200).json({
                        status: 200, 
                        error: false,
                        source: 'api',
                        data: result,
                        message: 'Success getting data'
                    })

                }

            })  

        })

    }    
}

