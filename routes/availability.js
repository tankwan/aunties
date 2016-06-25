'use strict'

var express = require('express');
var router = express.Router();
var models = require('../models/index');
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST

//Reference to individual controller files
var availabilitiesController     = require('../controllers/availabilitiesController');
// var deliveryRowsController     = require('../controllers/delivery-controllers/deliveryRowsController');

/////////////////////// INVOICE RELATED ROUTES ///////////////////////////

//=============== All deliveries of a company ========================

  router.route('/api/availability')
  .post(availabilitiesController.createNewAvailability)





module.exports = router;
