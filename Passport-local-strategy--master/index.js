var express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./server/db/mongoose-connect')
const {User} = require('./server/model/user')
//step1 import
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//step2 initialize
app.use(passport.initialize())

//step3 serialize deserialize
passport.serializeUser((user,done)=>{
    console.log('Serialize user')
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    console.log('Deserialize user')
    done(null,user)
})

//step4 configuration

passport.use(new LocalStrategy((username,password,done)=>{
    User.findOne({username,password}).then(
        (user)=>{
            console.log(user);
            if(!user){
                console.log("In error")
                done(null,false)
            }
            done(null,user);
        })
}));




app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/server/form.html');
   // res.send("sds");
});

app.get('/login',(req,res)=>{
    res.sendFile(__dirname+ '/server/login.html')
});



//route
app.post('/check',passport.authenticate('local',{
    successRedirect: '/success',
    failureRedirect: '/fail'
}));


app.get('/success',(req,res)=>{
    res.send("Login Success");
})

app.get('/fail',(req,res)=>{
    res.send("Incorrect username or password");
});




app.post('/add',(req,res)=>{
    var newUser = new User({
        name: req.body.name,
        password: req.body.password,
        age: req.body.age,
        username: req.body.username,
        mobile: req.body.mobile
    });
    newUser.save().then(
        (doc)=>{
            res.send("Insert");
        }
    ).catch((e)=>{
        res.status(404).send(e);
    })
    //res.send("hey");
});





app.listen(3002,()=>{
    console.log("port 3002");
});