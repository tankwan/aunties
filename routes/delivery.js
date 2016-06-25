'use strict'

var express = require('express');
var router = express.Router();
var models = require('../models/index');
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST

//Reference to individual controller files
var deliveriesController     = require('../controllers/delivery-controllers/deliveriesController');
var deliveryStatusesController     = require('../controllers/delivery-controllers/deliveryStatusesController');
// var deliveryRowsController     = require('../controllers/delivery-controllers/deliveryRowsController');

/////////////////////// INVOICE RELATED ROUTES ///////////////////////////

//=============== All deliveries of a company ========================

router.route('/api/deliveries')
  .post(deliveriesController.postDelivery)


//=============== For one specific delivery of a company ========================

// router.route('/api/deliveries/:deliveryId')
//   .get(deliveriesController.getOneDelivery)
//   .put(deliveriesController.updateOneDelivery)
//   .delete(deliveriesController.deleteOneDelivery)


/////////////////////// INVOICE STATUS RELATED ROUTES ///////////////////////////

//=============== Updating delivery status for an delivery ========================
//
// router.route('/api/deliveries/:deliveryId/draft')
//   .post(deliveryStatusesController.createNewDeliveryStatusDraft)



module.exports = router;
