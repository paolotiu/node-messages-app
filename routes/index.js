var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home', { title: 'Express' });
});

// Get login form
router.get('/login', userController.login_get);

//Get sign-up form
router.get('/sign-up', userController.sign_up_get);

//POST sign-up form / Save user
router.post('/sign-up', userController.sign_up_post);

module.exports = router;
