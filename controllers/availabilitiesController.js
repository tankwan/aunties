var models = require('../models/index');


function createNewAvailability(req, res) {
  models.Availability.create({
    date: req.body.date,
    tentotwelve: req.body.tentotwelve,
    twelvetotwo: req.body.twelvetotwo,
    twotofour: req.body.twotofour,
    fourtosix: req.body.fourtosix,
    sixtoeight: req.body.sixtoeight,
    latitude: req.user.latitude,
    longitude: req.user.longitude,
    address: req.user.address,
    userId: req.user.id
  }).then(function(availability) {
    return res.status(200).json({
      success: true,
      message: 'This availability has been succesfully registered',
    })
  });
}

module.exports = {
  createNewAvailability:   createNewAvailability,


}
