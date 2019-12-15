const express = require('express')
const Route = express.Router()

const auth = require('../helpers/auth')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/images/logo')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage })

const Company = require('../controllers/company')

Route
  .get('/', auth.check, Company.getAllData)
  .post('/', auth.check, upload.single('logo'), Company.storeData)
  .patch('/:id', auth.check, upload.single('logo'), Company.updateData)
  .delete('/:id', auth.check, Company.deleteData)

module.exports = Route
