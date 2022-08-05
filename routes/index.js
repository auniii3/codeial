/* Creating Express Router */


//the same instance of express is used here which we created in main index.js file
const express = require('express')
const router = express.Router();
const homeController = require('../controllers/home_controller');


router.get('/',homeController.home);


//any url having pattern /users/anything it will go to users route file
router.use('/about',homeController.about);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));

//for any further routes define here
//router.use('/routerName',require('./routerfile'));

module.exports = router;