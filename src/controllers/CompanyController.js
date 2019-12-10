const companyModel = require('../models/Company');
const conn   = require('../configs/db');
const redis  = require('../configs/redis');
const uuidv4 = require('uuid/v4');

module.exports = {

    getAllData: (req, res) => { 

        companyModel.all().then(result => {

            redis.get('Company:getAllData', (error_redis, result_redis) => {
                
                if(result_redis)
                {
 
                    res.status(200).json({
                        status: 200,
                        error: false,
                        source: 'cache',
                        result,
                        message: 'Success getting all data use redis'
                    });

                }
                else 
                {

                    redis.setex('Company:getAllData', 3600, JSON.stringify(result))

                    res.status(200).json({
                        status: 200,
                        error: false,
                        source: 'api',
                        result,
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
    storeData: (req, res) => {

        console.log(req)
        
        const id          = uuidv4(); 
        const name        = req.body.name;
        const logo        = req.file.originalname;
        const location    = req.body.location;
        const description = req.body.description; 
        
        const data        = {id,name,logo,location,description};

        companyModel.store(data).then(result => {

            redis.flushall()

            res.status(201).json({
                status: 201,
                error: false,
                result,
                message: 'Success add company'
            });

        }).catch(err => {

            err.status(400).json({
                status: 400,
                error: true,
                message: 'Error'
            })

        })

    },
    updateData: (req, res) => {

        const id          = req.params.id; 
        const name        = req.body.name;
        const logo        = req.file.originalname;
        const location    = req.body.location;
        const description = req.body.description;

        const data = {id,name,logo,location,description}
        
        companyModel.update(data).then(result => {

            redis.flushall()

            res.status(201).json({
                status: 201,
                error: false,
                result,
                message: 'Success update company'
            });

        }).catch(err => {

            err.status(400).json({
                status: 400,
                error: true,
                message: 'Error'
            })

        })

    },
    deleteData: (req, res) => {

        companyModel.delete(req).then(result => {

            redis.flushall()

            res.status(201).json({
                status: 201,
                error: false,
                result,
                message: 'Success delete company'
            })

        }).catch(err => {

            err.status(400).json({
                status: 400, 
                error: true, 
                message: 'Error'
            })

        })

    }

    
}