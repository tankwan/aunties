var models = require('../models/index');
var sequelize = models.sequelize;
var logger = require('../logger')

var FixturePromises = function(fixtures){
  var promises = []

  promises.push(models.Delivery.create(
      {

      }
    )
    .then(function(created){ fixtures.DeliverySagaPeakHmo1 = created })
    .catch(function(err) { logger.error({err: err}) })
  )

  return Promise.all(promises)
}

module.exports = FixturePromises
