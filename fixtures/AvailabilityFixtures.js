
var models = require('../models/index');
var sequelize = models.sequelize;
var logger = require('../logger')

var FixturePromises = function(fixtures){

  // Collect promises and then return Promise.all
  var promises = []

  promises.push(
    models.Availability.create(
      {
        "date": "2016-06-26",
        "tentotwelve": 1,
        "twelvetotwo": 0,
        "twotofour": 0,
        "fourtosix": 0,
        "sixtoeight": 0,
        "latitude":1.33534,
        "longitude":103.85517,
        "address": "38 Lor 5 Toa Payoh",
        "userId": 1
      }
    ).then(function(created){
      fixtures.CXChuaAval = created
    })
    .catch(function(err) { logger.error({err: err}) })
  )

  promises.push(
    models.Availability.create(
      {
        "date": "2016-06-26",
        "tentotwelve": 1,
        "twelvetotwo": 1,
        "twotofour": 0,
        "fourtosix": 0,
        "sixtoeight": 0,
        "latitude": 1.33311,
        "longitude":103.85376,
        "address": "29 Lor 5 Toa Payoh",
        "userId": 2
      }
    ).then(function(created){
      fixtures.EuwenDingAval = created
    })
    .catch(function(err) { logger.error({err: err}) })
  )

  return Promise.all(promises)
}

module.exports = FixturePromises
