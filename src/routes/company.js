const express = require('express')
const multer = require('multer')
const Route = express.Router()
const Company = require('../controllers/company')

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './public/images/company')
    },
    filename: (request, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 5242880 }
})

Route
    .get('/', Company.getAllData)
    .post('/', upload.single('logo'), Company.storeData)
    .get('/:id', Company.editData)
    .patch('/:id', upload.single('logo'), Company.updateData)
    .delete('/:id', Company.deleteData)

module.exports = Route
