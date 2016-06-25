'use strict';

module.exports = function(sequelize, DataTypes) {
  var InvoiceStatus = sequelize.define('InvoiceStatus', {
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        InvoiceStatus.belongsTo(models.Invoice, {
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
          foreignKey: {
            name: 'invoiceId',
            field: 'invoice_id',
            allowNull: false
          }
        });
        InvoiceStatus.belongsTo(models.User, {
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
  return InvoiceStatus;
};
