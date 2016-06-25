'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name'
    },
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    permission: DataTypes.STRING,
    random: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsTo(models.Company, {
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
          foreignKey: {
            name: 'companyId',
            field: 'company_id',
            allowNull: false
          }
        });
        User.hasMany(models.InvoiceStatus, {
          foreignKey: {name:'userId', field:'user_id'}
        });
      }
    }
  });

  // Before Create hook to add random token
  User.beforeCreate(function(user){
    user.random = Math.round(Math.random()*1000000000)/1000000000
  })

  return User;
};
