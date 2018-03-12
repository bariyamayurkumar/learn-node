const mysql = require('mysql');
const {con} = require('./connection');

con.connect((err)=>{
    if(err) throw err;
    let sql = "CREATE TABLE emp (emp_id INTEGER PRIMARY KEY AUTO_INCREMENT,emp_name VARCHAR(20),mobile VARCHAR(10),email VARCHAR(20),password VARCHAR(15),dept_id INTEGER, FOREIGN KEY (dept_id) REFERENCES dept(dept_id))"
    con.query(sql,(err,res)=>{
        if(err) throw err;
        console.log("table created");
    })
});



