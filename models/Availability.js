'use strict';
module.exports = function(sequelize, DataTypes) {
  var Availability = sequelize.define('Availability', {
    date: {
      type: DataTypes.DATE,
      field: 'date'
    },
    tentotwelve: DataTypes.BOOLEAN,
    twelvetotwo: DataTypes.BOOLEAN,
    twotofour: DataTypes.BOOLEAN,
    fourtosix: DataTypes.BOOLEAN,
    sixtoeight: DataTypes.BOOLEAN,
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
