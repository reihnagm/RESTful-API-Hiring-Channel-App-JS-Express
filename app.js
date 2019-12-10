const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('./src/configs/configs')

const app = express();
const port = config.port
const routerNav = require('./src/index');

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use('/', routerNav);

app.get('*', (req, res) => {
    res.sendStatus(404);
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

module.exports = app
