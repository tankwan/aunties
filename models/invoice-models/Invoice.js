'use strict';
module.exports = function(sequelize, DataTypes) {
  var Invoice = sequelize.define('Invoice', {
    counterpartyName: {
      type: DataTypes.STRING,
      field: 'counterparty_name'
    },
    title: DataTypes.STRING,
    summary: DataTypes.STRING,
    counterpartyAddress: {
      type: DataTypes.STRING,
      field: 'counterparty_address'
    },
    counterpartyCountry: {
      type: DataTypes.STRING,
      field: 'counterparty_country'
    },
    counterpartyPhone: {
      type: DataTypes.STRING,
      field: 'counterparty_phone'
    },
    reference: DataTypes.STRING,
    currency: DataTypes.STRING,
    subtotal: DataTypes.FLOAT,
    taxAmount: {
      type: DataTypes.FLOAT,
      field: 'tax_amount'
    },
    grandTotal: {
      type: DataTypes.FLOAT,
      field: 'grand_total'
    },
    comments: DataTypes.STRING,
    repeating: DataTypes.BOOLEAN,
    issueDate: {
      type: DataTypes.DATE,
      field: 'issue_date'
    },
    dueDate: {
      type: DataTypes.DATE,
      field: 'due_date'
    },
    opened: DataTypes.BOOLEAN,
    openedDate: {
      type: DataTypes.DATE,
      field: 'opened_date'
    },
    accepted: DataTypes.BOOLEAN,
    acceptedDate: {
      type: DataTypes.DATE,
      field: 'accpted_date'
    },
    paymentTermsDays: {
      type: DataTypes.INTEGER,
      field: 'payment_terms_days'
    },
    writtenOff: {
      type: DataTypes.BOOLEAN,
      field: 'written_off'
    },
    amountPendingReconciliation: {
      type: DataTypes.FLOAT,
      field: 'amount_pending_reconciliation'
    }
  }, {
    classMethods: {
      associate: function(models) {
        Invoice.belongsTo(models.Company, {
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
          foreignKey: {
            name: 'companyId',
            field: 'company_id',
            allowNull: false
          }
        });
        Invoice.hasMany(models.InvoiceStatus, {
          foreignKey: {name:'invoiceId', field:'invoice_id'}
        });
        Invoice.hasMany(models.InvoiceRow,{
          foreignKey: {name:'invoiceId', field:'invoice_id'}
        });
      }
    }
  });
  return Invoice;
};
