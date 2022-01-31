const salesModel = require('../models/sales');

async function create(sales) {
  const saleId = await salesModel.salesRecord();
  await Promise.all(sales.map(async (sale) => {
  // o trecho abaixo e uma adaptação criada em cima do código
  // de Murilo Rainho, a base original pode ser encontrada nessa
  // thread: https://trybecourse.slack.com/archives/C02NJF4QNH1/p1643412142771639
  const lintSnakeCase = 'product_id';
  const {
    [lintSnakeCase]: productId,
    quantity,
  } = sale;
   await salesModel.create(saleId, productId, quantity);
  }));
  return { id: saleId, itemsSold: sales };
}

async function getAll() {
  const result = await salesModel.getAll();
  return result;
}

async function getById(saleId) {
  const sale = await salesModel.getById(saleId);
  return sale;
}

async function update(saleId, product) {
  await Promise.all(product.map(async (prod) => {
    const lintSnakeCase = 'product_id';
    const {
      [lintSnakeCase]: productId,
      quantity,
    } = prod;
    await salesModel.update(saleId, productId, quantity);
  }));
  return { saleId: Number(saleId), itemUpdated: product };
}

module.exports = {
  create,
  getAll,
  getById,
  update,
};
