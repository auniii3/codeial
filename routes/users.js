const express = require('express');
const router = express.Router() ;
const passport = require('passport');

const usersController = require('../controllers/users_controller')

//if the authentication is checked then only it will go to profile page
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',usersController.updateUser);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

//we are using post as form method is post so it is looking for post method
router.post('/create',usersController.create);
//router.post('/create-session',usersController.createSession);

//using passport middleware in between
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),usersController.createSession);
router.get('/sign-out',usersController.destroySession);

//scope is the information we are looking to fetch and this url is used to send to google
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
//this is the callback url which will authenticate in goole-oauth-strategy
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'},usersController.createSession));

module.exports = router;