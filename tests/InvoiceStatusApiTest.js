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
var createInvoices          = require('../fixtures/InvoiceFixtures')
var createInvoiceRows       = require('../fixtures/InvoiceRowFixtures')


describe("Invoice Status API", function () {

  var token = null;
  var fixtures = {};

  before(function(done){
    sequelize.sync({force: true})
    .then(function(){ return createCompanies(fixtures) })
    .then(function(){ return createUsers(fixtures) })
    .then(function(){ return createInvoices(fixtures) })
    .then(function(){ return createInvoiceRows(fixtures) })
    .then(function(){
      return models.InvoiceStatus.create({
        status: constants.INVOICE_STATUSES.AWAITING,
        invoiceId: fixtures.InvoiceSagaPeakHmo1.id,
        userId:    fixtures.SagaTan.id
      })
    })
    .then(function(){
      return models.InvoiceStatus.create({
        status: constants.INVOICE_STATUSES.AWAITING,
        invoiceId: fixtures.InvoiceSagaPeakHmo2.id,
        userId:    fixtures.SagaTan.id
      })
    })
    .then(function(){
      return models.InvoiceStatus.create({
        status: constants.INVOICE_STATUSES.SENT,
        invoiceId: fixtures.InvoiceSagaPeakHmo2.id,
        userId:    fixtures.SagaTan.id
      })
    })
    .then(function(){
      return models.InvoiceStatus.create({
        status: constants.INVOICE_STATUSES.AWAITING,
        invoiceId: fixtures.InvoiceSagaPeakHmo3.id,
        userId:    fixtures.SagaTan.id
      })
    })
    .then(function(){
      return models.InvoiceStatus.create({
        status: constants.INVOICE_STATUSES.SENT,
        invoiceId: fixtures.InvoiceSagaPeakHmo3.id,
        userId:    fixtures.SagaTan.id
      })
    })
    .then(function(){ return utils.loginAndGetToken(server, 'st@sagapeak.com','123') })
    .then(function(auth){
      token = auth.token
      done()
    })
    .catch(function(err){ done(err) });
  });

  describe('POSTing a Sent InvoiceStatus', function(){
    it("should create 4 ledger entries that net to zero", function (done) {
      var invoice = fixtures.InvoiceSagaPeakHmo1

      request(server).post(`/api/invoices/${invoice.id}/sent`)
      .set('Accept', 'application/json')
      .set('x-access-token', token)
      .send()
      .expect(200)
      .end(function(){
        models.LedgerEntry.findAll({
          order:'"updated_at" DESC'
        })
        .then(function(entries){
          entries.length.should.equal(4);
          entries[3].accountingCode.should.equal(constants.ACCOUNTING_CODES.ASSETS_AR);
          entries[3].entryAmount.should.equal(invoice.grandTotal);
          entries[3].credit.should.equal(false);
          entries[2].accountingCode.should.equal(constants.ACCOUNTING_CODES.LIABILITY_GST);
          entries[2].entryAmount.should.equal(invoice.taxAmount);
          entries[2].credit.should.equal(true);
          // entries[1].accountingCode.should.equal(constants.ACCOUNTING_CODES.REVENUE_SALES);
          entries[1].credit.should.equal(true);
          // entries[0].accountingCode.should.equal(constants.ACCOUNTING_CODES.LIABILITY_PREPAID_SALES);
          entries[0].credit.should.equal(true);
          (entries[3].entryAmount-entries[2].entryAmount-entries[1].entryAmount-entries[0].entryAmount).should.equal(0)
        })
        .then(function(result1){
          return models.InvoiceStatus.findAll({
            where:{
              invoiceId: invoice.id,
            },
            order:'"updated_at" DESC'
          })
        })
        .then(function(returnedInvoiceStatus){
          returnedInvoiceStatus[0].status.should.equal("Sent")
          done()
        })
        .catch(function(err){ done(err) });
      })
    });
  })

  describe('POSTing a Paid Partial InvoiceStatus', function(){
    it("should create 2 additional ledger entries that net to zero", function (done) {
      var invoice = fixtures.InvoiceSagaPeakHmo1
      var bodyData = {
        bankTransactionId: fixtures.BtDbsSagaPeakHmo2.id,
        bankTransactionAmount: 42.8
      };
      request(server).post(`/api/invoices/${invoice.id}/paidpartial`)
      .set('Accept', 'application/json')
      .set('x-access-token', token)
      .send(bodyData)
      .expect(200)
      .end(function(){
        models.LedgerEntry.findAll({
          order:'"updated_at" DESC'
        })
        .then(function(entries){
          entries.length.should.equal(6);
          entries[1].accountingCode.should.equal(constants.ACCOUNTING_CODES.ASSETS_AR);
          entries[1].entryAmount.should.equal(bodyData.bankTransactionAmount);
          entries[1].credit.should.equal(true);
          entries[0].accountingCode.should.equal(constants.ACCOUNTING_CODES.ASSETS_CASH);
          entries[0].entryAmount.should.equal(bodyData.bankTransactionAmount);
          entries[0].credit.should.equal(false);
          (entries[1].entryAmount-entries[0].entryAmount).should.equal(0)
        })
        .then(function(result){
          return models.Invoice.find({
            where:{
              id: invoice.id
            }
          })
        })
        .then(function(returnedInvoice){
          returnedInvoice.amountPendingReconciliation.should.equal(107-42.8)
        })
        .then(function(result1){
          return models.InvoiceStatus.findAll({
            where:{
              invoiceId: invoice.id,
            },
            order:'"updated_at" DESC'
          })
        })
        .then(function(returnedInvoiceStatus){
          returnedInvoiceStatus[0].status.should.equal("Paid Partial")
          done()
        })
        .catch(function(err){ done(err) });
      })
    });
  })

  describe('POSTing a Paid Full InvoiceStatus', function(){
    it("should create 2 additional ledger entries that net to zero", function (done) {
      var invoice = fixtures.InvoiceSagaPeakHmo1
      var bodyData = {
        bankTransactionId: fixtures.BtDbsSagaPeakHmo3.id,
        bankTransactionAmount: 64.2
      };
      request(server).post(`/api/invoices/${invoice.id}/paidfull`)
      .set('Accept', 'application/json')
      .set('x-access-token', token)
      .send(bodyData)
      .expect(200)
      .end(function(){
        models.LedgerEntry.findAll({
          order:'"updated_at" DESC'
        })
        .then(function(entries){
          entries.length.should.equal(8);
          entries[1].accountingCode.should.equal(constants.ACCOUNTING_CODES.ASSETS_AR);
          entries[1].entryAmount.should.equal(bodyData.bankTransactionAmount);
          entries[1].credit.should.equal(true);
          entries[0].accountingCode.should.equal(constants.ACCOUNTING_CODES.ASSETS_CASH);
          entries[0].entryAmount.should.equal(bodyData.bankTransactionAmount);
          entries[0].credit.should.equal(false);
          (entries[1].entryAmount-entries[0].entryAmount).should.equal(0)
        })
        .then(function(result){
          return models.Invoice.find({
            where:{
              id: invoice.id
            }
          })
        })
        .then(function(returnedInvoice){
          returnedInvoice.amountPendingReconciliation.should.equal(0)
        })
        .then(function(result1){
          return models.InvoiceStatus.findAll({
            where:{
              invoiceId: invoice.id,
            },
            order:'"updated_at" DESC'
          })
        })
        .then(function(returnedInvoiceStatus){
          returnedInvoiceStatus[0].status.should.equal("Paid in Full")
          done()
        })
        .catch(function(err){ done(err) });
      })
    });
  })

  describe('POSTing a Paid Full with Discount InvoiceStatus', function(){
    it("should create 5 additional ledger entries that net to zero", function (done) {
      var invoice = fixtures.InvoiceSagaPeakHmo2
      var bodyData = {
        bankTransactionId: fixtures.BtDbsSagaPeakHmo4.id,
        bankTransactionAmount: 192.6
      };
      request(server).post(`/api/invoices/${invoice.id}/paidfulldiscount`)
      .set('Accept', 'application/json')
      .set('x-access-token', token)
      .send(bodyData)
      .expect(200)
      .end(function(){
        models.LedgerEntry.findAll({
          order:'"updated_at" DESC'
        })
        .then(function(entries){
          entries.length.should.equal(13);
          entries[4].accountingCode.should.equal(constants.ACCOUNTING_CODES.ASSETS_AR);
          entries[4].entryAmount.should.equal(invoice.amountPendingReconciliation);
          entries[4].credit.should.equal(true);
          entries[3].accountingCode.should.equal(constants.ACCOUNTING_CODES.ASSETS_CASH);
          entries[3].entryAmount.should.equal(bodyData.bankTransactionAmount);
          entries[3].credit.should.equal(false);
          entries[2].accountingCode.should.equal(constants.ACCOUNTING_CODES.LIABILITY_GST);
          entries[2].entryAmount.should.equal(Math.round((invoice.amountPendingReconciliation-bodyData.bankTransactionAmount)*(invoice.taxAmount/invoice.grandTotal)*100)/100);
          entries[2].credit.should.equal(false);
          // entries[1].accountingCode.should.equal(constants.ACCOUNTING_CODES.EXPENSES_DISCOUNT);
          // entries[1].entryAmount.should.equal(Math.round((invoice.amountPendingReconciliation-bodyData.bankTransactionAmount)*(invoice.subtotal/invoice.grandTotal)*100)/100);
          entries[1].credit.should.equal(false);
          // entries[0].accountingCode.should.equal(constants.ACCOUNTING_CODES.LIABILITY_GST);
          // entries[0].entryAmount.should.equal(Math.round((invoice.amountPendingReconciliation-bodyData.bankTransactionAmount)*(invoice.taxAmount/invoice.grandTotal)*100)/100);
          entries[0].credit.should.equal(false);
          (Math.round((entries[4].entryAmount-entries[3].entryAmount-entries[2].entryAmount-entries[1].entryAmount-entries[0].entryAmount)*100)/100).should.equal(0)
        })
        .then(function(result){
          return models.Invoice.find({
            where:{
              id: invoice.id
            }
          })
        })
        .then(function(returnedInvoice){
          returnedInvoice.amountPendingReconciliation.should.equal(0)
        })
        .then(function(result1){
          return models.InvoiceStatus.findAll({
            where:{
              invoiceId: invoice.id,
            },
            order:'"updated_at" DESC'
          })
        })
        .then(function(returnedInvoiceStatus){
          returnedInvoiceStatus[0].status.should.equal("Paid in Full with Discount")
          done()
        })
        .catch(function(err){ done(err) });
      })
    });
  })

  describe('POSTing a Bad Debt InvoiceStatus', function(){
    it("should create 4 additional ledger entries that net to zero", function (done) {
      var invoice = fixtures.InvoiceSagaPeakHmo3

      request(server).post(`/api/invoices/${invoice.id}/baddebt`)
      .set('Accept', 'application/json')
      .set('x-access-token', token)
      .send()
      .expect(200)
      .end(function(){
        models.LedgerEntry.findAll({
          order:'"updated_at" DESC'
        })
        .then(function(entries){
          entries.length.should.equal(17);
          entries[3].accountingCode.should.equal(constants.ACCOUNTING_CODES.ASSETS_AR);
          entries[3].entryAmount.should.equal(invoice.amountPendingReconciliation);
          entries[3].credit.should.equal(true);
          entries[2].accountingCode.should.equal(constants.ACCOUNTING_CODES.LIABILITY_GST);
          entries[2].entryAmount.should.equal(Math.round((invoice.amountPendingReconciliation)*(invoice.taxAmount/invoice.grandTotal)*100)/100);
          entries[2].credit.should.equal(false);
          // entries[1].accountingCode.should.equal(constants.ACCOUNTING_CODES.EXPENSES_BAD_DEBT);
          // entries[1].entryAmount.should.equal(Math.round((invoice.amountPendingReconciliation)*(invoice.subtotal/invoice.grandTotal)*100)/100);
          entries[1].credit.should.equal(false);
          // entries[0].accountingCode.should.equal(constants.ACCOUNTING_CODES.LIABILITY_GST);
          // entries[0].entryAmount.should.equal(Math.round((invoice.amountPendingReconciliation)*(invoice.taxAmount/invoice.grandTotal)*100)/100);
          entries[0].credit.should.equal(false);
          (Math.round((entries[3].entryAmount-entries[2].entryAmount-entries[1].entryAmount-entries[0].entryAmount)*100)/100).should.equal(0)
        })
        .then(function(result){
          return models.Invoice.find({
            where:{
              id: invoice.id
            }
          })
        })
        .then(function(returnedInvoice){
          returnedInvoice.amountPendingReconciliation.should.equal(321)
          returnedInvoice.writtenOff.should.equal(true)
        })
        .then(function(result1){
          return models.InvoiceStatus.findAll({
            where:{
              invoiceId: invoice.id,
            },
            order:'"updated_at" DESC'
          })
        })
        .then(function(returnedInvoiceStatus){
          returnedInvoiceStatus[0].status.should.equal("Bad Debt")
          done()
        })
        .catch(function(err){ done(err) });
      })
    });
  })

  describe('POSTing a Bad Debt Collected InvoiceStatus', function(){
    it("should create 6 additional ledger entries that net to zero", function (done) {
      var invoice = fixtures.InvoiceSagaPeakHmo3
      var bodyData = {
        bankTransactionId: fixtures.BtDbsSagaPeakHmo5.id,
        bankTransactionAmount: 85.6
      };
      request(server).post(`/api/invoices/${invoice.id}/baddebtcollected`)
      .set('Accept', 'application/json')
      .set('x-access-token', token)
      .send(bodyData)
      .expect(200)
      .end(function(){
        models.LedgerEntry.findAll({
          order:'"updated_at" DESC'
        })
        .then(function(entries){
          entries.length.should.equal(23);
          // entries[4].accountingCode.should.equal(constants.ACCOUNTING_CODES.EXPENSES_BAD_DEBT);
          // entries[4].entryAmount.should.equal(Math.round((bodyData.bankTransactionAmount)*(invoice.subtotal/invoice.grandTotal)*100)/100);
          entries[1].credit.should.equal(true);
          entries[0].credit.should.equal(true);
          entries[5].accountingCode.should.equal(constants.ACCOUNTING_CODES.LIABILITY_GST);
          entries[5].entryAmount.should.equal(Math.round((bodyData.bankTransactionAmount)*(invoice.taxAmount/invoice.grandTotal)*100)/100);
          entries[5].credit.should.equal(true);
          entries[4].accountingCode.should.equal(constants.ACCOUNTING_CODES.ASSETS_AR);
          entries[4].entryAmount.should.equal(bodyData.bankTransactionAmount);
          entries[4].credit.should.equal(false);
          entries[3].accountingCode.should.equal(constants.ACCOUNTING_CODES.ASSETS_AR);
          entries[3].entryAmount.should.equal(bodyData.bankTransactionAmount);
          entries[3].credit.should.equal(true);
          entries[2].accountingCode.should.equal(constants.ACCOUNTING_CODES.ASSETS_CASH);
          entries[2].entryAmount.should.equal(bodyData.bankTransactionAmount);
          entries[2].credit.should.equal(false);
          (Math.round((entries[4].entryAmount-entries[5].entryAmount-entries[1].entryAmount-entries[0].entryAmount+entries[2].entryAmount-entries[3].entryAmount)*100)/100).should.equal(0)
        })
        .then(function(result){
          return models.Invoice.find({
            where:{
              id: invoice.id
            }
          })
        })
        .then(function(returnedInvoice){
          returnedInvoice.amountPendingReconciliation.should.equal(321-bodyData.bankTransactionAmount)
        })
        .then(function(result1){
          return models.InvoiceStatus.findAll({
            where:{
              invoiceId: invoice.id,
            },
            order:'"updated_at" DESC'
          })
        })
        .then(function(returnedInvoiceStatus){
          returnedInvoiceStatus[0].status.should.equal("Bad Debt Collected")
          done()
        })
        .catch(function(err){ done(err) });
      })
    });
  })

});
