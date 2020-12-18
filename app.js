const express = require("express")
const bodyParser = require("body-parser")
const logger = require("morgan")
const config = require("./src/configs/configs")
const compression = require("compression")
const cors = require("cors")
const helmet = require("helmet")
const app = express()
const port = config.port
const routerNav = require("./src/index")

app.use(helmet())
app.use(compression())
app.use(express.static("public"))
app.use(logger("dev"))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use("/", routerNav)

app.listen(port, () => {
  console.log(`\n\t *** Server listening on PORT ${port}  ***`)
})

app.get("*", (request, response) => {
  response.sendStatus(404)
})

module.exports = app
