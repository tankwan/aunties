process.env.NODE_ENV = 'test'

var should = require('should');
var models = require('../models/index');
var sequelize = models.sequelize;
var utils = require('./TestUtils')
var logger = require('../logger')
var createCompanies = require('../fixtures/CompanyFixtures')
var createCounterparties  = require('../fixtures/CounterpartyFixtures')
var createInvoices  = require('../fixtures/InvoiceFixtures')
var createInvoiceRows  = require('../fixtures/InvoiceRowFixtures')

const invoiceObject = {
  title: 'Title',
  summary: 'Summary',
  counterpartyAddress: '308 Lavender Street',
  counterpartyCountry: 'Singapore',
  counterpartyPhone: '61161121',
  reference: 'REF-112111',
  currency: 'SGD',
  subTotal: 1000,
  taxAmount: 13,
  grandTotal: 1013,
  comments: '',
  issueDate: '2017-01-01',
  dueDate: '2017-02-28',
  paymentTermsDays: 60
}

describe("Invoice model", function () {
  var fixtures = {}

  before(function(done){
    sequelize.sync({force: true})
    .then(function(){ return createCompanies(fixtures) })
    .then(function(){ return createCounterparties(fixtures) })
    .then(function(){ return createInvoices(fixtures) })
    .then(function(){ return createInvoiceRows(fixtures) })
    .then(function(){ done() })
    .catch(function(err){ done(err) });
  });

  it("should load all fixtures", function (done) {
    models.Invoice.findAll({
      include: [models.InvoiceRow, models.InvoiceStatus, models.CreditDebitNote]
    })
    .then(function(invoices){
      invoices.length.should.equal(4);
    })
    .then(function(result){
      return models.InvoiceRow.findAll({
        where:{
          invoiceId: fixtures.InvoiceSagaPeakHmo1.id
        }
      })
    })
    .then(function(returnedInvoiceRows){
      returnedInvoiceRows.length.should.equal(2)
      done()
    })
    .catch(function(err){ done(err) });
  });

  it("should save", function (done) {
    invoiceObject.companyId = fixtures.SagaPeak.id
    invoiceObject.counterpartyid = fixtures.SagaPeakCpHmo.id

    models.Invoice.create(invoiceObject)
    .then(function(){ return models.Invoice.findAll({
        include: [models.InvoiceRow, models.InvoiceStatus, models.CreditDebitNote],
        order:'"updated_at" DESC'
      })
    })
    .then(function(invoices){
      invoice = invoices[0]
      invoice.reference.should.equal('REF-112111');
      done()
    })
    .catch(function(err){ done(err) });
  });

});
