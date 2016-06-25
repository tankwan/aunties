var models = require('../models/index');
var sequelize = models.sequelize;
var logger = require('../logger')

var FixturePromises = function(fixtures){
  var promises = []

  promises.push(fixtures.SagaPeak.createUser(
      {
        "firstName": "Ted",
        "lastName": "Chua",
        "email": "cx@sagapeak.com",
        "phone": "+65 9067 8318",
        "password": "$2a$08$cnsDGsJwKCosSKJSpd.IEOZCRIf1OaPIqpoTzCWcPrjRhvtCes1aO",
        "permission": "Super Admin"
      }
    )
    .then(function(created){ fixtures.TedChua = created })
    .catch(function(err) { logger.error({err: err}) })
  )

  promises.push(fixtures.Tratar.createUser(
      {
        "firstName": "CM",
        "lastName": "Chau",
        "email": "cm@tratar.com",
        "phone": "1212 3242",
        "password": "$2a$08$cnsDGsJwKCosSKJSpd.IEOZCRIf1OaPIqpoTzCWcPrjRhvtCes1aO",
        "permission": "Client Admin",
      }
    )
    .then(function(created){ fixtures.CmChau = created })
    .catch(function(err) { logger.error({err: err}) })
  )

  promises.push(fixtures.Tratar.createUser(
      {
        "firstName": "Amen",
        "lastName": "Lee",
        "email": "al@tratar.com",
        "phone": "1341 4234",
        "password": "$2a$08$cnsDGsJwKCosSKJSpd.IEOZCRIf1OaPIqpoTzCWcPrjRhvtCes1aO",
        "permission": "Client Admin",
      }
    )
    .then(function(created){ fixtures.AmenLee = created })
    .catch(function(err) { logger.error({err: err}) })
  )

  promises.push(fixtures.SagaPeak.createUser(
      {
        "firstName": "Saga",
        "lastName": "Tan",
        "email": "st@sagapeak.com",
        "phone": "1341 4234",
        "password": "$2a$08$cnsDGsJwKCosSKJSpd.IEOZCRIf1OaPIqpoTzCWcPrjRhvtCes1aO",
        "permission": "Client Admin",
      }
    )
    .then(function(created){ fixtures.SagaTan = created })
    .catch(function(err) { logger.error({err: err}) })
  )

  promises.push(fixtures.SagaPeak.createUser(
      {
        "firstName": "Newbird",
        "lastName": "Tan",
        "email": "newbird@sagapeak.com",
        "phone": "1341 4234",
        "password": "$2a$08$cnsDGsJwKCosSKJSpd.IEOZCRIf1OaPIqpoTzCWcPrjRhvtCes1aO",
        "permission": "Accountant",
      }
    )
    .then(function(created){ fixtures.NewbirdTan = created })
    .catch(function(err) { logger.error({err: err}) })
  )

  return Promise.all(promises)
}

module.exports = FixturePromises
