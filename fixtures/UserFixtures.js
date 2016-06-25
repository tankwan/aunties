var models = require('../models/index');
var sequelize = models.sequelize;
var logger = require('../logger')

var FixturePromises = function(fixtures){
  var promises = []

  promises.push(models.User.create(
      {
        "firstName": "CX",
        "lastName": "Chua",
        "email": "chua.cheng.xun@gmail.com",
        "phone": "+65 9067 8318",
        "password": "$2a$08$cnsDGsJwKCosSKJSpd.IEOZCRIf1OaPIqpoTzCWcPrjRhvtCes1aO",
        "address": "38 Lor 5 Toa Payoh",
        "postcode": 310038,
      }
    )
    .then(function(created){ fixtures.CXChua = created })
    .catch(function(err) { logger.error({err: err}) })
  )

  promises.push(models.User.create(
      {
        "firstName": "Euwen",
        "lastName": "Ding",
        "email": "euwending2007@u.northwestern.edu",
        "phone": "+65 9815 4117",
        "password": "$2a$08$cnsDGsJwKCosSKJSpd.IEOZCRIf1OaPIqpoTzCWcPrjRhvtCes1aO",
        "address": "29 Lor 5 Toa Payoh",
        "postcode": 310029,
      }
    )
    .then(function(created){ fixtures.EuwenDing = created })
    .catch(function(err) { logger.error({err: err}) })
  )

  promises.push(models.User.create(
      {
        "firstName": "Tony",
        "lastName": "Tan",
        "email": "t@tonyktan.com",
        "phone": "+65 9683 1445",
        "password": "$2a$08$cnsDGsJwKCosSKJSpd.IEOZCRIf1OaPIqpoTzCWcPrjRhvtCes1aO",
        "address": "72 Lor 5 Toa Payoh",
        "postcode": 310072,
      }
    )
    .then(function(created){ fixtures.TonyTan = created })
    .catch(function(err) { logger.error({err: err}) })
  )

  promises.push(models.User.create(
      {
        "firstName": "KX",
        "lastName": "Sim",
        "email": "kwangxiong@gmail.com",
        "phone": "+65 9171 7959",
        "password": "$2a$08$cnsDGsJwKCosSKJSpd.IEOZCRIf1OaPIqpoTzCWcPrjRhvtCes1aO",
        "address": "55 Lor 5 Toa Payoh",
        "postcode": 310055,
      }
    )
    .then(function(created){ fixtures.SagaTan = created })
    .catch(function(err) { logger.error({err: err}) })
  )

  return Promise.all(promises)
}

// 53 Lor 5 Toa Payoh, 310053

module.exports = FixturePromises
