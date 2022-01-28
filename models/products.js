const connection = require('./connection');

async function create(name, quantity) {
  const query = 'INSERT INTO products (name, quantity) VALUES (?, ?);';

  const [result] = await connection.execute(query, [name, quantity]);
  return {
    id: result.insertId,
    name,
    quantity,
  };
}

async function getAll() {
  const query = 'SELECT * FROM products;';
  const [result] = await connection.execute(query);
  return result;
}

async function getById(id) {
  const query = 'SELECT * FROM products WHERE id = ?;';
  const [result] = await connection.execute(query, [id]);

  return !result.length ? null : result[0];
}

async function AttProduct(id, name, quantity) {
  const query = 'UPDATE Products SET name = ?, quantity = ? WHERE = ?;';
  const [result] = await connection.execute(query, [name, quantity, id]);
  return result;
}

module.exports = {
  create,
  getAll,
  getById,
  AttProduct,
};
