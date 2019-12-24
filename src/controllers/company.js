const Company = require('../models/Company')
// const redis = require('../configs/redis')

module.exports = {
    getAllData: async (request, response) => {

        try {
            const result = await Company.all()
            response.json(result)
        } catch (error) {
            console.error(error)
            response.status(500).json('Server error')
        }

    // companyModel.all().then(result => {
      // redis.get('Company:getAllData', (errorRedis, resultRedis) => {
        // if (resultRedis) {
        //   res.status(200).json({
        //     status: 200,
        //     error: false,
        //     source: 'cache',
        //     result,
        //     message: 'Success getting all data use redis'
        //   })
        // } else {
        //   redis.setex('Company:getAllData', 3600, JSON.stringify(result))

          // res.status(200).json({
          //   status: 200,
          //   error: false,
          //   source: 'api',
          //   result,
          //   message: 'Success getting all data'
          // })
      //   }
      // })
    // }).catch(err => {
    //   res.status(400).json({
    //     status: 400,
    //     error: true,
    //     message: err
    //   })
    // })
  },
  storeData: (req, res) => {
    const { name, location, description, email, telephone } = req.body
    const logo = req.file.originalname

    const data = {
      name,
      logo,
      location,
      description,
      email,
      telephone
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
    const { name, location, description, email, telephone } = req.body
    const id = req.params.id
    const logo = req.file.originalname
    const data = {
      id,
      name,
      logo,
      location,
      description,
      email,
      telephone
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
      res.status(400).json({
        status: 400,
        error: true,
        message: err
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
      res.status(400).json({
        status: 400,
        error: true,
        message: err
      })
    })
  }
}
