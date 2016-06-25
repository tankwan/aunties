'use strict'

var express     = require('express');
var router      = express.Router();
var passport    = require("passport");
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST

//Reference to individual controller files
var zzenumsController     = require('../controllers/zzenumsController');


router.route('/enum/getallenums')
  .get(zzenumsController.getAllEnums);



//=============== End of registration routes ========================

module.exports = router
