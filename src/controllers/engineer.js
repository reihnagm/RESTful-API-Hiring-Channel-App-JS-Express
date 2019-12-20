const engineerModel = require('../models/Engineer')
const connection = require('../configs/db')
// const redis = require('../configs/redis')
const { check, validationResult } = require('express-validator');
const checkext = require('../helpers/checkext')

module.exports = {
    getAllData: (request, response) => {

        const page = parseInt(request.query.page) || 1
        const search = request.query.search || ''
        const limit = request.query.limit || 10
        const sort = request.query.sort || 'DESC'
        const sortBy = request.query.sortBy || 'date_updated'

        const offset = (page - 1) * limit

        let totalDataEngineer = 0

        connection.query('SELECT COUNT(*) total_data FROM engineer', (error, result) => {
            if (error) {
                return response.status(400).json({
                    status: 400,
                    error: true,
                    message: error
                })
            }
            totalDataEngineer = res[0].total_data
        })

        const prevPage = page === 1 ? 1 : page - 1
        const nextPage = page === totalDataEngineer ? totalDataEngineer : page + 1

        engineerModel.all(offset, limit, sort, sortBy, search).then(result => {
          // redis.get(
          //   `page - ${page} - search ${search} - limit ${limit} - ${sort} - ${sortBy}`,
          //   (errRedis, resultRedis) => {
          //     if (errRedis) {
          //       res.status(400).json({
          //         error: true,
          //         message: errRedis
          //       })
          //     }

          // let pageDetail = {
          //   total_data: totalDataEngineer,
          //   per_page: limit,
          //   current_page: page,
          //   nextLink: `http://localhost:3000${req.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
          //   prevLink: `http://localhost:3000${req.originalUrl.replace('page=' + page, 'page=' + prevPage)}`,
          // }

          // if (resultRedis) {
          //   res.status(200).json({
          //     status: 200,
          //     error: false,
          //     source: 'cache',
          //     data: JSON.parse(resultRedis),
          //     total_data: Math.ceil(totalDataEngineer),
          //     per_page: limit,
          //     current_page: page,
          //     nextLink: `http://localhost:3001${req.originalUrl.replace(
          //       'page=' + page,
          //       'page=' + nextPage
          //     )}`,
          //     prevLink: `http://localhost:3001${req.originalUrl.replace(
          //       'page=' + page,
          //       'page=' + prevPage
          //     )}`,
          //     message: 'Success getting all data use redis'
          //   })
          // } else {
          // Set Cache Expiration to 1 Hour (60 minutes)

          // redis.setex(
          //   `page - ${page} - search ${search} - limit ${limit} - ${sort} - ${sortBy}`,
          //   3600,
          //   JSON.stringify(result)
          // )

            response.status(200).json({
                status: 200,
                error: false,
                source: 'api',
                data: result,
                total_data: Math.ceil(totalDataEngineer),
                per_page: limit,
                current_page: page,
                nextLink: `http://localhost:3001${req.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
                prevLink: `http://localhost:3001${req.originalUrl.replace('page=' + page, 'page=' + prevPage)}`,
                message: 'Success getting all data'
            })
          // }
          // })
        }).catch(error => {
            response.status(400).json({
                status: 400,
                error: true,
                message: error
            })
        })
      },
    storeData: (request, response) => {

        if(request.files >= 5242880)  { // 5 MB
            return response.status(400).json({ status: 400, error: true, message: "File too large"})
        }

        if (!request.files) {
            return response.status(400).json({ status: 400, error: true, message: "Please upload file"})
        }

        if (!validationResult(request).isEmpty()) {
            return response.status(422).json({ errors: validationResult(request).array() })
        }

        const data =
        {
            name: request.body.name,
            description: request.body.description,
            skill: request.body.skill,
            location: request.body.location,
            birthdate: request.body.birthdate,
            showcase: request.body.showcase,
            email: request.body.email,
            telephone: request.body.telephone,
            salary: request.body.salary,
            user_id: request.body.user_id
        }

        engineerModel.store(data).then(result => {

            // uncomment if use redis, to restart getting new data
            // redis.flushall()

            return response.status(201).json({
                status: 201,
                error: false,
                files: request.files,
                data: result,
                message: 'Successfull'
            })
        }).catch(error => {
            return response.status(422).json({
                status: 422,
                error: true,
                errors: validationResult(request).array()
            })
        })

    // request.checkBody('avatar', 'Avatar - Please upload an image JPG, JPEG, PNG or GIF').isImage(typeof request.files['avatar'] !== "undefined" ? request.files['avatar'][0].filename : '');

    // const showcase =  req.files[0].originalname
    // const avatar =  req.files[1].originalname

    // if (req.files[0].size >= 5242880) {
    //   return res.status(400).json({
    //     status: 400,
    //     error: true,
    //     message: 'Showcase size cannot larger than 5MB'
    //   })
    // }
    //
    // if (req.files[1].size >= 5242880) {
    //   return res.status(400).json({
    //     status: 400,
    //     error: true,
    //     message: 'Avatar size cannot larger than 5MB'
    //   })
    // }
    //
    // if (!checkext.checkFileImg(req.files[0].mimetype)) {
    //   return res.status(400).json({
    //     status: 400,
    //     error: true,
    //     message: 'Support type file only : JPEG, GIF, PNG, SVG, BMP'
    //   })
    // }
    //
    // if (!checkext.checkFileImg(req.files[1].mimetype)) {
    //   return res.status(400).json({
    //     status: 400,
    //     error: true,
    //     message: 'Support type file only : JPEG, GIF, PNG, SVG, BMP'
    //   })
    // }
    //
    // if (req.fileValidationError) {
    //   res.status(400).json({
    //     status: '400',
    //     message: req.fileValidationError
    //   })
    // }


    },
    updateData: (request, response) => {

        if(request.files >= 5242880)  { // 5 MB
            return response.status(400).json({ status: 400, error: true, message: "File too large"})
        }

        if (!request.files) {
            return response.status(400).json({ status: 400, error: true, message: "Please upload file"})
        }

        if (!validationResult(request).isEmpty()) {
            return response.status(422).json({ errors: validationResult(request).array() })
        }

        if (request.fileValidationError) {
            return response.status(400).json({
                status: '400',
                message: req.fileValidationError
            })
        }

        const data =
        {
            name: request.body.name,
            description: request.body.description,
            skill: request.body.skill,
            location: request.body.location,
            birthdate: request.body.birthdate,
            showcase: request.body.showcase,
            email: request.body.email,
            telephone: request.body.telephone,
            salary: request.body.salary,
            user_id: request.body.user_id
        }

        engineerModel.update(data, request.params.id).then(result => {

            // uncomment if use redis, to restart getting new data
            // redis.flushall()

            return response.status(201).json({
                status: 201,
                error: false,
                data: result,
                message: 'Successful'
            })
        }).catch(error => {
            return response.status(400).json({
                status: 400,
                error: true,
                message: error
            })
        })

    // const showcase = req.files[0].originalname
    // const avatar = req.files[1].originalname

    // if (req.files[0].size >= 5242880) {
    //   return res.status(400).json({
    //     status: 400,
    //     error: true,
    //     message: 'Showcase size cannot larger than 5MB'
    //   })
    // }
    //
    // if (req.files[1].size >= 5242880) {
    //   return res.status(400).json({
    //     status: 400,
    //     error: true,
    //     message: 'Avatar size cannot larger than 5MB'
    //   })
    // }
    //
    // if (!checkext.checkFileImg(req.files[0].mimetype)) {
    //   return res.status(400).json({
    //     status: 400,
    //     error: true,
    //     message: 'Support type file only : JPEG, GIF, PNG, SVG, BMP'
    //   })
    // }
    //
    // if (!checkext.checkFileImg(req.files[1].mimetype)) {
    //   return res.status(400).json({
    //     status: 400,
    //     error: true,
    //     message: 'Support type file only : JPEG, GIF, PNG, SVG, BMP'
    //   })
    // }
    //
    // if (req.fileValidationError) {
    //   res.status(400).json({
    //     status: '400',
    //     message: req.fileValidationError
    //   })
    // }

    },
    editData: (request, response) => {
        engineerModel.edit(request.params.id).then(result => {
            response.status(200).json({
                status: 200,
                error: false,
                data: result,
                message: 'Successful'
            })
        }).catch(error => {
            response.status(400).json({
                status: 200,
                error: true,
                message: error
            })
        })
    },
    deleteData: (request, response) => {
        engineerModel.delete(req.params.id).then(result => {

            // uncomment if use redis, to restart getting new data
            // redis.flushall()

            response.status(200).json({
                status: 200,
                error: false,
                data: result,
                message: 'Successful'
            })
        }).catch(error => {
            response.status(400).json({
              status: 400,
              error: true,
              message: error
            })
        })
    }
}
