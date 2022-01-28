const productModel = require('../models/products');

async function create(name, quantity) {
  const newProduct = await productModel.create(name, quantity);
  return newProduct;
}

async function getAll() {
  const getAllProduct = await productModel.getAll();
  return getAllProduct;
}

async function getById

module.exports = {
  create,
  getAll,
  getById,
};
