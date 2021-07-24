const express = require("express")
const logger = require("morgan")
const config = require("./src/configs/config")
const compression = require("compression")
const cors = require("cors")
const helmet = require("helmet")
const app = express()
const port = config.port
const routerNav = require("./src/index")

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.static("public"))
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", routerNav)

app.listen(port, () => {
  console.log(`\n\t *** Server listening on PORT ${port}  ***`)
})

app.get("*", (request, response) => {
  response.sendStatus(404)
})

module.exports = app
