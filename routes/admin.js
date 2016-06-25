'use strict'

var express     = require('express');
var router      = express.Router();
var passport    = require("passport");
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST

//Reference to individual controller files
var adminController     = require('../controllers/adminController');




//=============== Routes for Users  ========================
router.route('/admin/availabilitycheck')
  .post(adminController.postAvailabilityCheck)


//=============== End of registration routes ========================

module.exports = router
