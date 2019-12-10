const express = require('express')
const Route = express.Router()

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const uploadForEngineer = multer({ storage })

const EngineerController = require('../controllers/EngineerController')

Route
    .get('/engineers', token, EngineerController.getAllData)
    .post('/engineer', uploadForEngineer.single('showcase'), EngineerController.storeData)
    .patch('/engineer/:id', uploadForEngineer.single('showcase'), EngineerController.updateData)
    .delete('/engineer/:id', EngineerController.deleteData)

Route
    .get('/engineers/date_update=:sort', EngineerController.dateUpdateDataSort)
    .get('/engineers/name=:sort', EngineerController.nameDataSort)
    .get('/engineers/skill=:sort', EngineerController.skillDataSort)


function token(req, res, next) {
    
    const authorization = req.headers["authorization"]

    if(typeof authorization !== 'undefined')
    {
        const bearer = authorization.split(" ") 
        const token = bearer[1]
        
        req.token = token

        next()
    }
    else 
    {
        res.sendStatus(403)
    }

}
    
module.exports = Route