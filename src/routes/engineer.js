const express = require('express')
const Route = express.Router()
const Engineer = require('../controllers/engineer')


const objDate = new Date()
const year = objDate.getFullYear()
const month = objDate.getMonth() - 1
const day = objDate.getDate()

const date =`${year}-${month}-${day}`

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './public/images/engineer')
    },
    filename: (request, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({
    storage
})

Route.get('/', Engineer.getAllData)
    .post('/', upload.single('avatar'), Engineer.storeData)
    .get('/:id', Engineer.editData)
    .get('/user/:id', Engineer.profileEngineerData)
    .patch('/:id', upload.single('avatar'), Engineer.updateData)
    .delete('/:id', Engineer.deleteData)

module.exports = Route
