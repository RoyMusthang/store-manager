const productModel = require('../models/products');

async function create(name, quantity) {
  const newProduct = await productModel.create(name, quantity);
  return newProduct;
}

async function getAll() {
  const getAllProduct = await productModel.getAll();
  return getAllProduct;
}

async function getById(id) {
  const getProductById = await productModel.getById(id);
  return getProductById;
}

async function attProduct(id, name, quantity) {
  const product = await productModel.attProduct(id, name, quantity);
  return product;
}

async function removeProduct(id) {
  const product = await productModel.removeProduct(id);
  return product;
}

module.exports = {
  create,
  getAll,
  getById,
  attProduct,
  removeProduct,
};
