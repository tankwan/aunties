//import package for authentication
var LocalStrategy = require('passport-local').Strategy;
var models = require('./models/index');
var bcrypt   = require('bcrypt-nodejs');
var logger = require('./logger');
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyCSwXYfgfeAdrD2hZQR0MYZijnfrhpOaqU', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);

function encrypt(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

function validPassword (passwordEntered, passwordReal){
  return bcrypt.compareSync(passwordEntered, passwordReal);
}

module.exports = function(passport){

    //Reason for doing this way is for seperation of responsibility.
    //passport does not care how user is stored, it passes an id and lets the model handle getting the user
    //passport gives us a user and expects us to return an id
    passport.serializeUser(function(user, done){
      done(null, user.id);
    })

    //Passport gives us an id and expects us to return it a user
    passport.deserializeUser(function(id, done){
      User.findById(id, function(err, user){
        done(err, user);
      })
    })

    passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {
        //Use sequelize to find the use with the local email
        models.User.find({
          where:{
            email: email
          }
        }).then(function(user) {
          if (user) return done(null, false, {'errorMessage': "This email is already registered"});
          return models.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: email,
            phone: req.body.phone,
            password: encrypt(password),
            address: req.body.address,
            postcode: req.body.postcode,
            wallet: 0,
            random: Math.round(Math.random()*1000000000)/1000000000,
          })
          .then(function(user) {
            geocoder.geocode(user.address+', Singapore')
            .then(function(res) {
              console.log(res[0].formattedAddress)
              user.updateAttributes({
                latitude: res[0].latitude,
                longitude: res[0].longitude
              }).then(function(){
                return done(null, user);
              })
            })
          })
        });
    }));

    passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    }, function(req, email, password, done) {
        models.User.find({
          where:{
            email: email
          }
        }).then(function(user) {
          if (!user) {
            logger.debug("No user found")
            return done(null, false, {'errorMessage': "No user found"})
          }
          //If password keyed in post encrpytion is the same as user.password
          if(validPassword(password, user.password)) {
            logger.debug({user: user}, "User Found");
            user.updateAttributes({
              random: Math.round(Math.random()*1000000000)/1000000000
            }).then(function(doneUser) {
              return done(null, user, "issue token");
            })
          }
          //If no valid password
          else {
            logger.debug("Password is wrong")
            return done(null, false, {'errorMessage': "Password is wrong"});
          }
        });
    }));

    passport.use('local-changepassword', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'currentPassword',
        passReqToCallback: true
    }, function(req, email, password, done) {
        //Use sequelize to find the use with the local email
        models.User.find({
          where:{
            email: email
          }
        }).then(function(user) {
          if (!user) {
            logger.debug("No user found")
            return done(null, false, {'errorMessage': "No user found"})
          }
          //If password keyed in post encrpytion is the same as user.password
          if(validPassword(password, user.password)) {
            logger.debug({user: user}, "User Found");
            //If both entries of new password match
            if (req.body.newPassword1 === req.body.newPassword2) {
              user.updateAttributes({
                password: encrypt(req.body.newPassword1),
                random: Math.round(Math.random()*1000000000)/1000000000
              }).then(function(doneUser) {
                return done(null, user, "issue token");
              })
            }
            //If both entries of new password do not match
            else {
              logger.debug("New passwords entered do not match")
              return done(null, false, {'errorMessage': "New passwords entered do not match"});
            }
          }
          //If no valid password
          else {
            logger.debug("Password is wrong")
            return done(null, false, {'errorMessage': "Password is wrong"});
          }
        });
    }));

}
