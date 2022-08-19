const express = require('express');
const router = express.Router() ;

const usersController = require('../controllers/users_controller')

router.get('/profile',usersController.profile);
router.get('/edit',usersController.edit);

module.exports = router;