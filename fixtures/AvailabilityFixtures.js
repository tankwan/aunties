
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
        "tentotwelve": true,
        "twelvetotwo": true,
        "twotofour": false,
        "fourtosix": false,
        "sixtoeight": false,
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
        "tentotwelve": false,
        "twelvetotwo": false,
        "twotofour": true,
        "fourtosix": true,
        "sixtoeight": true,
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
