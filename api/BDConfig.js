var mysql = require('mysql');
require('dotenv/config');

module.exports = {
    connection: mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASS,
        database: process.env.DATABASE
    })
}