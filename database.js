const res = require('express/lib/response');
const mysql = require('mysql');

const config = {
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    port: 3306,
    schema: process.env.DATABASE_NAME
};
const con = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.schema});  

function Connect()
{
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
}

function Select()
{
    con.connect(function(err) {
        con.query("SELECT * FROM users", function(err, result, fields)
        {
            if(err) throw err;
            console.log(result)
        });
    });
}

module.exports = {
    Connect,
    Select
}
