const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts_controller');
const passport = require('../config/passport-local-strategy');

router.get('/posts',postsController.posts);
router.post('/create',passport.checkAuthentication,postsController.addPosts);

module.exports = router;