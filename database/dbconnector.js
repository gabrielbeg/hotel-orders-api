const mysql = require('mysql');
require('dotenv').config()

const config = {
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    port: 3306,
    schema: process.env.DATABASE_NAME
};

const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.schema,
    connectionLimit: 10
    });

pool.getConnection((err,connection)=> {
    if(err)
    throw err;
    console.log('Database connected.');
    connection.release();
  });


  module.exports = pool;