// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var flash = require('connect-flash');
var session = require('express-session');
var methodOverride = require('method-override');

// **************** //
// *** EXPRESS  *** //
// **************** //
var app = express();

// *** view engine *** //
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

// *** static directory *** //
app.set('views', path.join(__dirname, 'views'));

// *** config middleware *** //

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// *************** //
// *** LOGGING *** //
// *************** //
// use express's own logger as middleware
var morgan = require('morgan')
app.use(morgan('combined'));

// Use Bunyan logger for everything else
var logger = require('./logger')
app.use('/', function(req, res, next){
  logger.info({body:req.body}, 'API request body')
  next();
})


// ************************************* //
// *** CROSS ORIGIN RESOURCES (CORS) *** //
// ************************************* //
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// ********************************* //
// *** PASSAPORT AUTHENTICATION  *** //
// ********************************* //
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session()); //Tell passport to use sessions
app.use(flash());
app.use(methodOverride(function(request, response) {
  if(request.body && typeof request.body === 'object' && '_method' in request.body) {
    var method = request.body._method;
    delete request.body._method;
    return method;
  }
}));

//pass the passport to the configurator for configuring it to the local strategy
require('./passport')(passport);

// *********************** //
// *** AUTHENTICATION  *** //
// *********************** //

var AuthMiddleware = require('./auth.js')

app.use('/admin', AuthMiddleware.rejectIfNoToken,
                  AuthMiddleware.rejectUnverifiableToken,
                  AuthMiddleware.rejectIfTokenExpired,
                  AuthMiddleware.rejectIfNoAdminPermissions)

app.use('/api', AuthMiddleware.rejectIfNoToken,
                AuthMiddleware.rejectUnverifiableToken,
                AuthMiddleware.rejectIfTokenExpired)

app.use(function(error, request, response, next) {
  // Check type of error
  if ( error.name === "UnauthorizedError" ) {
    // response.json({message: "Some token error"})
    response.status(401).json( {message: "You do not have access to that classified information." });
  } else {
    response.json({name: error.name, status: error.status, message: "Some other error"})
  }
})

// **************** //
// *** ROUTING  *** //
// **************** //
var registrationRoutes = require('./routes/registration.js');
var deliveryRoutes = require('./routes/delivery.js');
var availabilityRoutes = require('./routes/availability.js');

app.use(registrationRoutes);
app.use(deliveryRoutes);
app.use(availabilityRoutes)


module.exports = app;
