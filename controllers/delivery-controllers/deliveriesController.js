var path = require('path')
var models = require(path.join(__dirname, '../../models/index'));
var logger = require('../../logger');

function getAllAvailabilityDeliveries (req, res) {
  // models.Delivery.findAll({
  //   where:{
  //     availabilityId: req.user.availabilityId
  //   },
  //   include: [models.DeliveryRow, models.CreditDebitNote,
  //     {
  //       model: models.DeliveryStatus,
  //       limit:1,
  //       order:'"updated_at" DESC',
  //       required: false
  //     }
  //   ],
  // })
  // .then(function(deliveries){ res.json(deliveries) })
  // .catch(respondWithError(res, 404, "Getting deliveries failed"));
}

function createNewDelivery (req, res) {
  // var deliveryObj = req.body  // JSON has already parsed this into an object
  // deliveryObj.availabilityId = req.user.availabilityId
  // var deliveryId = null
  //
  // // Creating the delivery rows
  // .then(function(delivery){
  //   delivery.writtenOff = false
  //   delivery.amountPendingReconciliation = delivery.grandTotal
  //   deliveryId = delivery.id
  //   const rowPromises = []
  //   deliveryObj.DeliveryRows.forEach(function(row){
  //     row.deliveryId = delivery.id
  //     rowPromises.push(models.DeliveryRow.create(row))
  //   })
  //   return Promise.all(rowPromises)
  // })
  // // Creating the delivery status
  // .then(function(result){
  //   return models.DeliveryStatus.create({
  //     status: "Draft",
  //     userId: req.user.id,
  //     deliveryId: deliveryId
  //   })
  // })
  // // Grabbing and returning the created Delivery with associations loaded (include)
  // .then(function(){
  //   return models.Delivery.find({
  //     where: {id: deliveryId},
  //     include: [models.DeliveryRow, models.DeliveryStatus]
  //   })
  // })
  // .then(function(fullDelivery){ res.json(fullDelivery) })
  // .catch(respondWithError(res, 500, "Creating delivery failed"));
}


function getOneDelivery (req, res) {

  // models.Delivery.find({
  //   where:{
  //     id: req.params.deliveryId,
  //     availabilityId: req.user.availabilityId
  //   },
  //   include: [models.DeliveryRow, models.CreditDebitNote, models.DeliveryStatus],
  // })
  // .then(function(delivery){ res.json(delivery) })
  // .catch(respondWithError(res, 404, "Getting delivery failed"));
}


function updateOneDelivery (req, res) {
  // var deliveryAttributes = req.body  // JSON has already parsed this into an object
  // var delivery;
  //
  // models.Delivery.find({
  //   where: {
  //     id: req.params.deliveryId,
  //     availabilityId: req.user.availabilityId
  //   }
  // })
  // .then(function(delivery){ return delivery.updateAttributes(deliveryAttributes) })
  // .then(function(updated){
  //   delivery = updated
  //   return models.DeliveryRow.destroy({
  //     where: {
  //       deliveryId: delivery.id
  //     }
  //   })
  // })
  // .then(function(){ return createDeliveryRows(delivery, deliveryAttributes.DeliveryRows) })
  // .then(function(){ return delivery.reload({
  //     include: [models.DeliveryRow, models.DeliveryStatus]
  //   })
  // })
  // .then(function(fullDelivery){ res.json(fullDelivery) })
  // .catch(respondWithError(res, 404, "Updating delivery failed"));
}


function deleteOneDelivery (req, res) {
  // models.Delivery.destroy({
  //   where: {
  //     id: req.params.deliveryId,
  //     availabilityId: req.user.availabilityId
  //   },
  //   include: [models.DeliveryRow, models.DeliveryStatus]
  // })
  // .then(function(delivery){ res.json(delivery) })
  // .catch(respondWithError(res, 500, "Deleting delivery failed"));
}


// Helpers
function createDeliveryRows(delivery, rowAttributes){
  const rowPromises = []
  rowAttributes.forEach(function(row){
    row.deliveryId = delivery.id
    rowPromises.push(models.DeliveryRow.create(row))
  })
  return Promise.all(rowPromises)
}

function respondWithError(res, statusCode, msg){
  return function(err){
    logger.error(err)
    res.status(statusCode).send({
      success: false,
      message: msg
    });
  }
}

module.exports = {
  getAllAvailabilityDeliveries: getAllAvailabilityDeliveries,
  createNewDelivery: createNewDelivery,
  getOneDelivery: getOneDelivery,
  updateOneDelivery: updateOneDelivery,
  deleteOneDelivery: deleteOneDelivery
}
