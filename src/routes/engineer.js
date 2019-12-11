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
  .post('/engineer', uploadForEngineer.single('showcase'), EngineerController.storeData)
  .patch('/engineer/:id', uploadForEngineer.single('showcase'), EngineerController.updateData)
  .delete('/engineer/:id', EngineerController.deleteData)

Route
  .get('/engineers/date_update=:sort', EngineerController.dateUpdateDataSort)
  .get('/engineers/name=:sort', EngineerController.nameDataSort)
  .get('/engineers/skill=:sort', EngineerController.skillDataSort)

module.exports = Route
