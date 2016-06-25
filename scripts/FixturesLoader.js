process.env.NODE_ENV = 'development'
var logger = require('../logger')
var createCompanies = require('../fixtures/CompanyFixtures')
var createUsers     = require('../fixtures/UserFixtures')
var createInvoices  = require('../fixtures/InvoiceFixtures')
var createInvoiceRows = require('../fixtures/InvoiceRowFixtures')

var models = require("../models");


var fixtures = {}

models.sequelize.sync()
.then(function(){ return createCompanies(fixtures) })
.then(function(){ return createUsers(fixtures) })
.then(function(){ return createInvoices(fixtures) })
.then(function(){ return createInvoiceRows(fixtures) })

.then(function(){
  logger.info({fixtures: Object.keys(fixtures)})
})
.catch(function(err) { logger.error({err: err}) })

// The code above produces this:
// fixtures: [
//       "SagaPeak",
//       "Tratar",
//       "TedChua",
//       "AmenLee",
//       "CmChau",
//       "TratarCpHmo",
//       "SagaPeakCpHmo",
//       "TratarCpAhHuatCoffee",
//       "TratarCpAhGongBakery",
//       "InvoiceSagaPeakHmo1",
//       "InvoiceSagaPeakHmo2",
//       "InvoiceTratarAhGongBakery",
//       "BillSagaPeakHmo",
//       "BillTratarAhHuatCoffee",
//       "BillTratarHmo",
//       "CDNTratarAhHuatCoffee",
//       "CDNTratarAhGongBakery",
//       "DbsSagaPeak",
//       "OcbcSagaPeak",
//       "UobSagaPeak",
//       "BtDbsSagaPeakHmo1",
//       "BtDbsSagaPeakHmo2"
//     ]
