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
    .post('/', upload.single('avatar'), Engineer.storeData)
    .get('/:id', Engineer.editData)
    .get('/user/:id', Engineer.profileEngineerData)
    .patch('/:id', upload.single('avatar'), Engineer.updateData)
    .delete('/:id', Engineer.deleteData)


module.exports = Route
