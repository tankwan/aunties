'use strict';

module.exports = function(sequelize, DataTypes) {
  var DeliveryStatus = sequelize.define('DeliveryStatus', {
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        DeliveryStatus.belongsTo(models.Delivery, {
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
          foreignKey: {
            name: 'deliveryId',
            field: 'delivery_id',
            allowNull: false
          }
        });
        DeliveryStatus.belongsTo(models.User, {
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
          foreignKey: {
            name: 'userId',
            field: 'user_id',
            allowNull: true
          }
        });
      }
    }
  });
  return DeliveryStatus;
};
