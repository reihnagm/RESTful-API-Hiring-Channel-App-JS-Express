const mysql = require('mysql');
const config = require('./configs');
let connection = mysql.createPool(config.database.mysql);
connection.getConnection((err, connection) => {
    if (err) {
        console.log('\n\t *** Cannot establish a connection with the database. ***');
        throw err;
    } else {
        console.log('\n\t *** New connection established with the database. ***');
    }
});
  
module.exports = connection;
