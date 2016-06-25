var models = require('../models/index');


function postCompanyRegistration(req, res) {
  models.Company.find({
    where:{
      companyReg: req.body.companyReg
    }
  }).then(function(company) {
    if (company) {
      return res.status(401).json({
        success: false,
        message: 'This company has already been registered'
      })
    }
    models.Company.create({
      name: req.body.name,
      companyReg: req.body.companyReg,
      address: req.body.address,
      phone: req.body.phone,
      country: req.body.country,
      currency: req.body.currency,
      fyEndDate: req.body.fyEndDate,
      incorpDate: req.body.incorpDate,
      corpType: req.body.corpType
    }).then(function(company) {
      //client should redirect after this to the user sign-up page, holding the company.id associated
      return res.status(200).json({
        success: true,
        message: 'This company has been succesfully registered',
        company: company.name ,
        id: company.id
      })
    });
  });
}


module.exports = {
  postCompanyRegistration:   postCompanyRegistration,


}
