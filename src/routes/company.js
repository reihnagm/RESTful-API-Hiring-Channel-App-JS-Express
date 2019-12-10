const express = require('express')
const Route   = express.Router()

const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const uploadForCompany = multer({ storage })

const CompanyController = require('../controllers/CompanyController')

Route
    .get('/companies', CompanyController.getAllData)
    .post('/company', uploadForCompany.single('logo'), CompanyController.storeData)
    .patch('/company/:id', uploadForCompany.single('logo'), CompanyController.updateData)
    .delete('/company/:id/delete', CompanyController.deleteData)

module.exports = Route