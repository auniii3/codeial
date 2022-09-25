/*
    Passport JS conveniently provides a “req.isAuthenticated()” function, that

    returns “true” in case an authenticated user is present in “req.session.passport.user”, or
    returns “false” in case no authenticated user is present in “req.session.passport.user”.
*/


const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts_controller');
const passport = require('passport');

router.get('/posts',postsController.posts);
router.post('/create',passport.checkAuthentication,postsController.addPosts);
router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy);

module.exports = router;