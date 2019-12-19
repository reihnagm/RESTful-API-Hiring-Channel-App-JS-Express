const engineerModel = require('../models/Engineer')
const conn = require('../configs/db')
// const redis = require('../configs/redis')
const checkext = require('../helpers/checkext')
const miscHelper = require('../controllers/response')

module.exports = {
  getAllData: (req, res) => {
    const page = parseInt(req.query.page) || 1
    const search = req.query.search || ''
    const limit = req.query.limit || 10
    const sort = req.query.sort || 'DESC'
    const sortBy = req.query.sortBy || 'date_updated'

    const offset = (page - 1) * limit

    let totalDataEngineer = 0

    conn.query('SELECT COUNT(*) total_data FROM engineer', (err, res) => {
      if (err) {
        return miscHelper.response(res, 400, true, 'Error', err)
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

        res.status(200).json({
          status: 200,
          error: false,
          source: 'api',
          data: result,
          total_data: Math.ceil(totalDataEngineer),
          per_page: limit,
          current_page: page,
          nextLink: `http://localhost:3001${req.originalUrl.replace(
            'page=' + page,
            'page=' + nextPage
          )}`,
          prevLink: `http://localhost:3001${req.originalUrl.replace(
            'page=' + page,
            'page=' + prevPage
          )}`,
          message: 'Success getting all data'
        })
        // }
        // })
      })
      .catch(err => {
        err.status(400).json({
          status: 400,
          error: true,
          message: err
        })
      })
  },
  storeData: (req, res) => {

    const {
      user_id,
      name,
      description,
      skill,
      location,
      email,
      telephone,
      showcase,
      salary,
      avatar
    } = req.body

    const dateOfBirth = req.body.birthdate

    // const showcase =  req.files[0].originalname
    // const avatar =  req.files[1].originalname
    //
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

    const validEmail = /[a-zA-Z0-9_]+@[a-zA-Z]+\.(com|net|org)$/.test(email)

    if (!validEmail) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'Invalid Email e.g johndoe@gmail.com'
      })
    }
    if (!name) {
      return res.status(400).json({
        error: true,
        message: 'Name required'
      })
    }
    if (!description) {
      return res.status(400).json({
        error: true,
        message: 'Description required'
      })
    }
    if (!skill) {
      return res.status(400).json({
        error: true,
        message: 'Skill required'
      })
    }
    if (!location) {
      return res.status(400).json({
        error: true,
        message: 'Location required'
      })
    }
    if (!dateOfBirth) {
      return res.status(400).json({
        error: true,
        message: 'Date of birth required'
      })
    }
    if (!email) {
      return res.status(400).json({
        error: true,
        message: 'Email required'
      })
    }
    if (!telephone) {
      return res.status(400).json({
        error: true,
        message: 'Telephone required'
      })
    }
    if (!salary) {
      return res.status(400).json({
        error: true,
        message: 'Telephone required'
      })
    }

    const data = {
      user_id,
      name,
      description,
      skill,
      location,
      date_of_birth: dateOfBirth,
      showcase,
      email,
      telephone,
      salary,
      avatar,
      date_created: new Date(),
      date_updated: new Date()
    }

    engineerModel
      .store(data)
      .then(result => {
        // redis.flushall()

        res.status(201).json({
          status: 201,
          error: false,
          result,
          message: 'Success add engineer'
        })
      })
      .catch(err => {
        res.status(400).json({
          status: 400,
          error: true,
          message: err
        })
      })
  },
  updateData: (req, res) => {
    const id = req.params.id
    const data = {
        user_id,
        name,
        description,
        skill,
        location,
        showcase,
        email,
        telephone,
        salary,
        avatar,
        date_updated: new Date()
    } = req.body

    const dateOfBirth = req.body.birthdate

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

    // if (req.fileValidationError) {
    //   res.status(400).json({
    //     status: '400',
    //     message: req.fileValidationError
    //   })
    // }

    const validEmail = /[a-zA-Z0-9_]+@[a-zA-Z]+\.(com|net|org)$/.test(email)

    if (!validEmail) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'Invalid Email e.g johndoe@gmail.com'
      })
    }
    if (!name) {
      return res.status(400).json({
        error: true,
        message: 'Name required'
      })
    }
    if (!description) {
      return res.status(400).json({
        error: true,
        message: 'Description required'
      })
    }
    if (!skill) {
      return res.status(400).json({
        error: true,
        message: 'Skill required'
      })
    }
    if (!location) {
      return res.status(400).json({
        error: true,
        message: 'Location required'
      })
    }
    if (!dateOfBirth) {
      return res.status(400).json({
        error: true,
        message: 'Date of birth required'
      })
    }
    if (!email) {
      return res.status(400).json({
        error: true,
        message: 'Email required'
      })
    }
    if (!telephone) {
      return res.status(400).json({
        error: true,
        message: 'Telephone required'
      })
    }
    if (!salary) {
      return res.status(400).json({
        error: true,
        message: 'Telephone required'
      })
    }

    const data = {
      user_id,
      name,
      description,
      skill,
      location,
      date_of_birth: dateOfBirth,
      showcase,
      email,
      telephone,
      salary,
      avatar,
      date_updated: new Date()
    }
    engineerModel
      .update(data, id)
      .then(result => {
        // redis.flushall()

        res.status(201).json({
          status: 201,
          error: false,
          result,
          message: 'Success update engineer'
        })
      })
      .catch(err => {
        err.status(400).json({
          status: 400,
          error: true,
          message: 'Error'
        })
      })
  },
  editData: (req, res) => {
    const id = req.params.id
    engineerModel
      .edit(id)
      .then(result => {
        res.status(200).json({
          status: 200,
          error: false,
          message: 'Success getting edit data',
          data: result
        })
      })
      .catch(error => {
        res.status(400).json({
          status: 200,
          message: `Error ${error}`,
          error: true
        })
      })
  },
  deleteData: (req, res) => {
    const id = req.params.id
    engineerModel
      .delete(id)
      .then(result => {
        // redis.flushall()

        res.status(200).json({
          status: 200,
          error: false,
          result,
          message: 'Success delete engineer'
        })
      })
      .catch(err => {
        res.status(400).json({
          status: 400,
          error: true,
          message: 'Failed delete engineer'
        })
      })
  }
}
