const mysql = require('mysql')
const config = require('./config')
const conn = mysql.createConnection(config.database.mysql)

conn.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('\n\t *** New connection established with the database. ***')
});

module.exports = conn
