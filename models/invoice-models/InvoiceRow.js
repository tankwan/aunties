'use strict';
module.exports = function(sequelize, DataTypes) {
  var InvoiceRow = sequelize.define('InvoiceRow', {
    description: DataTypes.STRING,
    revenueCode: {
      type: DataTypes.STRING,
      field: 'revenue_code'
    },
    completedTransaction: {
      type: DataTypes.BOOLEAN,
      field: 'completed_transaction',
      defaultValue: false,
    },
    revenueStartDate: {
      type: DataTypes.DATE,
      field: 'revenue_start_date'
    },
    revenueEndDate: {
      type: DataTypes.DATE,
      field: 'revenue_end_date'
    },
    quantity: DataTypes.FLOAT,
    unitPrice: {
      type: DataTypes.FLOAT,
      field: 'unit_price'
    },
    discountAmount: {
      type: DataTypes.FLOAT,
      field: 'discount_amount'
    },
    rowTotal: {
      type: DataTypes.FLOAT,
      field: 'row_total'
    }
  }, {
    classMethods: {
      associate: function(models) {
        InvoiceRow.belongsTo(models.Invoice, {
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
          foreignKey: {
            name: 'invoiceId',
            field: 'invoice_id',
            allowNull: false
          }
        });
      }
    }
  });
  return InvoiceRow;
};
