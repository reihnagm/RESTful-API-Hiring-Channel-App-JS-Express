const mysql = require('mysql');
const config = require('./configs');
let connection = mysql.createPool(config.database.mysql);
connection.getConnection((error, connection) => {
  if (error) {
    console.log('\n\t *** Cannot establish a connection with the database. ***');
  } else {
    console.log('\n\t *** New connection established with the database. ***');
  }
});
module.exports = connection;
