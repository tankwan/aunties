var passport  = require("passport")
var jwt       = require('jsonwebtoken')
var config = require('../.env.json')[process.env.NODE_ENV || 'development'];
var path = require('path')
var models = require(path.join(__dirname, '../models/index'));

function getSignup(req,res){
  return res.json("Sign up here")
}

// POST /signup
function postSignup(req, res, next) {
  var data = {"token":null,"user":null}

  passport.authenticate('local-signup',
  function(err, user, info) {
    if (err) {
      return next(err);
      // return res.status(403).send({
      //     success: false,
      //     message: info.errorMessage
      // });
    }
    if (!user) {
      // return res.json(info);
      return res.status(401).send({
          success: false,
          message: info.errorMessage
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      user.password = "redacted";
      data.user = user;
      var tokenInfo = {
        user: user,
      };
      var token = jwt.sign(tokenInfo, config.auntiesecret,{
          expiresIn: 86400
        });
        data.token = token;
      // return res.json(data);
      return res.status(200).send(data);
    });
  })(req, res, next);
}

function getLogin(req,res){
  return res.json("Login here")
}

// POST /login
function postLogin(req, res, next) {
  var data = {"token":null,"user":null}
  passport.authenticate('local-login',{
    failureFlash: true },
  function(err, user, info) {
    if (err) {
      return next(err);
      // return res.status(403).send({
      //     success: false,
      //     message: info.errorMessage
      // });
    }
    if (!user) {
      // return res.json(info);
      return res.status(401).send({
          success: false,
          message: info.errorMessage
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      user.password = "redacted";
      data.user = user
      var tokenInfo = {
        user: user,
      };
      var token = jwt.sign(tokenInfo, config.auntiesecret,{
          expiresIn: 86400
        });
      data.token = token
      // return res.json(data);
      return res.status(200).send(data);
    });
  })(req, res, next);
}

function getLogout(req, res) {
  req.logOut();
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    jwt.verify(token, config.auntiesecret, function(err, decodedUser) {
      if (err) {
        return res.status(401).json({ success: false, message: 'Failed to authenticate token, unable to logout successfully' });
      } else {
        // if everything is good, find user, update user.random and be done
        models.User.find({
          where:{
            email: decodedUser.user.email,
          },
        }).then(function(foundUser) {
          foundUser.updateAttributes({
            random: Math.round(Math.random()*1000000000)/1000000000
          }).then(function(doneUser) {
            return res.status(200).send({
                success: true,
                message: 'You have successfully logged out'
            });
          })
        });
      }
    });
  } else {
    // if there is no token, return an error
    return res.status(401).send({
        success: false,
        message: 'No token provided, unable to logout'
    });
  }
}

// POST /changepassword
function changePassword(req, res, next) {
  var data = {"token":null,"user":null}

  passport.authenticate('local-changepassword',
  function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      // return res.json(info);
      return res.status(401).send({
          success: false,
          message: info.errorMessage
      });
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      user.password = "redacted";
      data.user = user;
      var tokenInfo = {
        user: user,
      };
      var token = jwt.sign(tokenInfo, config.auntiesecret,{
          expiresIn: 86400
        });
        data.token = token;
      return res.status(200).json(data);
    });
  })(req, res, next);
}

module.exports = {
  getLogin: getLogin,
  postLogin:  postLogin,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  changePassword: changePassword
}
