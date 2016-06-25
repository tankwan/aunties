'use strict'

var express = require('express');
var router = express.Router();
var models = require('../models/index');
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST

//Reference to individual controller files
var invoicesController     = require('../controllers/invoice-controllers/invoicesController');
var invoiceStatusesController     = require('../controllers/invoice-controllers/invoiceStatusesController');
// var invoiceRowsController     = require('../controllers/invoice-controllers/invoiceRowsController');

/////////////////////// INVOICE RELATED ROUTES ///////////////////////////

//=============== All invoices of a company ========================

router.route('/api/invoices')
  .get(invoicesController.getAllCompanyInvoices)

//=============== Create new invoice for a company ========================

router.route('/api/invoices')
  .post(invoicesController.createNewInvoice)

//=============== For one specific invoice of a company ========================

router.route('/api/invoices/:invoiceId')
  .get(invoicesController.getOneInvoice)
  .put(invoicesController.updateOneInvoice)
  .delete(invoicesController.deleteOneInvoice)


/////////////////////// INVOICE ROW RELATED ROUTES ///////////////////////////

//=============== Create new invoice row for an invoice ========================

// router.route('/api/invoices/:invoiceId/invoicerow')
//   .post(invoiceRowsController.createNewInvoiceRow)

//=============== For one specific invoice row for an invoice ========================

// router.route('/api/invoices/:invoiceId/invoicerow/:invoicerow_id')
//   .get(invoiceRowsController.getOneInvoiceRow)
//   .put(invoiceRowsController.updateOneInvoiceRow)
//   .delete(invoiceRowsController.deleteOneInvoiceRow)


/////////////////////// INVOICE STATUS RELATED ROUTES ///////////////////////////

//=============== Updating invoice status for an invoice ========================

router.route('/api/invoices/:invoiceId/draft')
  .post(invoiceStatusesController.createNewInvoiceStatusDraft)



module.exports = router;
