const express = require('express');

const router = express.Router();
const postsAPi = require("../../../controllers/api/v1/posts_api");

const passport = require('passport');

router.get('/',postsAPi.index);

//session: false will not generate the session cookie
router.delete('/:id',passport.authenticate('jwt',{session:false}),postsAPi.destroy);

module.exports = router;