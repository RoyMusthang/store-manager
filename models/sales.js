const connection = require('./connection');

async function salesRecord() {
  // registra os log(data) da venda
  const query = 'INSERT INTO sales (date) VALUES (NOW());';
  const [result] = await connection.execute(query);
  return result.insertId;
}

async function create(saleId, productId, quantity) {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);';
  
  await connection.execute(query, [saleId, productId, quantity]);
}

module.exports = {
  create,
  salesRecord,
};
