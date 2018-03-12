const express = require('express');
const bodyParser = require('body-parser');

//step 1
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {googleAuth} = require('./server/db/auth');


const {mongoose} = require('./server/db/mongoose-connect');
const {GoogleData} = require('./server/model/gmail');

var app = express();

//step2
app.use(passport.initialize());

// step 3 setting header
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(`Access-Control-Allow-Methods`, `POST`);
    res.header(`Access-Control-Expose-Headers`, `x-auth`);
    next();
});


// step 4
passport.serializeUser((user,done)=>{
    console.log('serialize');
    done(null,user);
});
passport.deserializeUser((user,done)=>{
    console.log('deserialize');
    done(null,user);
});

// step 5
passport.use("google",new GoogleStrategy({
        clientID: googleAuth.client_id,
        clientSecret: googleAuth.client_secret,
        callbackURL: googleAuth.callbackURL
    },
    // google will send back the token and profile
    (accessToken, refreshToken, profile, done)=> {
        // asynchronous // Event Loop
        console.log(profile);


        //find the user in the database based on their facebook id

        GoogleData.findOne({ 'id' : profile.id }, (err, user)=> {
            if (err) return done(err);

            // if the user is found, then log them in
            if (user) {
                return done(null, user); // user found, return that user
            } else {

                var id1=profile.id;
                var name1=profile.displayName;
                var email1=profile.emails[0].value;
                console.log(id1+"\t"+name1+"\t"+email1);
                var e=new GoogleData({id:id1,name:name1,email:email1});
                e.save().then((doc)=>{
                        console.log(doc);
                });
            }

        });


    }));


// google ROUTES
app.get('/auth/google', passport.authenticate('google',
    { scope: ['profile','email'] }
    )
);
app.get('/auth/google/callback',passport.authenticate('google', {
        successRedirect:'/success',
        failureRedirect:'/fail'
    }
));

app.get('/success',(req,res)=>{
    res.send("Successfully login");
});

app.get('/fail',(req,res)=>{
    res.send("Fail to save data");
})


app.get('/',(req,res)=>{
    res.sendFile('E:/priti/Node_Example/password-google-api/server/view/index.html');
})

app.listen(3002,()=>{
    console.log(3002)
})
