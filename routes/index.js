var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home', { user: res.locals.currentUser });
});

// Get login form
router.get('/login', userController.login_get);

// POST login form / login user
router.post('/login', userController.login_post);

//Get sign-up form
router.get('/sign-up', userController.sign_up_get);

//POST sign-up form / Save user
router.post('/sign-up', userController.sign_up_post);

module.exports = router;
