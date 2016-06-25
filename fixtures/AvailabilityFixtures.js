
var models = require('../models/index');
var sequelize = models.sequelize;
var logger = require('../logger')

var FixturePromises = function(fixtures){

  // Collect promises and then return Promise.all
  var promises = []

  promises.push(
    models.Availability.create(
      {
        "name": "Saga Peak",
        "availabilityReg": "123A456",
        "address": "123 Main Street",
        "phone": "+65 9876 2342",
        "country": "Singapore",
        "currency": "SGD",
        "fyEndDate": "2014-12-31",
        "incorpDate": "2014-05-12",
        "corpType": "Partnership"
      }
    ).then(function(created){
      fixtures.SagaPeak = created
    })
    .catch(function(err) { logger.error({err: err}) })
  )

  promises.push(
    models.Availability.create(
      {
        "name": "Tratar",
        "availabilityReg": "654321",
        "address": "321 Down Street",
        "phone": "+65 2232 3232",
        "country": "Singapore",
        "currency": "SGD",
        "fyEndDate": "2014-12-31",
        "incorpDate": "2012-05-12",
        "corpType": "Availability - Private Limited"
      }
    ).then(function(created){
      fixtures.Tratar = created
    })
    .catch(function(err) { logger.error({err: err}) })
  )

  return Promise.all(promises)
}

module.exports = FixturePromises
