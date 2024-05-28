// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '34.101.153.157',
  user: 'difa',
  password: '123',
  database: 'difanotesDB'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID', connection.threadId);
});

module.exports = connection;
