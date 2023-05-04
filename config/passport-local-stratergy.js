const passport=require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User=require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email,password,done){
        // find a user and establish the identity
        User.findOne({email:email})
           .then(user=>{
            if(!user || user.password !=password){
                console.log('invalid user name and the password');
                return done(null, false);
            }
            return done(null, user);
        })
        .catch(err=>{
                console.log('error in finding user --> passport');
                return done(err);
        });
    }
    
));


// serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// deserializing the user from the key in the cookies..
passport.deserializeUser(function(id,done){
    User.findById(id)
    .then(function(user){
        done(null,user);
    })
    .catch(function(err){
        done(err);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the cookie and we are just sending this to the locals 
        // for the views
        res.locals.user =req.user;
    }
    next();
}
    
module.exports=passport;