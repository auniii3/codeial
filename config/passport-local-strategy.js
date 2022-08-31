const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentication using passport 
passport.use(new LocalStrategy({
    //defining the username field of our application which is email here
    usernameField:'email'
},
    

    //whenever LocalStrategy is used 3 things email,password,done will be passed on
    function(email,password,done){
        //find a user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error  in finding user --> Passport');
                return done(err);
            }
            if(!user || user.password != password){
                console.log("Invalid Username/Password");
                return done(null,false); //error as null but authentication is false
            }
            
            //this returns user to serializeUser function
            return done(null,user);
        });
    }
)
);

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id)
}
    
);

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null,user);
    });
}
);

//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in, then pass on the request to the next function(controller's action)(isAuthenticated is put by passport
    //in request object)
    if(req.isAuthenticated()){
        return next();
    }

    //if user is not authenticated
    return res.redirect('/users/sign-in');

}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the
        //views
        res.locals.localuser = req.user;
    }
    next();
}


module.exports = passport;