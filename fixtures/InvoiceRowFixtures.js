var models = require('../models/index');
var sequelize = models.sequelize;
var logger = require('../logger')
var constants = require('../constants')
var FixturePromises = function(fixtures){
  var promises = []

  promises.push(models.InvoiceRow.create(
      {
        "description": "Completed work",
        "quantity": 2.0,
        "revenueCode":constants.ACCOUNTING_CODES.REVENUE_SALES,
        "completedTransaction": true,
        "revenueStartDate":null,
        "revenueEndDate":null,
        "unitPrice": 20.0,
        "discountAmount": 0.0,
        "rowTotal": 40.0,
        "invoiceId": fixtures.InvoiceSagaPeakHmo1.id
      }
    )
    .then(function(created){ fixtures.InvoiceSagaPeakHmo1RowCompleted = created })
    .catch(function(err) { logger.error({err: err}) })
  )

  promises.push(models.InvoiceRow.create(
      {
        "description": "Prepayment of work to be done in July 16",
        "quantity": 1.0,
        "revenueCode":constants.ACCOUNTING_CODES.REVENUE_SALES,
        "completedTransaction": false,
        "revenueStartDate":"2016-07-01",
        "revenueEndDate":"2016-07-31",
        "unitPrice": 60.0,
        "discountAmount": 0.0,
        "rowTotal": 60.0,
        "invoiceId": fixtures.InvoiceSagaPeakHmo1.id
      }
    )
    .then(function(created){ fixtures.InvoiceSagaPeakHmo1RowUncompleted = created })
    .catch(function(err) { logger.error({err: err}) })
  )

  promises.push(models.InvoiceRow.bulkCreate([
      {
        "description": "Completed work",
        "quantity": 2.0,
        "revenueCode":constants.ACCOUNTING_CODES.REVENUE_SALES,
        "completedTransaction": true,
        "revenueStartDate":null,
        "revenueEndDate":null,
        "unitPrice": 60.0,
        "discountAmount": 0.0,
        "rowTotal": 120.0,
        "invoiceId": fixtures.InvoiceSagaPeakHmo2.id
      },
      {
        "description": "Prepayment of work to be done in July 16",
        "quantity": 1.0,
        "revenueCode":constants.ACCOUNTING_CODES.REVENUE_SALES,
        "completedTransaction": false,
        "revenueStartDate":"2016-07-01",
        "revenueEndDate":"2016-07-31",
        "unitPrice": 80.0,
        "discountAmount": 0.0,
        "rowTotal": 80.0,
        "invoiceId": fixtures.InvoiceSagaPeakHmo2.id
      }
    ])
    .then(function(){
      return fixtures.InvoiceSagaPeakHmo2.reload({
        include: [models.InvoiceRow]
      })
    })
    .catch(function(err) { logger.error({err: err}) })
  )

  promises.push(models.InvoiceRow.bulkCreate([
      {
        "description": "Completed work",
        "quantity": 2.0,
        "revenueCode":constants.ACCOUNTING_CODES.REVENUE_SALES,
        "completedTransaction": true,
        "revenueStartDate":null,
        "revenueEndDate":null,
        "unitPrice": 60.0,
        "discountAmount": 0.0,
        "rowTotal": 120.0,
        "invoiceId": fixtures.InvoiceSagaPeakHmo3.id
      },
      {
        "description": "Prepayment of work to be done in July 16",
        "quantity": 1.0,
        "revenueCode":constants.ACCOUNTING_CODES.REVENUE_SALES,
        "completedTransaction": false,
        "revenueStartDate":"2016-07-01",
        "revenueEndDate":"2016-07-31",
        "unitPrice": 180.0,
        "discountAmount": 0.0,
        "rowTotal": 180.0,
        "invoiceId": fixtures.InvoiceSagaPeakHmo3.id
      }
    ])
    .then(function(){
      return fixtures.InvoiceSagaPeakHmo3.reload({
        include: [models.InvoiceRow]
      })
    })
    .catch(function(err) { logger.error({err: err}) })
  )


  promises.push(models.InvoiceRow.bulkCreate([
      {
        "description": "Hot Cross bun",
        "quantity": 1.0,
        "revenueCode":constants.ACCOUNTING_CODES.REVENUE_SALES,
        "completedTransaction": true,
        "revenueStartDate":null,
        "revenueEndDate":null,
        "unitPrice": 20.0,
        "discountAmount": 0.0,
        "rowTotal": 20.0,
        "invoiceId": fixtures.InvoiceTratarAhGongBakery.id
      },
      {
        "description": "Cha Siew Bun",
        "quantity": 1.0,
        "revenueCode":constants.ACCOUNTING_CODES.REVENUE_SALES,
        "completedTransaction": true,
        "revenueStartDate":null,
        "revenueEndDate":null,
        "unitPrice": 5.0,
        "discountAmount": 0.0,
        "rowTotal": 5.0,
        "invoiceId": fixtures.InvoiceTratarAhGongBakery.id
      }
    ])
    .then(function(){
      return fixtures.InvoiceTratarAhGongBakery.reload({
        include: [models.InvoiceRow]
      })
    })
    .catch(function(err) { logger.error({err: err}) })
  )

  return Promise.all(promises)
}

module.exports = FixturePromises
