const productModel = require('../models/products');

async function createProduct(name, quantity) {
  const newProduct = await productModel.create(name, quantity);
  return newProduct;
}

async function getAll() {
  const getAllProduct = await productModel.getAll();
  return getAllProduct;
}

module.exports = {
  createProduct,
  getAll,
};
