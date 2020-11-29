var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');
/* GET home page. */
router.get('/', messageController.homepage);

// Get login form
router.get('/login', userController.login_get);

// POST login form / login user
router.post('/login', userController.login_post);

//Get sign-up form
router.get('/sign-up', userController.sign_up_get);

//POST sign-up form / Save user
router.post('/sign-up', userController.sign_up_post);

//Make new message
router.post('/new-message', messageController.save_message);

//Log out
router.get('/logout', (req, res, next) => {
    req.logOut();
    res.redirect('/');
});
module.exports = router;
