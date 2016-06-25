process.env.NODE_ENV = 'development'
var logger = require('../logger')
var createAvailabilities = require('../fixtures/AvailabilityFixtures')
var createUsers     = require('../fixtures/UserFixtures')
var createDeliveries  = require('../fixtures/DeliveryFixtures')

var models = require("../models");


var fixtures = {}

models.sequelize.sync()
.then(function(){ return createUsers(fixtures) })
.then(function(){ return createAvailabilities(fixtures) })

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
