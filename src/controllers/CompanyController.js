const companyModel = require('../models/Company')
const conn = require('../configs/db')
const redis = require('../configs/redis')
const uuidv4 = require('uuid/v4')

module.exports = {
  getAllData: (req, res) => {
    companyModel.all().then(result => {
      redis.get('Company:getAllData', (error_redis, result_redis) => {
        if (result_redis) {
          res.status(200).json({
            status: 200,
            error: false,
            source: 'cache',
            result,
            message: 'Success getting all data use redis'
          })
        } else {
          redis.setex('Company:getAllData', 3600, JSON.stringify(result))

          res.status(200).json({
            status: 200,
            error: false,
            source: 'api',
            result,
            message: 'Success getting all data'
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
  storeData: (req, res) => {
    const { name, location, description } = req.body
    const logo = req.file.originalname
    const data = {
      name,
      logo,
      location,
      description
    }
    companyModel.store(data).then(result => {
      redis.flushall()

      res.status(201).json({
        status: 201,
        error: false,
        result,
        message: 'Success add company'
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
    const { name, location, body, description } = req.body
    const id = req.params.id
    const logo = req.file.originalname
    const data = {
      id,
      name,
      logo,
      location,
      description
    }
    companyModel.update(data, id).then(result => {
      redis.flushall()

      res.status(201).json({
        status: 201,
        error: false,
        result,
        message: 'Success update company'
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
    companyModel.delete(id).then(result => {
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
