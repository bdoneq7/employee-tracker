const mysql = require('mysql2');

// Connect to SQL Database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySql Username
        user: 'root',
        // Your MySql Password
        password: '.C3MsZ%56eX8x*Sp',
        database: 'employee'
    },
    console.log('Connected to the employee database.')
);

module.exports = db;