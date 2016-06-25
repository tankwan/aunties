process.env.NODE_ENV = 'development'

var models = require('../models/index');
var sequelize = models.sequelize;
var utils = require('../tests/TestUtils')

// sequelize.sync({force:false})
// .then
utils.loadCompanyFixtures()
.then(utils.loadUserFixtures)
.then(utils.loadInvoiceFixtures)
.catch(console.log.bind(console))
