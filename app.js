const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const config = require('./src/configs/configs')
const cors = require('cors')

const formData = require('express-form-data')
const cloudinary = require('cloudinary')

const app = express()
const port = config.port
const routerNav = require('./src/index')

// NOTE: Allow all CORS Origin
app.use(cors())

// NOTE: Third Party Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

// NOTE: Module to parse multipart/form data
app.use(formData.parse())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// NOTE: Log Request HTTP Activity in Terminal
app.use(logger('dev'))

app.use('/', routerNav)

app.listen(port, () => {
    console.log(`Server listening on PORT ${port}`)
})

app.get('*', (request, response) => {
    response.sendStatus(404)
})

module.exports = app
