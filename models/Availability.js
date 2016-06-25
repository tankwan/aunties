'use strict';
module.exports = function(sequelize, DataTypes) {
  var Availability = sequelize.define('Availability', {
    date: {
      type: DataTypes.DATE,
      field: 'date'
    },
    tentotwelve: DataTypes.STRING,
    twelvetotwo: DataTypes.STRING,
    twotofour: DataTypes.STRING,
    fourtosix: DataTypes.STRING,
    sixtoeight: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    address: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Availability.belongsTo(models.User, {
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
          foreignKey: {
            name: 'userId',
            field: 'user_id',
            allowNull: false
          }
        });
      }
    }
  });
  return Availability;
};
