const express = require('express')
const Route = express.Router()

const auth = require('../helpers/auth')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/logo')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage })

const Company = require('../controllers/company')

Route
  .get('/', Company.getAllData)
  .post('/', upload.single('logo'), Company.storeData)
  .patch('/:id', upload.single('logo'), Company.updateData)
  .delete('/:id', Company.deleteData)

module.exports = Route
