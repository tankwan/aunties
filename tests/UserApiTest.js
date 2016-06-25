process.env.NODE_ENV = 'test'

var assert = require('assert');
var should = require('should');
var request = require('supertest');

var server = require('../app');
var models = require('../models/index');
var sequelize = models.sequelize;
var utils = require('./TestUtils')

var createCompanies = require('../fixtures/CompanyFixtures')
var createUsers = require('../fixtures/UserFixtures')

describe("User API", function(){
  var token = null;
  var fixtures = {}

  before(function(done){
    sequelize.sync({ force: true})
    .then(function(){ return createCompanies(fixtures) })
    .then(function(){ return createUsers(fixtures) })
    .then(function(){done()})
    .catch(function(err){done(err)});
  });


  describe('login', function(){
    it('should return a JWT token', function(done){

      loginData = {
        email: 'cx@sagapeak.com',
        // 123 hashed = $2a$08$cnsDGsJwKCosSKJSpd.IEOZCRIf1OaPIqpoTzCWcPrjRhvtCes1aO
        password: "123"
      }

      request(server).post('/login')
        .set('Accept', 'application/json')
        .send(loginData)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.token.should.be.type('string')
          res.body.token.length.should.be.above(400)
          done();
        });
    });
  });

});
