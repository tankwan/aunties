'use strict'

var express     = require('express');
var router      = express.Router();
var passport    = require("passport");
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST

//Reference to individual controller files
var usersController     = require('../controllers/usersController');
var companiesController     = require('../controllers/companiesController');

// Not used since this is an API that runs on the server, where each request has to be authenticated
// function authenticatedUser(req, res, next){
//     if (req.isAuthenticated()) return next();
//     req.flash('errorMessage', "Login to access");
//     res.redirect('/login');
// }

//=============== Routes for Company ========================
router.route('/companyregistration')
  .post(companiesController.postCompanyRegistration)

//=============== Routes for Users  ========================
router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

router.route('/logout')
  .post(usersController.getLogout)

router.route('/api/changepassword')
  .post(usersController.changePassword)

//=============== End of registration routes ========================

module.exports = router
