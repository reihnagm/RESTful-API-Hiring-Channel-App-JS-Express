const   express = require('express'),
        Route = express.Router(),
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

const Company = require('../controllers/company')
Route
    .get('/', Company.getAllData)
    .post('/', upload.single('logo'), Company.storeData)
    .get('/:id', Company.editData)
    .patch('/:id', upload.single('logo'), Company.updateData)
    .delete('/:id', Company.deleteData)

module.exports = Route
