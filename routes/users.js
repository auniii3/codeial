const express = require('express');
const router = express.Router() ;
const passport = require('passport');

const usersController = require('../controllers/users_controller')

//if the authentication is checked then only it will go to profile page
router.get('/profile',passport.checkAuthentication,usersController.profile);
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

module.exports = router;