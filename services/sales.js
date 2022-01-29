const salesModel = require('../models/sales');

async function salesRecord(id, quantity) {
  const newSales = await salesModel.salesRecord(id, quantity);
  return newSales;
}

module.exports = {
  salesRecord,
}
