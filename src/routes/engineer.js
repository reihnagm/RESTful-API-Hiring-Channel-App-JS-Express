const express = require('express')
const Route = express.Router()

const auth = require('../helpers/auth')

const config = require('../configs/configs')

const AWS = require('aws-sdk')
const multerS3 = require('multer-s3')
const multer = require('multer')

// const s3Config = new AWS.S3({
//     accessKeyId: config.AWS.accessKeyId,
//     secretAccessKey: config.AWS.secretAccessKey,
//     region: config.AWS.region,
//     Bucket: config.AWS.bucket
// })

// const multerS3Config = multerS3({
//     s3: s3Config,
//     bucket: config.AWS.bucket,
//     acl: 'public-read',
//     metadata: function (req, file, cb) {
//         cb(null, { fieldName: file.fieldname })
//     },
//     key: function (req, file, cb) {
//         cb(null, new Date().getTime() + '-' + file.originalname.replace(/\s/g, '-'))
//     }
// })

// const upload = multer({
//     storage: multerS3Config
// }).any()

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './src/images')
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage }).any()

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
