const express = require('express')
const Route = express.Router()

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

// Max 5 MB

const uploadForCompany = multer({ storage, fieldsize: 5000000 })

const CompanyController = require('../controllers/CompanyController')

Route
  .get('/companies', CompanyController.getAllData)
  .post('/company', uploadForCompany.single('logo'), CompanyController.storeData)
  .patch('/company/:id', uploadForCompany.single('logo'), CompanyController.updateData)
  .delete('/company/:id', CompanyController.deleteData)

module.exports = Route
