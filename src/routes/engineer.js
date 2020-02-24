const express = require('express');
const Route = express.Router();
const Engineer = require('../controllers/engineer');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './public/images/engineer');
    },
    filename: (request, file, callback) => {
        callback(null, file.originalname);
    }
});
const upload = multer({
    storage
});
Route
    .get('/', Engineer.getAll)
    .get('/profile/:slug', Engineer.getProfileBySlug)
    .get('/skills', Engineer.getSkills)
    .post('/', upload.single('avatar'), Engineer.store)
    .patch('/:id', upload.single('avatar'), Engineer.update)
    .delete('/:engineer_id/:user_id', Engineer.delete)
    .post('/profile', Engineer.getProfile);
module.exports = Route;
