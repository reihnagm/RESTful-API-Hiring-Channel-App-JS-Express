const express = require('express')
const Route = express.Router()

const auth = require('../helpers/auth')



const Company = require('../controllers/company')
Route
    .get('/', Company.getAllData)
    .post('/', Company.storeData)
    .get('/:id', Company.editData)
    .patch('/:id', Company.updateData)
    .delete('/:id', Company.deleteData)

module.exports = Route
