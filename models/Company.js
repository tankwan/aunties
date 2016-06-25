'use strict';
module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    companyReg: {
      type: DataTypes.STRING,
      field: 'company_reg'
    },
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    country: DataTypes.STRING,
    currency: DataTypes.STRING,
    fyEndDate: {
      type: DataTypes.DATE,
      field: 'fy_end_date'
    },
    incorpDate: {
      type: DataTypes.DATE,
      field: 'incorp_date'
    },
    corpType: {
      type: DataTypes.STRING,
      field: 'corp_type'
    },
  }, {
    classMethods: {
      associate: function(models) {
        Company.hasMany(models.User, {
          foreignKey:{name:'companyId', field:'company_id'}
        });
        Company.hasMany(models.Invoice, {
          foreignKey:{name:'companyId', field:'company_id'}
        });
      }
    }
  });
  return Company;
};
