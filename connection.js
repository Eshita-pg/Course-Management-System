const mysql = require("mysql");
var conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "server_BE1513",
    database : "projectDB",
    multipleStatements : true
});

conn.connect((err) => {
    if(!err) {
        console.log("connected");
    }
    else {
        console.log("connection failed");
        console.log(err);
    }
});

module.exports = conn;