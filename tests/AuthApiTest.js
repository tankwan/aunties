process.env.NODE_ENV = 'test'

var assert = require('assert');
var should = require('should');
var request = require('supertest');

var server = require('../app');
var models = require('../models/index');
var sequelize = models.sequelize;

describe("Authentication middleware", function(){

  describe('Admin routes', function(){
    it('require a token', function(done){
      request(server).get('/admin')
        .set('Accept', 'application/json')
        .expect(403)
        .end(function(err, res) {
          res.body.message.should.containEql('Authentication failed - no token provided.')
          done();
        });
    });
  });

  describe('API routes', function(){
    it('require a token', function(done){
      request(server).get('/api')
        .set('Accept', 'application/json')
        .expect(403)
        .end(function(err, res) {
          res.body.message.should.containEql('Authentication failed - no token provided.')
          done();
        });
    });
  });

});
