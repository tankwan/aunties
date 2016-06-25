'use strict'

var path = require('path')
var models = require(path.join(__dirname, '../../models/index'));
var logger = require('../../logger');

function createNewInvoiceStatusDraft (req, res) {
  return models.InvoiceStatus.findAll({
    where:{
      invoiceId: req.params.invoiceId,
    }
  })
  .then(function(invoiceStatus) {
    return models.Invoice.find({
      where:{
        id: invoiceStatus.invoiceId,
        companyId: req.user.companyId
      },
      include: [models.InvoiceRow, models.InvoiceStatus]
    }).then(function(invoice) {
      return res.json(invoice)
    })
  })
  .catch(respondWithError(res, 500));
}




function respondWithError(res, statusCode){
  return function(error){
    logger.error(error)
    res.status(statusCode).send({
      success: false,
      message: ("Creating invoice status failed: " + error.message)
    });
  }
}

module.exports = {
  createNewInvoiceStatusDraft: createNewInvoiceStatusDraft
}
