const express = require('express');
const mysql  = require('mysql');
const bodyParser = require('body-parser');
const {con} = require('./connection');

app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/dept',(req,res)=>{
    var sql = "insert into dept (dept_name) values(?)";
    con.query(sql,[req.body.dname],(err)=>{
        if(err) throw err;
        res.send("one row inserted");
    });
});

app.get('/dept',(req,res)=>{
    var sql = "select * from dept where isdelete = ?";
    con.query(sql,[1],(err,data)=>{
        if(err) throw err;
        res.send(data);
    });
});

app.delete('/dept',(req,res)=>{
   var sql = "update dept set isdelete = ? where dept_id=?";
   con.query(sql,[1,req.query.id],(err,data)=>{
       if(err) throw err;
       //res.send('ss');
       res.redirect('/updateemp?id="'+req.body.id+'"');
   });

});

app.get('/updateemp',(req,res)=>{
    console.log(req.query.id);
    console.log(typeof req.query.id);

    var sql= "update emp set isdelete = 0 where dept_id ="+req.query.id;
    //console.log(sql);
     con.query(sql,(err,data)=>{
         if(err) throw err;
         res.send("data deleted");
     });
});

app.post('/emp',(req,res)=>{
   var sql = "insert into emp (emp_name,email,password,mobile,dept_id) values(?,?,?,?,?)";
   con.query(sql,[req.body.name,req.body.email,req.body.password,req.body.mobile,req.body.did],(err)=>{
       if(err) throw err;
       res.send("one row inserted");
   });
});

app.get('/emp',(req,res)=>{
    var sql = "select * from emp where isdelete = ?";
    con.query(sql,[1],(err,data)=>{
        if(err) throw err;
        res.send(data);
    });
});

app.delete('/emp',(req,res)=>{
   var sql = "update emp set isdelete = ? where emp_id = ?";
   con.query(sql,[0,req.body.id],(err)=>{
       if(err) throw err;
       res.send("one row deleted");
   });
});

app.get('/dept_emp',(req,res)=>{
    var sql = "select d.dept_name,e.emp_name,e.email from dept d,emp e where e.dept_id=d.dept_id and e.isdelete = d.isdelete";
    con.query(sql,(err,data)=>{
        if(err) throw err;
        res.send(data);
    });
});


app.listen(3004,()=>{
    console.log("port: 3004");
});



