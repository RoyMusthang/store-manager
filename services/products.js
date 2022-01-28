const productModel = require('../models/products');

async function create(name, quantity) {
  const newProduct = await productModel.create(name, quantity);
  return newProduct;
}

async function getAll() {
  const getAllProduct = await productModel.getAll();
  return getAllProduct;
}

async function getById(id, name, quantity) {
  const getProductById = await productModel.getById(id, name, quantity);
  return getProductById;
}

module.exports = {
  create,
  getAll,
  getById,
};
