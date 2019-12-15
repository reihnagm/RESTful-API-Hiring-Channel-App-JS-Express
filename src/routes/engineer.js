const express = require('express')
const Route = express.Router()

const auth = require('../helpers/auth')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './src/images/showcase')
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 5242880 },
  fileFilter: (req, file, cb) => {
    checkFileType(req, file, cb)
  }
}).single('showcase')

function checkFileType (req, file, cb) {

  if (file.mimetype !== 'image/png') {
    req.fileValidationError = 'goes wrong on the mimetype';
    return cb(null, false);
   }

}

const Engineer = require('../controllers/engineer')

Route
  .get('/', auth.check, Engineer.getAllData)
  .post('/', auth.check, upload, Engineer.storeData)
  .patch('/:id', auth.check, upload, Engineer.updateData)
  .delete('/:id', auth.check, Engineer.deleteData)

module.exports = Route
