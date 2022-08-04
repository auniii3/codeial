/* Creating Express Router */


//the same instance of express is used here which we created in main index.js file
const express = require('express')
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);

module.exports = router;