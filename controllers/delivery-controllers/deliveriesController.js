var path = require('path')
var models = require(path.join(__dirname, '../../models/index'));
var logger = require('../../logger');
var geolib = require('geolib')
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyCSwXYfgfeAdrD2hZQR0MYZijnfrhpOaqU', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);

function postDelivery (req, res) {
  var reply = {"result":null, "user":null}
  var spots = {}, lat, long
  geocoder.geocode(req.body.address+', Singapore')
  .then(function(res){
    lat = res[0].latitude
    long = res[0].longitude
    spots["requestadd"] = {
      latitude: lat,
      longitude: long
    }
    return console.log("done")
  })
  .then(function(){
    models.Availability.findAll({
      where:{
        $or:[
          {tentotwelve: req.body.tentotwelve},
          {twelvetotwo: req.body.twelvetotwo},
          {twotofour: req.body.twotofour},
          {fourtosix: req.body.fourtosix},
          {sixtoeight: req.body.sixtoeight},
        ]
      },
    })
    .then(function(availabilities){
      const rowPromises = []
      availabilities.forEach(function(availability){
        lat = availability.latitude
        long = availability.longitude
        spots[availability.userId] = {
          latitude: lat,
          longitude: long
        }
        rowPromises.push(availability)
      })
      return Promise.all(rowPromises)
    })
    .then(function(){
      return geolib.findNearest(spots['requestadd'], spots, 1)
    })
    .then(function(result){
      reply.result = result
      models.User.find({
        where:{
          id:result.key
        },
      }).then(function(user){
        user.password = "redacted"
        reply.user = user
        res.json(reply)
      })
    })
  })

  // .then(function(address){
  //   return models.User.findAll({})
  // })
  // .then(function(users){
  //   users.forEach(function(user){
  //     row
  //   })
  // })



//   .then(function(users){
//     const rowPromises = []
//
// geolib.getDistance(
//   {latitude: 51.5103, longitude: 7.49347},
//   {latitude: "51° 31' N", longitude: "7° 28' E"}
// )
//
//     invoiceObj.InvoiceRows.forEach(function(row){
//       row.invoiceId = invoice.id
//       rowPromises.push(models.InvoiceRow.create(row))
//     })
//     return Promise.all(rowPromises)
//     return
//   })
//   .then(function(deliveries){
//     res.json(deliveries)
//   })
  .catch(respondWithError(res, 404, "Getting deliveries failed"));
}

// Helpers

function respondWithError(res, statusCode, msg){
  return function(err){
    logger.error(err)
    res.status(statusCode).send({
      success: false,
      message: msg
    });
  }
}

module.exports = {
  postDelivery: postDelivery
}
