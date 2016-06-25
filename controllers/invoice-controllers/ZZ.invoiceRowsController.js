var path = require('path')
var models = require(path.join(__dirname, '../../models/index'));

function createNewInvoiceRow (req, res) {
  models.InvoiceRow.create({
    invoiceId: req.params.invoiceId,
    description: req.body.description,
    quantity: req.body.quantity,
    unitPrice: req.body.unitPrice,
    discountAmount: req.body.discountAmount,
    rowTotal: req.body.rowTotal
  }).then(function(invoicerow) {
    res.json(invoicerow)
  })
}

function getOneInvoiceRow (req, res) {
  models.InvoiceRow.find({
    where:{
      id: req.params.invoicerow_id,
      invoiceId: req.params.invoiceId
    }
  }).then(function(invoicerow) {
    res.json(invoicerow)
  });
}

function updateOneInvoiceRow (req, res) {
  models.InvoiceRow.find({
    where: {
      id: req.params.invoicerow_id,
      invoiceId: req.params.invoiceId
    }
  }).then(function(invoicerow) {
    if(invoicerow){
      invoicerow.updateAttributes({
        description: req.body.description,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice,
        discountAmount: req.body.discountAmount,
        rowTotal: req.body.rowTotal
      }).then(function(invoicerow) {
        res.send(invoicerow);
      });
    }
  });
}

function deleteOneInvoiceRow (req, res) {
  models.InvoiceRow.destroy({
    where: {
      id: req.params.invoicerow_id,
      invoiceId: req.params.invoiceId
    }
  }).then(function(invoicerow) {
    res.json(invoicerow);
  });
}

module.exports = {
  createNewInvoiceRow: createNewInvoiceRow,
  getOneInvoiceRow: getOneInvoiceRow,
  updateOneInvoiceRow: updateOneInvoiceRow,
  deleteOneInvoiceRow: deleteOneInvoiceRow
}
