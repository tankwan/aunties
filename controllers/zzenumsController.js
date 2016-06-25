'use strict';

var ZZEnum = require('../models/ZZEnums');


function getAllEnums (req, res) {
  ZZEnum.find({}, function(err, enums) {
    if (!err){
        res.json(enums);
    }
  });
}

module.exports = {
  getAllEnums: getAllEnums,
}
