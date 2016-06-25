process.env.NODE_ENV = 'test'

var should = require('should');
var models = require('../models/index');
var sequelize = models.sequelize;
var logger = require('../logger')
var createCompanies = require('../fixtures/CompanyFixtures')

describe("Company model", function () {
  var fixtures = {}

  before(function(done){
    sequelize.sync({force:true})
    .then(function(){done()})
    .catch(function(err) { done(err) })
  });

  it("should load fixtures", function (done) {
    createCompanies(fixtures)
    .then(function(){
      return models.Company.findAll({})
    })
    .then(function(data){
      data.length.should.equal(2)
      done()
    })
    .catch(function(err){
      done(err)
    });
  });
});
