// get the client
const mysql = require('mysql2');
const config = require("../config");

// create the connection to database
const connection = mysql.createConnection(config.db);

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('\x1b[36m%s\x1b[0m','connection sucessfull as id ' + connection.threadId);
  });

module.exports = connection;