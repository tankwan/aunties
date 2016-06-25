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



describe("User Settings API", function () {

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

  describe('change password fail', function(){
    it('should return that new passwords do not match', function(done){

      data = {
        email: 'st@sagapeak.com',
        // 123 hashed = $2a$08$cnsDGsJwKCosSKJSpd.IEOZCRIf1OaPIqpoTzCWcPrjRhvtCes1aO
        currentPassword: "123",
        newPassword1: "12345",
        newPassword2: "1234"
      }
      request(server).post('/api/changepassword')
        .set('Accept', 'application/json')
        .set('x-access-token', token)
        .send(data)
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.message.should.be.type('string')
          res.body.message.should.equal("New passwords entered do not match")
          done();
        });
    });
  });

  describe('change password successfully', function(){
    it('should return that password has been changed', function(done){

      data = {
        email: 'st@sagapeak.com',
        // 123 hashed = $2a$08$cnsDGsJwKCosSKJSpd.IEOZCRIf1OaPIqpoTzCWcPrjRhvtCes1aO
        currentPassword: "123",
        newPassword1: "1234",
        newPassword2: "1234"
      }
      request(server).post('/api/changepassword')
        .set('Accept', 'application/json')
        .set('x-access-token', token)
        .send(data)
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
