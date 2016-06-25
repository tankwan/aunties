process.env.NODE_ENV = 'test'

var should = require('should');
var models = require('../models/index');
var sequelize = models.sequelize;
var logger = require('../logger')
var createCompanies = require('../fixtures/CompanyFixtures')
var createUsers     = require('../fixtures/UserFixtures')

describe("User model", function () {
  var fixtures = {}

  before(function(done){
    sequelize.sync({force:true})
    .then(function(){ return createCompanies(fixtures) })
    .then(function(){done()})
    .catch(function(err){ done(err) })
  });

  it("should load the fixtures", function (done) {
    createUsers(fixtures)
    .then(function(){
      return models.User.findAll({})
    })
    .then(function(data){
      data.length.should.equal(5)
      done()
    })
    .catch(function(err){
      done(err)
    });
  });
});
