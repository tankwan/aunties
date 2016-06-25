process.env.NODE_ENV = 'development'

var models = require('../models/index');
var sequelize = models.sequelize;
var utils = require('../tests/TestUtils')

// sequelize.sync({force:false})
// .then
utils.loadUserFixtures()
.then(utils.loadAvailabilityFixtures)
.then(utils.loadDeliveryFixtures)
.catch(console.log.bind(console))
