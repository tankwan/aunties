var passport = require('passport');
var logger = require('./logger');
var models = require('./models/index');

var jwt = require('jsonwebtoken');
var jwtConfig = require('./.env.json')[process.env.NODE_ENV || 'development'];

var AuthMiddleware = {

  rejectIfNoToken(req, res, next){
    if (req.method === 'OPTIONS') return next();

    var token = req.headers['x-access-token'];
    if (!token) {
      logger.error({method: req.method, headers: req.headers}, 'No token provided')
      return res.status(401).send({
          success: false,
          message: 'Authentication failed - no token provided.'
      });
    } else {
      req.token = token
      next()
    }
  },

  rejectUnverifiableToken(req, res, next){
    if (req.method === 'OPTIONS') return next();

    jwt.verify(req.token, jwtConfig.auntiesecret, function(err, decoded){
      if (err) {
        logger.error({method: req.method, headers: req.headers}, 'Unable to verify token.')
        return res.status(401).json({
          success: false,
          message: 'Authentication failed - unable to verify token.'
        });
      } else {
        req.tokenUser = decoded.user
        next()
      }
    })
  },

  rejectIfTokenExpired(req, res, next){
    if (req.method === 'OPTIONS') return next();

    logger.debug({tokenUser: req.tokenUser}, 'Token User')
    models.User.find({
      where: {email: req.tokenUser.email}
    })
    .then(function(user){
      if(!user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication failed - user does not exist.'
        })}
      if ((req.tokenUser.random.toString() === user.random.toString())) {
        req.user = user
        req.user.password = 'redacted'
        next()
      } else {
        logger.error({method: req.method, headers: req.headers}, 'Token has expired.')
        return res.status(401).json({
          success: false,
          message: 'Authentication failed - token has expired.'
        })
      }
    })
  },

  rejectIfNoCompanyPermissions(req, res, next){
    if (req.method === 'OPTIONS') return next();

    if(req.user.permission === "Client Admin" || req.user.permission === "Super Admin" || req.user.permission === "Accountant"){
      logger.info({user: req.user}, "User has client admin permissions.");
      next()
    } else {
      logger.error({user: req.user}, "User does not have client admin permissions.");
      return res.status(403).json({
        success: false,
        message: 'You do not have company admin permission'
      })
    }
  },

  rejectIfNoAdminPermissions(req, res, next){
    if (req.method === 'OPTIONS') return next();

    if(req.user.permission === "Super Admin"){
      logger.info({user: req.user}, "User has super admin permissions.");
      next()
    } else {
      logger.error({user: req.user}, "User does not have super admin permissions.");
      return res.status(403).json({
        success: false,
        message: 'You do not have super admin permission'
      })
    }
  }
}

module.exports = AuthMiddleware
