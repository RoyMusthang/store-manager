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

async function getAll() {
  const query = `
    SELECT sale_id AS saleId, date, product_id, quantity
    FROM sales_products  
    INNER JOIN sales 
    ON sales.id = sale_id;
    `;
  const [result] = await connection.execute(query);
  return result;
}

async function getById(saleId) {
  const query = `
  SELECT date, product_id, quantity 
  FROM sales JOIN sales_products
  ON (sales.id = sale_id)
  WHERE sale_id = ?`;
  const [sale] = await connection.execute(query, [saleId]);
  return sale;
}

async function update(product, quantity) {
  console.log(product)
  const query = 'UPDATE sales_products SET quantity = ? WHERE product_id = ?;'
  const [result] = await connection.execute(query, [quantity, product]);
  return result;
}

module.exports = {
  create,
  salesRecord,
  getAll,
  getById,
  update,
};
