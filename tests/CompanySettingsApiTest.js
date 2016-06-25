process.env.NODE_ENV = 'test'
// Testing
var assert = require('assert');
var should    = require('should');
var request = require('supertest');

var models    = require('../models/index');
var sequelize = models.sequelize;
var utils     = require('./TestUtils');
var logger    = require('../logger')
var constants = require('auntie-common').constants
var server = require('../app');


// Fixtures
var createCompanies         = require('../fixtures/CompanyFixtures')
var createUsers             = require('../fixtures/UserFixtures')



describe("Company Settings API", function () {

  var token = null;
  var fixtures = {};

  before(function(done){
    sequelize.sync({force: true})
    .then(function(){ return createCompanies(fixtures) })
    .then(function(){ return createUsers(fixtures) })
    .then(function(){ return utils.loginAndGetToken(server, 'st@sagapeak.com','123') })
    .then(function(auth){
      token = auth.token
      done()
    })
    .catch(function(err){ done(err) });
  });


  describe('update company reminder settings', function(){
    it('should return that company settings have changed', function(done){

      data = {
        reminder: true,
        beforeDays: 9,
        afterDays: 15,
      }
      request(server).post('/api/companysettings')
        .set('Accept', 'application/json')
        .set('x-access-token', token)
        .send(data)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.reminder.should.equal(true)
          res.body.beforeDays.should.equal(9)
          res.body.afterDays.should.equal(15)
          done();
        });
    });
  });

});
