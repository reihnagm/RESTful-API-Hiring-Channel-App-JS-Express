const   express = require('express'),
        Route = express.Router(),
        { check } = require('express-validator')

const auth = require('../helpers/auth')

const Company = require('../controllers/company')
Route
    .get('/', Company.getAllData)
    .post('/',  [
        check('name', 'Name is required').trim().not().isEmpty(),
        check('logo', 'Logo is required').trim().not().isEmpty(),
        check('location', 'Location is required').trim().not().isEmpty(),
        check('description', 'Description is required').trim().not().isEmpty(),
        check('email', 'Please include valid email').trim().isEmail().normalizeEmail(),
        check('telephone', 'Telephone is required').trim().not().isEmpty()
    ], Company.storeData)
    .get('/:id', Company.editData)
    .patch('/:id', [
        check('name', 'Name is required').trim().not().isEmpty(),
        check('logo', 'Logo is required').trim().not().isEmpty(),
        check('location', 'Location is required').trim().not().isEmpty(),
        check('description', 'Description is required').trim().not().isEmpty(),
        check('email', 'Please include valid email').trim().isEmail().normalizeEmail(),
        check('telephone', 'Telephone is required').trim().not().isEmpty()
    ], Company.updateData)
    .delete('/:id', Company.deleteData)

module.exports = Route
