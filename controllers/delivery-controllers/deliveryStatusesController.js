'use strict'

var path = require('path')
var models = require(path.join(__dirname, '../../models/index'));
var logger = require('../../logger');

function createReceivedStatus (req, res) {
  return models.DeliveryStatus.create({
    status: "received by user",
    deliveryId: req.params.deliveryId,
    userId: req.user.id
  })
  .then(function(deliveryStatus) {
      return res.json("Thank you!")
    })
  .catch(respondWithError(res, 500));
}




function respondWithError(res, statusCode){
  return function(error){
    logger.error(error)
    res.status(statusCode).send({
      success: false,
      message: ("Creating delivery status failed: " + error.message)
    });
  }
}

module.exports = {
  createReceivedStatus: createReceivedStatus
}
