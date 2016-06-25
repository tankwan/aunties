var models = require('../models/index');
var sequelize = models.sequelize;
var logger = require('../logger')

var FixturePromises = function(fixtures){
  var promises = []

  promises.push(models.Delivery.create(
      {
        "counterpartyName": "HMO for SagaPeak",
        "title": "Accounting Services",
        "summary": "For accounting services - completed work and prepayment",
        "counterpartyAddress": "306 Lavender Road",
        "counterpartyCountry": "Singapore",
        "counterpartyPhone": "+65 9988 4433",
        "reference": "Quote 23432523",
        "currency": "SGD",
        "subtotal": 100.00,
        "taxAmount": 7.00,
        "grandTotal": 107.00,
        "comments": "Late issue of delivery",
        "repeating": false,
        "issueDate": "2016-05-30",
        "dueDate": "2016-06-30",
        "paymentTermsDays": 30,
        "writtenOff": false,
        "amountPendingReconciliation":107.00,
        "companyId": fixtures.SagaPeak.id,
        "counterpartyId": fixtures.SagaPeakCpHmo.id
      }
    )
    .then(function(created){ fixtures.DeliverySagaPeakHmo1 = created })
    .catch(function(err) { logger.error({err: err}) })
  )

  promises.push(models.Delivery.create(
      {
        "counterpartyName": "HMO for SagaPeak",
        "title": "Accounting Services",
        "summary": "For accounting services provided in Jun 16",
        "counterpartyAddress": "306 Lavender Road",
        "counterpartyCountry": "Singapore",
        "counterpartyPhone": "+65 9988 4433",
        "reference": "Quote 23432524",
        "currency": "SGD",
        "subtotal": 200.00,
        "taxAmount": 14.00,
        "grandTotal": 214.00,
        "comments": "Late issue of delivery",
        "repeating": false,
        "issueDate": "2016-05-30",
        "dueDate": "2016-06-30",
        "paymentTermsDays": 30,
        "writtenOff": false,
        "amountPendingReconciliation":214.00,
        "companyId": fixtures.SagaPeak.id,
        "counterpartyId": fixtures.SagaPeakCpHmo.id
      }
    )
    .then(function(created){ fixtures.DeliverySagaPeakHmo2 = created })
    .catch(function(err) { logger.error({err: err}) })
  )

  promises.push(models.Delivery.create(
      {
        "counterpartyName": "HMO for SagaPeak",
        "title": "Accounting Services",
        "summary": "For accounting services provided in July 16",
        "counterpartyAddress": "306 Lavender Road",
        "counterpartyCountry": "Singapore",
        "counterpartyPhone": "+65 9988 4433",
        "reference": "Quote 23432524",
        "currency": "SGD",
        "subtotal": 300.00,
        "taxAmount": 21.00,
        "grandTotal": 321.00,
        "comments": "Late issue of delivery",
        "repeating": false,
        "issueDate": "2016-05-30",
        "dueDate": "2016-06-30",
        "paymentTermsDays": 30,
        "writtenOff": false,
        "amountPendingReconciliation":321.00,
        "companyId": fixtures.SagaPeak.id,
        "counterpartyId": fixtures.SagaPeakCpHmo.id
      }
    )
    .then(function(created){ fixtures.DeliverySagaPeakHmo3 = created })
    .catch(function(err) { logger.error({err: err}) })
  )

  promises.push(models.Delivery.create(
      {
        "counterpartyName": "Ah Gong Bakery",
        "title": "Bread Sold",
        "summary": "Bread sold to Ah Gong Bakery",
        "counterpartyAddress": "123 Ah Gong Road",
        "counterpartyCountry": "Singapore",
        "counterpartyPhone": "+65 4545 3453",
        "reference": "# 123213",
        "currency": "SGD",
        "subtotal": 50.00,
        "taxAmount": 3.50,
        "grandTotal": 53.50,
        "comments": "Discount factored into delivery",
        "repeating": false,
        "issueDate": "2016-05-15",
        "dueDate": "2016-07-15",
        "paymentTermsDays": 60,
        "writtenOff": false,
        "amountPendingReconciliation":53.50,
        "companyId": fixtures.Tratar.id,
        "counterpartyId": fixtures.TratarCpAhGongBakery.id
      }
    )
    .then(function(created){ fixtures.DeliveryTratarAhGongBakery = created })
    .catch(function(err) { logger.error({err: err}) })
  )

  return Promise.all(promises)
}

module.exports = FixturePromises
