// const engineerModel = require('../models/engineer')
const conn = require('../configs/db')
const redis = require('../configs/redis')
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

    engineerModel.all(offset, limit, sort, sortBy, search)
      .then(result => {
        redis.get(`Engineer:getAllData${page}`, (errRedis, resultRedis) => {
          if (errRedis) {
            res.status(400).json({
              error: true,
              message: errRedis
            })
          }

          // let pageDetail = {
          //   total_data: totalDataEngineer,
          //   per_page: limit,
          //   current_page: page,
          //   nextLink: `http://localhost:3000${req.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
          //   prevLink: `http://localhost:3000${req.originalUrl.replace('page=' + page, 'page=' + prevPage)}`,
          // }

          if (resultRedis) {
            res.status(200).json({
              status: 200,
              error: false,
              source: 'cache',
              data: JSON.parse(resultRedis),
              total_data: totalDataEngineer,
              per_page: limit,
              current_page: page,
              nextLink: `http://localhost:3000${req.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
              prevLink: `http://localhost:3000${req.originalUrl.replace('page=' + page, 'page=' + prevPage)}`,
              message: 'Success getting all data use redis'
            })
          } else {
            // Set Cache Expiration to 1 Hour (60 minutes)

            redis.setex(`Engineer:getAllData${page}`, 3600, JSON.stringify(result))

            res.status(200).json({
              status: 200,
              error: false,
              source: 'api',
              data: result,
              total_data: totalDataEngineer,
              per_page: limit,
              current_page: page,
              nextLink: `http://localhost:3000${req.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
              prevLink: `http://localhost:3000${req.originalUrl.replace('page=' + page, 'page=' + prevPage)}`,
              message: 'Success getting all data'
            })
          }
        })
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
    const { name, description, skill, location, email, telephone } = req.body
    const dateOfBirth = req.body.birthdate

    if(req.fileValidationError) {
      res.status(400).json({
        status: '400',
        message: req.fileValidationError
      })
    }

    const validEmail = /[a-zA-Z0-9_]+@[a-zA-Z]+\.(com|net|org)$/.test(email)

    if (!validEmail) {
      res.status(400).json({
        status: 400,
        error: true,
        message: 'Invalid Email e.g johndoe@gmail.com'
      })
    }

    if (!name) {
      res.status(400).json({
        error: true,
        message: 'Name required'
      })
    }
    if (!description) {
      res.status(400).json({
        error: true,
        message: 'Description required'
      })
    }
    if (!skill) {
      res.status(400).json({
        error: true,
        message: 'Skill required'
      })
    }
    if (!location) {
      res.status(400).json({
        error: true,
        message: 'Location required'
      })
    }
    if (!dateOfBirth) {
      res.status(400).json({
        error: true,
        message: 'Date of birth required'
      })
    }
    if (!email) {
      res.status(400).json({
        error: true,
        message: 'Email required'
      })
    }
    if (!telephone) {
      res.status(400).json({
        error: true,
        message: 'Telephone required'
      })
    }

    const data = {
      name,
      description,
      skill,
      location,
      date_of_birth: dateOfBirth,
      email,
      telephone,
      date_created: new Date(),
      date_updated: new Date()
    }

    engineerModel.store(data).then(result => {
      redis.flushall()

      res.status(201).json({
        status: 201,
        error: false,
        result,
        message: 'Success add engineer'
      })
    }).catch(err => {
      res.status(400).json({
        status: 400,
        error: true,
        message: err
      })
    })
  },
  updateData: (req, res) => {
    const id = req.params.id
    const { name, description, skill, location, email, telephone } = req.body
    const showcase = req.file.originalname
    const dateOfBirth = req.body.birthdate

    const data = {
      name,
      description,
      skill,
      location,
      date_of_birth: dateOfBirth,
      showcase,
      email,
      telephone,
      date_updated: new Date()
    }
    engineerModel.update(data, id).then(result => {
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
    const id = req.params.id
    engineerModel.delete(id).then(result => {
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
  }
}
