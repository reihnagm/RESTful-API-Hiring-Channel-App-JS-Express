const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const config = require('./src/configs/configs')
const cors = require('cors')

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

// NOTE: Log Request HTTP Activity in Terminal
app.use(logger('dev'))

// NOTE: Parsing form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// NOTE: Parsing application/json
app.use(bodyParser.json())

app.use('/', routerNav)

app.listen(port, () => {
    console.log(`Server listening on PORT ${port}`)
})

app.get('*', (request, response) => {
    response.sendStatus(404)
})

module.exports = app
