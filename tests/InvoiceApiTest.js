process.env.NODE_ENV = 'test'

var assert = require('assert');
var should = require('should');
var request = require('supertest');

var server = require('../app');
var models = require('../models/index');
var sequelize = models.sequelize;
var utils = require('./TestUtils');
var logger = require('../logger');

// Fixtures
var createCompanies = require('../fixtures/CompanyFixtures')
var createUsers     = require('../fixtures/UserFixtures')
var createInvoices  = require('../fixtures/InvoiceFixtures')

describe("Invoice API", function(){

  var token = null;
  var fixtures = {};

  before(function(done){
    sequelize.sync({force: true})
    .then(function(){ return createCompanies(fixtures) })
    .then(function(){ return createUsers(fixtures) })
    .then(function(){ return createInvoices(fixtures) })
    .then(function(){ return utils.loginAndGetToken(server, 'cm@tratar.com','123') })
    .then(function(auth){
      token = auth.token
      done()
    })
    .catch(function(err){ done(err) });
  });

  describe('GET all invoices', function(){
    it('should return all invoices for a company', function(done){
      request(server).get('/api/invoices')
      .set('Accept', 'application/json')
      .set('x-access-token', token)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.length.should.equal(1);  // Tratar has only one invoice
        done();
      });
    });
  });

  describe('GET one invoice', function(){
    it('should return a specific invoice', function(done){
      request(server).get(`/api/invoices/${fixtures.InvoiceTratarAhGongBakery.id}`)
      .set('Accept', 'application/json')
      .set('x-access-token', token)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.reference.should.equal("# 123213");
        done();
      });
    });
  });

  var invoiceObj = {
    "title": "Accounting Services",
    "summary": "Summary",
    "reference": "Quote-111111",
    "currency": "SGD",
    "subtotal": 111.00,
    "taxAmount": 1.00,
    "grandTotal": 112.00,
    "repeating": false,
    "issueDate": "2016-11-11",
    "dueDate": "2016-11-11",
    "paymentTermsDays": 30,
    "InvoiceRows":[{
      "description": "My unique invoice row",
      "quantity": 2.0,
      "unitPrice": 25.0,
      "discountAmount": 0.0,
      "rowTotal": 50.0
    }]
  }

  describe('POST (create) invoice', function(){
    it('should create an invoice, rows and status', function(done){
      invoiceObj.companyId = fixtures.Tratar.id
      invoiceObj.counterpartyId = fixtures.TratarCpHmo.id

      logger.debug({invoice:invoiceObj}, 'debugging')

      request(server).post('/api/invoices')
      .set('Accept', 'application/json')
      .set('x-access-token', token)
      .send(invoiceObj)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        created = res.body
        created.counterpartyName.should.be.equal(fixtures.TratarCpHmo.name)
        created.InvoiceRows.length.should.be.equal(1)
        created.InvoiceStatuses.length.should.be.equal(1)
        created.InvoiceStatuses[0].userId.should.be.equal(fixtures.CmChau.id)
        done()
      });
    });
  });

  describe('PUT (update) invoice', function(){
    it('should update an invoice, rows and status', function(done){
      invoiceObj.companyId = fixtures.Tratar.id
      invoiceObj.counterpartyId = fixtures.TratarCpHmo.id

      request(server).put(`/api/invoices/${fixtures.InvoiceTratarAhGongBakery.id}`)
      .set('Accept', 'application/json')
      .set('x-access-token', token)
      .send(invoiceObj)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        created = res.body
        created.counterpartyName.should.be.equal('Ah Gong Bakery')
        created.InvoiceRows.length.should.be.equal(1)
        created.InvoiceRows[0].description.should.be.equal("My unique invoice row")
        done()
      });
    });
  });
});
