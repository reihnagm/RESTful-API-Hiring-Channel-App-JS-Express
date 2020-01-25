const express = require('express');
const Route = express.Router();
const Company = require('../controllers/company');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './public/images/company');
    },
    filename: (request, file, callback) => {
        callback(null, file.originalname);
    }
});
const upload = multer({
    storage
});
Route
    .get('/', Company.getAll)
    .get('/profile/:slug', Company.getDataBySlug)
    .post('/', upload.single('logo'), Company.store)
    .patch('/:id', upload.single('logo'), Company.update)
    .delete('/:id', Company.delete)
    .post('/profile', Company.getProfile)
module.exports = Route
