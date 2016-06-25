var models = require('../models/index');


function postAvailabilityRegistration(req, res) {
  models.Availability.find({
    where:{
      availabilityReg: req.body.availabilityReg
    }
  }).then(function(availability) {
    if (availability) {
      return res.status(401).json({
        success: false,
        message: 'This availability has already been registered'
      })
    }
    models.Availability.create({
      name: req.body.name,
      availabilityReg: req.body.availabilityReg,
      address: req.body.address,
      phone: req.body.phone,
      country: req.body.country,
      currency: req.body.currency,
      fyEndDate: req.body.fyEndDate,
      incorpDate: req.body.incorpDate,
      corpType: req.body.corpType
    }).then(function(availability) {
      //client should redirect after this to the user sign-up page, holding the availability.id associated
      return res.status(200).json({
        success: true,
        message: 'This availability has been succesfully registered',
        availability: availability.name ,
        id: availability.id
      })
    });
  });
}


module.exports = {
  postAvailabilityRegistration:   postAvailabilityRegistration,


}
