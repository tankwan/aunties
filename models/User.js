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
    address: DataTypes.STRING,
    postcode: DataTypes.INTEGER,
    wallet: DataTypes.FLOAT,
    random: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Availability, {
          foreignKey: {name:'userId', field:'user_id'}
        });
        User.hasMany(models.Delivery, {
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
