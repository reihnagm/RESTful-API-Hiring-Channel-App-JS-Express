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
    storage
})
Route
    .get('/', Company.getAll)
    .post('/', upload.single('logo'), Company.store)
    .get('/:id', Company.edit)
    .patch('/:id', upload.single('logo'), Company.update)
    .delete('/:id', Company.delete)
module.exports = Route
