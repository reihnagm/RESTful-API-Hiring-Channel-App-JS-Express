const   express = require('express'),
        Route = express.Router(),
        auth = require('../helpers/auth'),
        { check } = require('express-validator'),
        config = require('../configs/configs'),
        multer = require('multer')

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './src/images')
    },
    filename: (request, file, callback) => {
        callback(null, file.originalname)
    }
})
const upload = multer({
    storage,
    limits: { fileSize: 5242880 }
})

const Engineer = require('../controllers/engineer')

Route.get('/', Engineer.getAllData)
    .post('/', [
        check('description', 'Description is required').trim().not().isEmpty(),
        check('skill', 'Skill is required').trim().not().isEmpty(),
        check('location', 'Location is required').trim().not().isEmpty(),
        check('telephone', 'Telephone is required').trim().not().isEmpty(),
        check('salary', 'Salary is required').trim().not().isEmpty()
    ], Engineer.storeData)
    .get('/:id', Engineer.editData)
    .get('/user/:id', Engineer.profileEngineerData)
    .patch('/:id', [
        check('description', 'Description is required').trim().not().isEmpty(),
        check('skill', 'Skill is required').trim().not().isEmpty(),
        check('location', 'Location is required').trim().not().isEmpty(),
        check('telephone', 'Telephone is required').trim().not().isEmpty(),
        check('salary', 'Salary is required').trim().not().isEmpty()
    ], Engineer.updateData)
    .delete('/:id', Engineer.deleteData)


module.exports = Route
