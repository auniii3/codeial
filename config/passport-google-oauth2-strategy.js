const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

//tell passport to use new strategy for google login
passport.use(new googleStrategy({
        clientID:"1090316576516-e43uvujos7nq680ldskl17oesps52e1c.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:8000/users/auth/google/callback"
    },

    function(accessToken,refreshToken,profile,done){
        //find a user in local db
        User.findOne({email:profile.emails[0].value})
        .exec(function(err,user){
            if(err){
                console.log('Error in google strategy passport',err); return;
            }
            console.log(profile);

            //if user found set this user as req.user
            if(user){
                return done(null,user);
            }else{
                //if not found create the user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.email,
                    password: crypto.randomBytes(20).toString('hex')
                },
                    function(err,user){
                        if(err){
                            console.log('Error in google strategy passport',err); return;}
                        return done(null,user);
                    }
                )
            }
        });
    }

));

module.exports = passport;
