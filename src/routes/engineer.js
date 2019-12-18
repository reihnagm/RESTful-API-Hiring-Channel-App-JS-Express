const express = require('express')
const Route = express.Router()

const auth = require('../helpers/auth')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './src/images')
  },
  filename: function(req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({
  storage
  // limits: { fileSize: 5242880 }
  // fileFilter: (req, file, cb) => {
  //   checkFileType(req, file, cb)
  // }
}).any()

// const showcase = multer({
//   storage,
//   limits: { fileSize: 5242880 },
//   fileFilter: (req, file, cb) => {
//     checkFileType(req, file, cb)
//   }
// }).single('showcase')

// const avatar = multer({
//   storage,
//   limits: { fileSize: 5242880 },
//   fileFilter: (req, file, cb) => {
//     checkFileType(req, file, cb)
//   }
// }).single('avatar')

// function checkFileType (req, file, cb) {
//   if (file.mimetype !== 'image/png') {
//     req.fileValidationError = 'goes wrong on the mimetype'
//     return cb(null, false)
//   }
// }

const Engineer = require('../controllers/engineer')

Route.get('/', Engineer.getAllData)
  .post('/', auth.check, upload, Engineer.storeData)
  .get('/:id', Engineer.editData)
  .patch('/:id', upload, Engineer.updateData)
  .delete('/:id', Engineer.deleteData)

module.exports = Route
