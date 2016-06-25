// process.env.NODE_ENV = 'test'

var models = require('../models/index');
var sequelize = models.sequelize;
var request = require('supertest');

var TestUtils = {

  loginAndGetToken(server, email, password){
    return new Promise(function(resolve, reject){
      request(server).post('/login')
      .set('Accept', 'application/json')
      .send({email:email,password:password})
      .end(function(err, res){
        if (err) reject(err)
        resolve(res.body)
      })
    })
  },

  loadCompanyFixtures(){
    return models.loadFixtures(models.Company, require('./fixtures/Companies.json'))
  },

  loadUserFixtures(){
    return models.loadFixtures(models.User, require('./fixtures/Users.json'))
  },

  loadInvoiceFixtures(){
    var promise =
      models.loadFixtures(models.Invoice, require('./fixtures/Invoices.json'))
      .then(function(){
        return models.loadFixtures(models.InvoiceRow,  require('./fixtures/InvoiceRows.json'))
      })
      .then(function(){
        return models.loadFixtures(models.InvoiceStatus, require('./fixtures/InvoiceStatuses.json'))
      })
    return promise
  }

}

module.exports = TestUtils
