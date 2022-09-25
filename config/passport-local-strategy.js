/*
WHAT DOES SERIALIZE USER MEAN?
1. "express-session" creates a "req.session" object, when it is invoked via app.use(session({..}))
2. "passport" then adds an additional object "req.session.passport" to this "req.session".
3. All the serializeUser() function does is,
receives the "authenticated user" object from the "Strategy" framework, and attach the authenticated user to "req.session.passport.user.{..}"
In above case we receive {id: 123, name: "Kyle"} from the done() in the authUser function in the Strategy framework, 
so this will be attached as 
req.session.passport.user.{id: 123, name: "Kyle"}

3. So in effect during "serializeUser", the PassportJS library adds the authenticated user to end of the "req.session.passport" object.
This is what is meant by serialization.
This allows the authenticated user to be "attached" to a unique session. 
This is why PassportJS library is used, as it abstracts this away and directly maintains authenticated users for each session within the "req.session.passport.user.{..}"


WHAT DOES DE SERIALIZE USER MEAN?
1. Passport JS conveniently populates the "userObj" value in the deserializeUser() with the object attached at the end of "req.session.passport.user.{..}"
2. When the done (null, user) function is called in the deserializeUser(), Passport JS takes this last object attached to "req.session.passport.user.{..}", and attaches it to "req.user" i.e "req.user.{..}"
In our case, since after calling the done() in "serializeUser" we had req.session.passport.user.{id: 123, name: "Kyle"}, 
calling the done() in the "deserializeUser" will take that last object that was attached to req.session.passport.user.{..} and attach to req.user.{..} 
i.e. req.user.{id: 123, name: "Kyle"}
3. So "req.user" will contain the authenticated user object for that session, and you can use it in any of the routes in the Node JS app. 
eg. 
app.get("/dashboard", (req, res) => {
res.render("dashboard.ejs", {name: req.user.name})
})

*/




const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentication using passport 
passport.use(new LocalStrategy({
    //defining the username field of our application which is email here
    usernameField:'email',
    //passes request object to callback 
    passReqToCallback:true
},
    

    //whenever LocalStrategy is used 3 things email,password,done will be passed on
    function(req,email,password,done){
        //find a user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                req.flash('error',err);
                return done(err);
            }
            if(!user || user.password != password){
                req.flash('error','Invalid Username/Password');
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