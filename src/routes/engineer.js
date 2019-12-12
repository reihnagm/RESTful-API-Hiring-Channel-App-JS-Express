const express = require('express')
const Route = express.Router()

const auth = require('../helpers/auth')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

// Max 5 MB

const uploadForEngineer = multer({ storage, fieldsize: 5000000 })

const EngineerController = require('../controllers/EngineerController')

Route
  .get('/engineers', auth.check, EngineerController.getAllData)
  .post('/engineer', auth.check, uploadForEngineer.single('showcase'), EngineerController.storeData)
  .patch('/engineer/:id', auth.check, uploadForEngineer.single('showcase'), EngineerController.updateData)
  .delete('/engineer/:id', auth.check, EngineerController.deleteData)

Route
  .get('/engineers/date_update=:sort', auth.check, EngineerController.dateUpdateDataSort)
  .get('/engineers/name=:sort', auth.check, EngineerController.nameDataSort)
  .get('/engineers/skill=:sort', auth.check, EngineerController.skillDataSort)

module.exports = Route
