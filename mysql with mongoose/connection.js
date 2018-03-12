const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "company"
});

con.connect((err)=>{
    if(err) throw err;
    // let sql = "CREATE TABLE dept (dept_id INTEGER PRIMARY KEY AUTO_INCREMENT,dept_name VARCHAR(20),isdelete INTEGER DEFAULT 1)";
    // con.query(sql,(err,res)=>{
    //     if(err) throw err;
    //     console.log("table created");
    // })

    // let sql = "CREATE TABLE emp (emp_id INTEGER PRIMARY KEY AUTO_INCREMENT,emp_name VARCHAR(20),mobile VARCHAR(10),email VARCHAR(20),password VARCHAR(15),dept_id INTEGER,isdelete INTEGER DEFAULT 1, FOREIGN KEY (dept_id) REFERENCES dept(dept_id))"
    // con.query(sql,(err,res)=>{
    //     if(err) throw err;
    //     console.log("table created");
    // });
    //
    // let sql = "drop table emp"
    // con.query(sql,(err,res)=>{
    //     if(err) throw err;
    //     console.log("table drop");
    // });

});



module.exports={
    con
}
