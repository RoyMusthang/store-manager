const connection = require('./connection');

async function create(name, quantity) {
  const query = 'INSERT INTO products (name, quantity) VALUES (?, ?);'

  const [result] = await connection.execute(query, [name, quantity]);
  return {
    id: result.insertId,
    name,
    quantity,
  }
}

async function getAll() {
  const query = 'SELECT * FROM products;'
  const [result] = await connection.execute(query);
  return result;
}

module.exports = {
  create,
  getAll,
};
