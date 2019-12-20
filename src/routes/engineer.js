const   express = require('express'),
        Route = express.Router(),
        auth = require('../helpers/auth'),
        { check, validationResult } = require('express-validator'),
        config = require('../configs/configs'),
        AWS = require('aws-sdk'),
        multerS3 = require('multer-s3'),
        multer = require('multer')


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
    destination: (request, file, callback) => {
        callback(null, './src/images')
    },
    filename: (request, file, callback) => {
        callback(null, file.fieldname)
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 5242880 } // 5 MB

    // fileFilter: (request, file, callback) => {
        // checkFileType(request, file, callback)
        // checkFileSize(request, file, callback)
    // }
}).any()


// const checkFileType = (request, file, callback) => {
    // if (file.mimetype) {
    //     request.fileValidationError = 'goes wrong on the mimetype'
    //     return callback(null, false)
    // }
// }

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
    .post('/',[
        check('name', 'Name is required').trim().not().isEmpty(),
        check('description', 'Description is required').trim().not().isEmpty(),
        check('skill', 'Skill is required').trim().not().isEmpty(),
        check('location', 'Location is required').trim().not().isEmpty(),
        check('email', 'Please include valid email').trim().isEmail().normalizeEmail(),
        check('telephone', 'Telephone is required').trim().not().isEmpty(),
        check('salary', 'Salary is required').trim().not().isEmpty()
    ], upload, Engineer.storeData)
  .get('/:id', Engineer.editData)
  .patch('/:id',  Engineer.updateData)
  .delete('/:id',  Engineer.deleteData)



module.exports = Route
