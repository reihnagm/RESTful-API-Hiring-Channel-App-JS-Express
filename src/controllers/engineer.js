const Engineer = require('../models/Engineer')
const connection = require('../configs/db')
const cloudinary = require('cloudinary')
// NOTE: Uncomment if use redis
// const redis = require('../configs/redis')
const { check, validationResult } = require('express-validator');
const checkext = require('../helpers/checkext')

module.exports = {
    getAllData: async (request, response) => {

        // NOTE: Without async await
        // let total = 0

        // connection.query('SELECT COUNT(*) total FROM engineer', (error, result) => {
        //     if (error) {
        //         return response.status(400).json({
        //             status: 400,
        //             error: true,
        //             message: error
        //         })
        //     }
        //     total = response[0].total
        // })

        try {

            const page = parseInt(request.query.page) || 1
            const search = request.query.search || ''
            const limit = request.query.limit || 10
            const sort = request.query.sort || 'DESC'
            const sortBy = request.query.sortBy || 'date_updated'

            const offset = (page - 1) * limit

            let total = await Engineer.getCountAll()

            const prevPage = page === 1 ? 1 : page - 1
            const nextPage = page === total[0].total ? total[0].total : page + 1

            let data = await Engineer.all(offset, limit, sort, sortBy, search)

            response.json({
                data,
                total: Math.ceil(total[0].total),
                per_page: limit,
                current_page: page,
                nextLink: `http://localhost:3001${request.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
                prevLink: `http://localhost:3001${request.originalUrl.replace('page=' + page, 'page=' + prevPage)}`
            })
        }
        catch (error) {
            console.error(error)
            response.status(500).send('Server Error')
        }

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

        // }
        // })
        // }).catch(error => {
        //     response.status(400).json({
        //         status: 400,
        //         error: true,
        //         message: error
        //     })
        // })
    },
    storeData: async (request, response) => {

        // if(request.files >= 5242880)  { // 5 MB
        //     return response.status(400).json({ status: 400, error: true, message: "File too large"})
        // }
        //
        // if (!request.files) {
        //     return response.status(400).json({ status: 400, error: true, message: "Please upload file"})
        // }
        //

        if (!validationResult(request).isEmpty()) {
            return response.status(422).json({ errors: validationResult(request).array() })
        }

        const {
            name,
            description,
            skill,
            location,
            birthdate,
            showcase,
            email,
            telephone,
            salary
        } = request.body

        const data = {
            name,
            description,
            skill,
            location,
            birthdate,
            showcase,
            email,
            telephone,
            salary
        }

        // If you want default null
        // const engineerFields = {}
        //
        // if(name) engineerFields.name = name
        // if(description) engineerFields.description = description
        // if(skill) engineerFields.skill = skill
        // if(location) engineerFields.location = location
        // if(birthdate) engineerFields.birthdate = birthdate
        // if(showcase) engineerFields.showcase = showcase
        // if(email) engineerFields.email = email
        // if(telephone) engineerFields.telephone = telephone
        // if(salary) engineerFields.salary = salary

        try {
            // NOTE: Uncomment if use redis, to restart getting new data
            // redis.flushall()
            const result = await Engineer.store(data)
            response.json(result)
        } catch (error) {
            console.error(error)
            response.status(500).send('Server Error')
        }

        //     return response.status(201).json({
        //         status: 201,
        //         error: false,
        //         files: request.files,
        //         data: result,
        //         message: 'Successfull'
        //     })
        // }).catch(error => {
        //     return response.status(422).json({
        //         status: 422,
        //         error: true,
        //         data: error.response,
        //         errors: validationResult(request).array()
        //     })
        // })

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
    updateData: async (request, response) => {

        // if (request.files >= 5242880) { // 5 MB
        //     return response.status(400).json({ status: 400, error: true, message: "File too large" })
        // }
        //
        // if (!request.files) {
        //     return response.status(400).json({ status: 400, error: true, message: "Please upload file" })
        // }
        //
        // if (!validationResult(request).isEmpty()) {
        //     return response.status(422).json({ errors: validationResult(request).array() })
        // }
        //
        // if (request.fileValidationError) {
        //     return response.status(400).json({
        //         status: '400',
        //         message: req.fileValidationError
        //     })
        // }

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


        try {
            const result = await Engineer.update(data, request.params.id)
            response.json(result)
        } catch (error) {
            console.error(errors)
            response.status(500).json('Server error')
        }


        // Engineer.update(data, request.params.id).then(result => {

            // NOTE : Uncomment if use redis, to restart getting new data
            // redis.flushall()

        //     return response.status(201).json({
        //         status: 201,
        //         error: false,
        //         data: result,
        //         message: 'Successful'
        //     })
        // }).catch(error => {
        //     return response.status(400).json({
        //         status: 400,
        //         error: true,
        //         message: error
        //     })
        // })

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
    editData: async (request, response) => {

        try {
            const data = await Engineer.edit(request.params.id)
            response.json(data)
        }
        catch(error)
        {
            console.error(error)
            response.status(500).json('Server Error')
        }


        // engineerModel.edit(request.params.id).then(result => {
        //     response.status(200).json({
        //         status: 200,
        //         error: false,
        //         data: result,
        //         message: 'Successful'
        //     })
        // }).catch(error => {
        //     response.status(400).json({
        //         status: 200,
        //         error: true,
        //         message: error
        //     })
        // })
    },
    deleteData: async (request, response) => {

        try {
            const data = await Engineer.delete(request.params.id)
            response.json(data)
        }
        catch(error)
        {
            console.error(error)
            response.status(500).send('Server Error')
        }

        // NOTE: Without Async Await
        // Engineer.delete(req.params.id).then(result => {
        //
        //     // uncomment if use redis, to restart getting new data
        //     // redis.flushall()
        //
        //     response.status(200).json({
        //         status: 200,
        //         error: false,
        //         data: result,
        //         message: 'Successful'
        //     })
        // }).catch(error => {
        //     response.status(400).json({
        //         status: 400,
        //         error: true,
        //         message: error
        //     })
        // })
    },
    uploadAvatar: async (request, response) => {

        const values = Object.values(request.files)
        const promises = values.map(image => cloudinary.uploader.upload(image.path))

        try {

            const result = await Promise.all(promises)

            console.log(result)

            // NOTE: promises output
            // public_id: 'umshmrnaldhiwd5kn11b',
            // version: 1577098270,
            // signature: 'f1a4c65736906d0f22ff7c7d0cfa4847917bfd9a',
            // width: 745,
            // height: 497,
            // format: 'jpg',
            // resource_type: 'image',
            // created_at: '2019-12-23T10:51:10Z',
            // tags: [],
            // bytes: 59921,
            // type: 'upload',
            // etag: 'f3cf3bd351fdbb73d32f07d1d832abd0',
            // placeholder: false,
            // url: 'http://res.cloudinary.com/dilzovvfk/image/upload/v1577098270/umshmrnaldhiwd5kn11b.jpg',
            // secure_url: 'https://res.cloudinary.com/dilzovvfk/image/upload/v1577098270/umshmrnaldhiwd5kn11b.jpg',
            // original_filename: '8FPchFVJpFNAtzbgbZ2O0obH'

            await Engineer.saveAvatar(result[0].url)

        } catch(error) {
            console.error(error)
        }
    }
}
