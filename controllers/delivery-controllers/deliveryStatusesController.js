'use strict'

var path = require('path')
var models = require(path.join(__dirname, '../../models/index'));
var logger = require('../../logger');

function createNewDeliveryStatusDraft (req, res) {
  // return models.DeliveryStatus.findAll({
  //   where:{
  //     deliveryId: req.params.deliveryId,
  //   }
  // })
  // .then(function(deliveryStatus) {
  //   return models.Delivery.find({
  //     where:{
  //       id: deliveryStatus.deliveryId,
  //       deliveryId: req.user.deliveryId
  //     },
  //     include: [models.DeliveryRow, models.DeliveryStatus]
  //   }).then(function(delivery) {
  //     return res.json(delivery)
  //   })
  // })
  // .catch(respondWithError(res, 500));
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
  createNewDeliveryStatusDraft: createNewDeliveryStatusDraft
}
