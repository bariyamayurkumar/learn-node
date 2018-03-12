const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

con.connect((err) => {
    if(err) throw err;
    console.log("connection establish");
    con.query("create database company",(err,res)=>{
        if(err) throw err;
        console.log("Database created");
    });
});




