'use strict';
module.exports = function(sequelize, DataTypes) {
  var Delivery = sequelize.define('Delivery', {
    packageId: {
      type: DataTypes.STRING,
      field: 'package_id'
    },
    date: {
      type: DataTypes.DATE,
      field: 'date'
    },
    time: {
      type: DataTypes.STRING,
      field: 'time'
    },
  }, {
    classMethods: {
      associate: function(models) {
        Delivery.belongsTo(models.User, {
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
          foreignKey: {
            name: 'userId',
            field: 'user_id',
            allowNull: false
          }
        });
        Delivery.hasMany(models.DeliveryStatus, {
          foreignKey: {name:'deliveryId', field:'delivery_id'}
        });
      }
    }
  });
  return Delivery;
};
