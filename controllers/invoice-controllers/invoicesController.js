var path = require('path')
var models = require(path.join(__dirname, '../../models/index'));
var logger = require('../../logger');

function getAllCompanyInvoices (req, res) {
  models.Invoice.findAll({
    where:{
      companyId: req.user.companyId
    },
    include: [models.InvoiceRow, models.CreditDebitNote,
      {
        model: models.InvoiceStatus,
        limit:1,
        order:'"updated_at" DESC',
        required: false
      }
    ],
  })
  .then(function(invoices){ res.json(invoices) })
  .catch(respondWithError(res, 404, "Getting invoices failed"));
}

function createNewInvoice (req, res) {
  var invoiceObj = req.body  // JSON has already parsed this into an object
  invoiceObj.companyId = req.user.companyId
  var invoiceId = null

  // Creating the invoice rows
  .then(function(invoice){
    invoice.writtenOff = false
    invoice.amountPendingReconciliation = invoice.grandTotal
    invoiceId = invoice.id
    const rowPromises = []
    invoiceObj.InvoiceRows.forEach(function(row){
      row.invoiceId = invoice.id
      rowPromises.push(models.InvoiceRow.create(row))
    })
    return Promise.all(rowPromises)
  })
  // Creating the invoice status
  .then(function(result){
    return models.InvoiceStatus.create({
      status: "Draft",
      userId: req.user.id,
      invoiceId: invoiceId
    })
  })
  // Grabbing and returning the created Invoice with associations loaded (include)
  .then(function(){
    return models.Invoice.find({
      where: {id: invoiceId},
      include: [models.InvoiceRow, models.InvoiceStatus]
    })
  })
  .then(function(fullInvoice){ res.json(fullInvoice) })
  .catch(respondWithError(res, 500, "Creating invoice failed"));
}


function getOneInvoice (req, res) {
  // var lastStatusDate = null
  // models.InvoiceStatus.findAll({
  //   where:{
  //     invoiceId: req.params.invoiceId
  //   },
  //   order:'"updated_at" DESC'
  // })
  // .then(function(invoiceStatus) {
  //   console.log(Math.max(invoiceStatus[0].updated_at))
  //   return Math.max(invoiceStatus[0].updated_at)
  // })

  models.Invoice.find({
    where:{
      id: req.params.invoiceId,
      companyId: req.user.companyId
    },
    include: [models.InvoiceRow, models.CreditDebitNote, models.InvoiceStatus],
  })
  .then(function(invoice){ res.json(invoice) })
  .catch(respondWithError(res, 404, "Getting invoice failed"));
}


function updateOneInvoice (req, res) {
  var invoiceAttributes = req.body  // JSON has already parsed this into an object
  var invoice;

  models.Invoice.find({
    where: {
      id: req.params.invoiceId,
      companyId: req.user.companyId
    }
  })
  .then(function(invoice){ return invoice.updateAttributes(invoiceAttributes) })
  .then(function(updated){
    invoice = updated
    return models.InvoiceRow.destroy({
      where: {
        invoiceId: invoice.id
      }
    })
  })
  .then(function(){ return createInvoiceRows(invoice, invoiceAttributes.InvoiceRows) })
  .then(function(){ return invoice.reload({
      include: [models.InvoiceRow, models.InvoiceStatus]
    })
  })
  .then(function(fullInvoice){ res.json(fullInvoice) })
  .catch(respondWithError(res, 404, "Updating invoice failed"));
}


function deleteOneInvoice (req, res) {
  models.Invoice.destroy({
    where: {
      id: req.params.invoiceId,
      companyId: req.user.companyId
    },
    include: [models.InvoiceRow, models.InvoiceStatus]
  })
  .then(function(invoice){ res.json(invoice) })
  .catch(respondWithError(res, 500, "Deleting invoice failed"));
}


// Helpers
function createInvoiceRows(invoice, rowAttributes){
  const rowPromises = []
  rowAttributes.forEach(function(row){
    row.invoiceId = invoice.id
    rowPromises.push(models.InvoiceRow.create(row))
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
  getAllCompanyInvoices: getAllCompanyInvoices,
  createNewInvoice: createNewInvoice,
  getOneInvoice: getOneInvoice,
  updateOneInvoice: updateOneInvoice,
  deleteOneInvoice: deleteOneInvoice
}
